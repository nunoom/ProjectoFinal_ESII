import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { fetchContents, fetchQuizzes, fetchRanking, getCurrentUser } from '../services/api';
import { categories } from '../constants/categories';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { data: contents, loading, error, retry } = useApi(fetchContents);
  const { data: quizzesData } = useApi(fetchQuizzes);
  const { data: rankingData } = useApi(fetchRanking);
  const user = getCurrentUser();

  if (loading) return <LoadingView />;
  if (error || !contents) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const quizzes = quizzesData ?? [];
  const ranking = rankingData ?? [];
  const completedCount = quizzes.filter((q) => q.completed).length;
  const userPosition = user ? ranking.find((e) => e.userId === user.id)?.position : undefined;

  const stats = [
    { icon: 'book-outline', label: 'Conteúdos', value: String(contents.length), color: Colors.info, bg: Colors.infoLight },
    { icon: 'bulb-outline', label: 'Quizzes', value: String(completedCount), color: Colors.success, bg: Colors.successLight },
    { icon: 'trophy-outline', label: 'Pontos', value: String(user?.points ?? 0), color: Colors.warning, bg: Colors.warningLight },
    { icon: 'trending-up-outline', label: 'Ranking', value: userPosition ? `#${userPosition}` : '—', color: Colors.primary, bg: '#FFF5F5' },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Hero Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark, '#450000']}
        style={[styles.hero, { paddingTop: insets.top + 16 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Bem-vindo,</Text>
            <Text style={styles.name}>{user?.name ?? 'Estudante'}</Text>
          </View>
          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={22} color={Colors.white} />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.heroSubtext}>Continue sua jornada educacional</Text>

        {/* Decorative */}
        <View style={[styles.decorCircle, { top: -40, right: -60 }]} />
        <View style={[styles.decorCircle, { bottom: 30, left: -50, width: 120, height: 120 }]} />
      </LinearGradient>

      {/* Stats Cards - floating */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIconBg, { backgroundColor: stat.bg }]}>
                <Ionicons name={stat.icon as any} size={22} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => navigation.navigate('Quizzes')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.quickActionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.quickActionIcon}>
              <Ionicons name="bulb" size={24} color={Colors.white} />
            </View>
            <View style={styles.quickActionText}>
              <Text style={styles.quickActionTitle}>Fazer Quiz</Text>
              <Text style={styles.quickActionSubtitle}>Ganhe pontos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Conteúdos Recentes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Conteúdos Recentes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Contents')}>
            <Text style={styles.sectionLink}>Ver todos →</Text>
          </TouchableOpacity>
        </View>
        {contents.slice(0, 3).map((content) => (
          <TouchableOpacity
            key={content.id}
            onPress={() => navigation.navigate('ContentDetail', { contentId: content.id })}
            activeOpacity={0.7}
          >
            <Card style={styles.contentCard}>
              <Image source={{ uri: content.imageUrl }} style={styles.contentImage} />
              <View style={styles.contentInfo}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{content.category}</Text>
                </View>
                <Text style={styles.contentTitle} numberOfLines={2}>{content.title}</Text>
                <Text style={styles.contentSummary} numberOfLines={2}>{content.summary}</Text>
                <View style={styles.contentMeta}>
                  <Ionicons name="time-outline" size={13} color={Colors.gray[400]} />
                  <Text style={styles.metaText}>{content.readTime} min</Text>
                  <View style={styles.metaDot} />
                  <Ionicons name="eye-outline" size={13} color={Colors.gray[400]} />
                  <Text style={styles.metaText}>{content.views.toLocaleString()}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quizzes em Destaque */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quizzes em Destaque</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Quizzes')}>
            <Text style={styles.sectionLink}>Ver todos →</Text>
          </TouchableOpacity>
        </View>
        {quizzes.slice(0, 2).map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            onPress={() => navigation.navigate('QuizPlay', { quizId: quiz.id })}
            activeOpacity={0.7}
          >
            <Card style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <View style={styles.quizCategoryRow}>
                  <Ionicons
                    name={(categories.find((c) => c.name === quiz.category)?.icon ?? 'document-text') as any}
                    size={16}
                    color={Colors.primary}
                  />
                  <Text style={styles.quizCategory}>{quiz.category}</Text>
                </View>
                <View style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor: quiz.difficulty === 'EASY'
                      ? Colors.successLight
                      : quiz.difficulty === 'MEDIUM'
                      ? Colors.warningLight
                      : Colors.errorLight
                  },
                ]}>
                  <Text style={[
                    styles.difficultyText,
                    {
                      color: quiz.difficulty === 'EASY'
                        ? Colors.success
                        : quiz.difficulty === 'MEDIUM'
                        ? Colors.warning
                        : Colors.error
                    },
                  ]}>
                    {quiz.difficulty === 'EASY' ? 'Fácil' : quiz.difficulty === 'MEDIUM' ? 'Médio' : 'Difícil'}
                  </Text>
                </View>
              </View>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <View style={styles.quizMeta}>
                <View style={styles.quizMetaItem}>
                  <Ionicons name="help-circle-outline" size={14} color={Colors.gray[400]} />
                  <Text style={styles.quizMetaText}>{quiz.questionCount} questões</Text>
                </View>
                <View style={styles.quizMetaItem}>
                  <Ionicons name="trophy-outline" size={14} color={Colors.gray[400]} />
                  <Text style={styles.quizMetaText}>{quiz.points} pts</Text>
                </View>
                {quiz.completed && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                    <Text style={styles.completedText}>Feito</Text>
                  </View>
                )}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top Ranking */}
      <View style={[styles.section, { marginBottom: insets.bottom + 24 }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Ranking</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
            <Text style={styles.sectionLink}>Ver todos →</Text>
          </TouchableOpacity>
        </View>
        <Card style={styles.rankingCard}>
          {ranking.slice(0, 3).map((entry, i) => (
            <View key={entry.userId} style={[styles.rankItem, i < 2 && styles.rankItemBorder]}>
              <View style={[
                styles.rankPosition,
                i === 0 && { backgroundColor: Colors.warningLight },
                i === 1 && { backgroundColor: Colors.gray[100] },
                i === 2 && { backgroundColor: '#FDE8D0' },
              ]}>
                <Text style={[
                  styles.rankPositionText,
                  i === 0 && { color: Colors.warning },
                  i === 1 && { color: Colors.gray[500] },
                  i === 2 && { color: '#CD7F32' },
                ]}>
                  {entry.position}
                </Text>
              </View>
              <Avatar uri={entry.photoUrl} name={entry.userName} size={40} />
              <View style={styles.rankInfo}>
                <Text style={styles.rankName}>{entry.userName}</Text>
                <Text style={styles.rankPoints}>Nível {entry.level} • {entry.points} pts</Text>
              </View>
              {i === 0 && <Ionicons name="trophy" size={18} color="#FFD700" />}
              {i === 1 && <Ionicons name="medal" size={18} color="#C0C0C0" />}
              {i === 2 && <Ionicons name="medal" size={18} color="#CD7F32" />}
            </View>
          ))}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: { fontSize: 15, color: 'rgba(255,255,255,0.8)' },
  name: { fontSize: 26, fontWeight: '800', color: Colors.white, letterSpacing: -0.3 },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  notifBadgeText: { fontSize: 10, fontWeight: 'bold', color: Colors.white },
  heroSubtext: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  decorCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  statsContainer: {
    marginTop: -28,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.gray[900], letterSpacing: -0.3 },
  statLabel: { fontSize: 11, color: Colors.gray[500], marginTop: 2, fontWeight: '500' },
  quickActions: { paddingHorizontal: 16, marginBottom: 8 },
  quickAction: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: { flex: 1 },
  quickActionTitle: { fontSize: 17, fontWeight: '700', color: Colors.white },
  quickActionSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: Colors.gray[900], letterSpacing: -0.3 },
  sectionLink: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  contentCard: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
  },
  contentImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 12,
  },
  contentInfo: { flex: 1, justifyContent: 'center' },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#FFF5F5',
    marginBottom: 6,
  },
  categoryText: { fontSize: 10, fontWeight: '700', color: Colors.primary },
  contentTitle: { fontSize: 15, fontWeight: '700', color: Colors.gray[900], marginBottom: 4, lineHeight: 20 },
  contentSummary: { fontSize: 12, color: Colors.gray[500], marginBottom: 6, lineHeight: 17 },
  contentMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: Colors.gray[400], fontWeight: '500' },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.gray[300], marginHorizontal: 4 },
  quizCard: { marginBottom: 12, padding: 16 },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quizCategoryRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  quizEmoji: { fontSize: 16 },
  quizCategory: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  difficultyBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  difficultyText: { fontSize: 11, fontWeight: '700' },
  quizTitle: { fontSize: 16, fontWeight: '700', color: Colors.gray[900], marginBottom: 10 },
  quizMeta: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quizMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quizMetaText: { fontSize: 12, color: Colors.gray[500], fontWeight: '500' },
  completedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto' },
  completedText: { fontSize: 12, fontWeight: '600', color: Colors.success },
  rankingCard: { padding: 4 },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  rankItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  rankPosition: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankPositionText: { fontSize: 14, fontWeight: '800' },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 14, fontWeight: '700', color: Colors.gray[900], marginBottom: 2 },
  rankPoints: { fontSize: 12, color: Colors.gray[500] },
  medalEmoji: { fontSize: 20 },
});
