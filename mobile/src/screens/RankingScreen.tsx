import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { fetchRanking, getCurrentUser } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function RankingScreen() {
  const insets = useSafeAreaInsets();
  const { data: ranking, loading, error, retry } = useApi(fetchRanking);
  const user = getCurrentUser();

  if (loading) return <LoadingView />;
  if (error || !ranking) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);
  const userEntry = user ? ranking.find(e => e.userId === user.id) : undefined;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Ranking</Text>
        <Text style={styles.headerSubtitle}>Top estudantes da plataforma</Text>

        {/* Podium */}
        <View style={styles.podium}>
          {/* 2nd Place */}
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatarContainer}>
              <Avatar uri={top3[1]?.photoUrl} name={top3[1]?.userName || ''} size={56} />
              <View style={[styles.podiumBadge, { backgroundColor: '#C0C0C0' }]}>
                <Text style={styles.podiumBadgeText}>2</Text>
              </View>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{top3[1]?.userName?.split(' ')[0]}</Text>
            <Text style={styles.podiumPoints}>{top3[1]?.points} pts</Text>
            <View style={[styles.podiumBar, styles.podiumBar2]}>
              <Ionicons name="medal" size={22} color="#C0C0C0" />
            </View>
          </View>

          {/* 1st Place */}
          <View style={styles.podiumItem}>
            <View style={styles.crownContainer}>
              <Ionicons name="star" size={22} color="#FFD700" />
            </View>
            <View style={styles.podiumAvatarContainer}>
              <View style={styles.goldRing}>
                <Avatar uri={top3[0]?.photoUrl} name={top3[0]?.userName || ''} size={64} />
              </View>
              <View style={[styles.podiumBadge, { backgroundColor: '#FFD700' }]}>
                <Text style={[styles.podiumBadgeText, { color: Colors.gray[900] }]}>1</Text>
              </View>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{top3[0]?.userName?.split(' ')[0]}</Text>
            <Text style={styles.podiumPoints}>{top3[0]?.points} pts</Text>
            <View style={[styles.podiumBar, styles.podiumBar1]}>
              <Ionicons name="trophy" size={24} color="#FFD700" />
            </View>
          </View>

          {/* 3rd Place */}
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatarContainer}>
              <Avatar uri={top3[2]?.photoUrl} name={top3[2]?.userName || ''} size={56} />
              <View style={[styles.podiumBadge, { backgroundColor: '#CD7F32' }]}>
                <Text style={styles.podiumBadgeText}>3</Text>
              </View>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{top3[2]?.userName?.split(' ')[0]}</Text>
            <Text style={styles.podiumPoints}>{top3[2]?.points} pts</Text>
            <View style={[styles.podiumBar, styles.podiumBar3]}>
              <Ionicons name="medal" size={22} color="#CD7F32" />
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* User Position */}
        {user && userEntry && (
          <Card variant="elevated" style={styles.userCard}>
            <View style={styles.userCardHeader}>
              <Ionicons name="person" size={16} color={Colors.primary} />
              <Text style={styles.userCardTitle}>Sua Posição</Text>
            </View>
            <View style={styles.userRank}>
              <View style={styles.userPosition}>
                <Text style={styles.userPositionText}>#{userEntry.position}</Text>
              </View>
              <Avatar uri={user.photoUrl} name={user.name} size={44} showLevel level={user.level} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userStats}>Nível {user.level} • {userEntry.points} pts</Text>
              </View>
              <View style={styles.trendBadge}>
                <Ionicons name="trending-up" size={14} color={Colors.success} />
              </View>
            </View>
          </Card>
        )}

        {/* Rest of ranking */}
        <Text style={styles.listTitle}>Classificação Geral</Text>
        <View style={styles.list}>
          {rest.map(entry => (
            <View
              key={entry.userId}
              style={[
                styles.rankItem,
                entry.userId === user?.id && styles.rankItemHighlight,
              ]}
            >
              <Text style={styles.position}>{entry.position}</Text>
              <Avatar uri={entry.photoUrl} name={entry.userName} size={40} />
              <View style={styles.info}>
                <Text style={styles.name}>{entry.userName}</Text>
                <Text style={styles.stats}>Nível {entry.level} • {entry.points} pts</Text>
              </View>
              <View style={styles.pointsBadge}>
                <Text style={styles.pointsText}>{entry.points}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 24,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
  },
  podiumAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  crownContainer: {
    marginBottom: 4,
  },
  crownEmoji: { fontSize: 24 },
  goldRing: {
    padding: 3,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#FFD700',
  },
  podiumBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: Colors.primaryDark,
  },
  podiumBadgeText: { fontSize: 11, fontWeight: '800', color: Colors.white },
  podiumName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 2,
    maxWidth: 80,
    textAlign: 'center',
  },
  podiumPoints: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  podiumBar: {
    width: '85%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumBar1: {
    height: 60,
    backgroundColor: 'rgba(255,215,0,0.25)',
  },
  podiumBar2: {
    height: 44,
    backgroundColor: 'rgba(192,192,192,0.2)',
  },
  podiumBar3: {
    height: 32,
    backgroundColor: 'rgba(205,127,50,0.2)',
  },
  podiumEmoji: { fontSize: 22 },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  userCard: { marginBottom: 20, padding: 18 },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  userCardTitle: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  userRank: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  userPosition: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userPositionText: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '700', color: Colors.gray[900], marginBottom: 3 },
  userStats: { fontSize: 13, color: Colors.gray[500] },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: { fontSize: 12, fontWeight: '700', color: Colors.success },
  listTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.gray[900],
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  list: { gap: 8 },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 14,
    gap: 12,
  },
  rankItemHighlight: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: '#FFF5F5',
  },
  position: {
    width: 28,
    fontSize: 15,
    fontWeight: '800',
    color: Colors.gray[400],
    textAlign: 'center',
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: Colors.gray[900], marginBottom: 2 },
  stats: { fontSize: 12, color: Colors.gray[500] },
  pointsBadge: {
    backgroundColor: Colors.gray[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: { fontSize: 13, fontWeight: '700', color: Colors.gray[700] },
});
