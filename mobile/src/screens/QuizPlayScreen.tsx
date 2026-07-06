import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { fetchQuizDetail, submitQuiz, ApiError, SERVER_ERROR_MESSAGE } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function QuizPlayScreen({ route, navigation }: any) {
  const { quizId } = route.params;
  const insets = useSafeAreaInsets();

  // Quiz da API — a correção é feita pelo backend na submissão
  const { data: quiz, loading, error, retry } = useApi(() => fetchQuizDetail(quizId));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const questions = quiz?.questions ?? [];
  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

  const handleSubmit = async (finalAnswers: Record<number, number>, timeSpent: number) => {
    if (!quiz || submitting) return;
    setSubmitting(true);
    try {
      const submission = Object.entries(finalAnswers).map(([questionId, selectedOptionId]) => ({
        questionId: Number(questionId),
        selectedOptionId,
      }));
      const result = await submitQuiz(quiz.id, submission, timeSpent);
      navigation.replace('QuizResult', {
        quizId: quiz.id,
        score: result.correctAnswers,
        total: result.totalQuestions,
        timeSpent,
        pointsEarned: result.pointsEarned,
        percentage: result.score,
      });
    } catch (e) {
      setSubmitting(false);
      Alert.alert('Erro', e instanceof ApiError ? e.message : SERVER_ERROR_MESSAGE);
    }
  };

  // Iniciar o cronómetro quando o quiz chega da API
  useEffect(() => {
    if (quiz && timeLeft === null) {
      setTimeLeft(quiz.timeLimit ?? 600);
    }
  }, [quiz, timeLeft]);

  // Contagem decrescente; submete automaticamente quando o tempo acaba
  useEffect(() => {
    if (timeLeft === null || !quiz) return;
    if (timeLeft <= 0) {
      handleSubmit(answersRef.current, quiz.timeLimit ?? 600);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => (t !== null ? t - 1 : t)), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quiz]);

  // Animação da barra de progresso
  useEffect(() => {
    if (totalQuestions === 0) return;
    Animated.timing(progressAnim, {
      toValue: (currentQuestion + 1) / totalQuestions,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentQuestion, totalQuestions]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionId: number) => {
    if (selectedOption !== null || !quiz || !question) return;
    setSelectedOption(optionId);
    const nextAnswers = { ...answers, [question.id]: optionId };
    setAnswers(nextAnswers);

    // Avançar automaticamente após breve pausa
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();

        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null);
        }, 200);
      } else {
        const timeSpent = (quiz.timeLimit ?? 600) - (timeLeft ?? 0);
        handleSubmit(nextAnswers, timeSpent);
      }
    }, 600);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  if (loading) return <LoadingView />;
  if (error || !quiz || !question) {
    return <ErrorView message={error ?? 'Quiz não encontrado'} onRetry={retry} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            Alert.alert(
              'Sair do Quiz',
              'Tem certeza que quer sair? O progresso será perdido.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive', onPress: () => navigation.goBack() },
              ]
            );
          }}
        >
          <Ionicons name="close" size={24} color={Colors.gray[700]} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.questionCounter}>
            {currentQuestion + 1}/{totalQuestions}
          </Text>
        </View>

        <View style={styles.timerContainer}>
          <Ionicons
            name="time-outline"
            size={16}
            color={(timeLeft ?? 0) < 60 ? Colors.error : Colors.gray[500]}
          />
          <Text style={[styles.timer, (timeLeft ?? 0) < 60 && { color: Colors.error }]}>
            {formatTime(timeLeft ?? 0)}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={Colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </View>

      {/* Question */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.questionContainer}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>Questão {currentQuestion + 1}</Text>
          </View>
          <Text style={styles.questionText}>{question.text}</Text>
          {question.type === 'TRUE_FALSE' && (
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>Verdadeiro ou Falso</Text>
            </View>
          )}
        </View>

        {/* Options */}
        <View style={styles.options}>
          {question.options.map((option, i) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.option, isSelected ? styles.optionSelected : styles.optionDefault]}
                onPress={() => handleSelectOption(option.id)}
                activeOpacity={0.7}
                disabled={selectedOption !== null || submitting}
              >
                <View style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                  <Text style={[styles.optionLetterText, isSelected && { color: Colors.white }]}>
                    {optionLetters[i]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.optionText,
                    isSelected ? styles.optionTextSelected : styles.optionTextDefault,
                  ]}
                >
                  {option.text}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Answered indicator */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <Ionicons name="list-outline" size={16} color={Colors.gray[500]} />
            <Text style={styles.scoreText}>
              {Object.keys(answers).length} de {totalQuestions} respondidas
            </Text>
          </View>
          {submitting && (
            <View style={styles.scoreItem}>
              <Ionicons name="cloud-upload-outline" size={16} color={Colors.primary} />
              <Text style={[styles.scoreText, { color: Colors.primary }]}>A submeter...</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center' },
  questionCounter: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[900],
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.gray[100],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timer: { fontSize: 15, fontWeight: '700', color: Colors.gray[700] },
  progressContainer: {
    height: 6,
    backgroundColor: Colors.gray[100],
    marginHorizontal: 16,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  questionBadge: {
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  questionBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray[900],
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  typeBadge: {
    marginTop: 12,
    backgroundColor: Colors.infoLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: { fontSize: 11, fontWeight: '600', color: Colors.info },
  options: { gap: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    gap: 14,
  },
  optionDefault: {
    borderColor: Colors.gray[200],
    backgroundColor: Colors.white,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF5F5',
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterSelected: { backgroundColor: Colors.primary },
  optionLetterText: { fontSize: 15, fontWeight: '800', color: Colors.gray[600] },
  optionText: { flex: 1, fontSize: 16, fontWeight: '600' },
  optionTextDefault: { color: Colors.gray[800] },
  optionTextSelected: { color: Colors.primary },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    gap: 20,
  },
  scoreItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  scoreText: { fontSize: 14, fontWeight: '600', color: Colors.gray[600] },
});
