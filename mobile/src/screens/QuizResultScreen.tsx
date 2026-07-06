import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Button from '../components/Button';

export default function QuizResultScreen({ route, navigation }: any) {
  // Resultado calculado pelo backend na submissão do quiz
  const { quizId, score, total, timeSpent, pointsEarned, percentage } = route.params;
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const passed = percentage >= 50;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const getResultIcon = (): { name: string; color: string } => {
    if (percentage >= 90) return { name: 'trophy', color: '#FFD700' };
    if (percentage >= 70) return { name: 'ribbon', color: Colors.white };
    if (percentage >= 50) return { name: 'thumbs-up', color: Colors.white };
    return { name: 'barbell', color: Colors.white };
  };

  const getResultMessage = () => {
    if (percentage >= 90) return 'Excelente!';
    if (percentage >= 70) return 'Muito Bom!';
    if (percentage >= 50) return 'Bom trabalho!';
    return 'Continue tentando!';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={passed ? Colors.gradient.primary : [Colors.gray[700], Colors.gray[900]]}
        style={styles.topSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.emojiContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name={getResultIcon().name as any} size={52} color={getResultIcon().color} />
        </Animated.View>
        <Text style={styles.resultMessage}>{getResultMessage()}</Text>
        <Text style={styles.quizName}>Resultado do Quiz</Text>

        {/* Score Circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreLabel}>{score}/{total} corretas</Text>
        </View>
      </LinearGradient>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: Colors.successLight }]}>
              <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
            </View>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Corretas</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: Colors.errorLight }]}>
              <Ionicons name="close-circle" size={22} color={Colors.error} />
            </View>
            <Text style={styles.statValue}>{total - score}</Text>
            <Text style={styles.statLabel}>Erradas</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: Colors.infoLight }]}>
              <Ionicons name="time" size={22} color={Colors.info} />
            </View>
            <Text style={styles.statValue}>{formatTime(timeSpent)}</Text>
            <Text style={styles.statLabel}>Tempo</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: Colors.warningLight }]}>
              <Ionicons name="star" size={22} color={Colors.warning} />
            </View>
            <Text style={styles.statValue}>+{pointsEarned}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Repetir Quiz"
            onPress={() => navigation.replace('QuizPlay', { quizId })}
            variant="gradient"
            icon={<Ionicons name="refresh" size={18} color={Colors.white} />}
          />
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Ranking' })}
          >
            <Ionicons name="trophy-outline" size={18} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Ver Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Ionicons name="home-outline" size={18} color={Colors.gray[600]} />
            <Text style={[styles.secondaryActionText, { color: Colors.gray[600] }]}>
              Voltar ao Início
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  topSection: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  emojiContainer: { marginBottom: 12 },
  emoji: { fontSize: 64 },
  resultMessage: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  quizName: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  scorePercentage: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
  },
  scoreLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  content: { flex: 1, padding: 20 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  statIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.gray[900] },
  statLabel: { fontSize: 12, color: Colors.gray[500], marginTop: 2 },
  actions: { gap: 12 },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
  },
  secondaryActionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
});
