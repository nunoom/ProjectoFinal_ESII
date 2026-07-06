import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Card from '../components/Card';
import { categories } from '../constants/categories';
import { fetchQuizzes } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function QuizzesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { data: quizzes, loading, error, retry } = useApi(fetchQuizzes);

  if (loading) return <LoadingView />;
  if (error || !quizzes) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const getDifficultyColor = (d: string) => {
    if (d === 'EASY') return { bg: Colors.successLight, text: Colors.success, label: 'Fácil' };
    if (d === 'MEDIUM') return { bg: Colors.warningLight, text: Colors.warning, label: 'Médio' };
    return { bg: Colors.errorLight, text: Colors.error, label: 'Difícil' };
  };

  const getCategoryIcon = (cat: string) =>
    categories.find((c) => c.name === cat)?.icon ?? 'document-text';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Quizzes</Text>
        <Text style={styles.headerSubtitle}>Teste seus conhecimentos</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{quizzes.length}</Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{quizzes.filter(q => q.completed).length}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{quizzes.reduce((a, q) => a + (q.completed ? q.points : 0), 0)}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {quizzes.map(quiz => {
          const diff = getDifficultyColor(quiz.difficulty);

          return (
            <TouchableOpacity
              key={quiz.id}
              onPress={() => navigation.navigate('QuizPlay', { quizId: quiz.id })}
              activeOpacity={0.7}
            >
              <Card style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.categoryRow}>
                    <Ionicons
                      name={getCategoryIcon(quiz.category) as any}
                      size={16}
                      color={Colors.primary}
                    />
                    <Text style={styles.category}>{quiz.category}</Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: diff.bg }]}>
                    <Text style={[styles.difficultyText, { color: diff.text }]}>
                      {diff.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.description}>{quiz.description}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <View style={[styles.metaIconBg, { backgroundColor: Colors.infoLight }]}>
                      <Ionicons name="help-circle-outline" size={16} color={Colors.info} />
                    </View>
                    <Text style={styles.metaText}>{quiz.questionCount} questões</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <View style={[styles.metaIconBg, { backgroundColor: Colors.warningLight }]}>
                      <Ionicons name="trophy-outline" size={16} color={Colors.warning} />
                    </View>
                    <Text style={styles.metaText}>{quiz.points} pontos</Text>
                  </View>
                  {quiz.timeLimit && (
                    <View style={styles.metaItem}>
                      <View style={[styles.metaIconBg, { backgroundColor: Colors.gray[100] }]}>
                        <Ionicons name="time-outline" size={16} color={Colors.gray[500]} />
                      </View>
                      <Text style={styles.metaText}>{quiz.timeLimit / 60} min</Text>
                    </View>
                  )}
                </View>

                {quiz.completed ? (
                  <View style={styles.completedBar}>
                    <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                    <Text style={styles.completedText}>Completado</Text>
                    <TouchableOpacity style={styles.retryButton}>
                      <Text style={styles.retryText}>Repetir</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.startBar}>
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => navigation.navigate('QuizPlay', { quizId: quiz.id })}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={Colors.gradient.primary}
                        style={styles.startGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Ionicons name="play" size={16} color={Colors.white} />
                        <Text style={styles.startText}>Começar Quiz</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)' },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  card: { marginBottom: 16, padding: 18 },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryEmoji: { fontSize: 18 },
  category: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  difficultyBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  difficultyText: { fontSize: 11, fontWeight: '700' },
  quizTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: 16,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaText: { fontSize: 12, color: Colors.gray[600], fontWeight: '500' },
  completedBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  completedText: { fontSize: 13, fontWeight: '600', color: Colors.success, flex: 1 },
  retryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: Colors.gray[100],
  },
  retryText: { fontSize: 12, fontWeight: '600', color: Colors.gray[600] },
  startBar: {
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  startGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  startText: { fontSize: 14, fontWeight: '700', color: Colors.white },
});
