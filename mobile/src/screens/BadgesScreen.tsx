import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { badgeIcons } from '../constants/categories';
import { fetchBadges } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function BadgesScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { data: badgesData, loading, error, retry } = useApi(fetchBadges);

  if (loading) return <LoadingView />;
  if (error || !badgesData) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const badges = badgesData;
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Badges"
        subtitle={`${unlockedCount}/${badges.length} desbloqueados`}
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={26} color={Colors.warning} style={styles.statIcon} />
            <Text style={styles.statValue}>{unlockedCount}</Text>
            <Text style={styles.statLabel}>Desbloqueados</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="lock-closed" size={26} color={Colors.gray[400]} style={styles.statIcon} />
            <Text style={styles.statValue}>{badges.length - unlockedCount}</Text>
            <Text style={styles.statLabel}>Bloqueados</Text>
          </View>
        </View>

        {/* Badges Grid */}
        <Text style={styles.sectionTitle}>Suas Conquistas</Text>
        <View style={styles.badgesGrid}>
          {badges.map(badge => (
            <Card
              key={badge.id}
              style={[styles.badgeCard, !badge.unlocked ? styles.badgeCardLocked : undefined]}
            >
              <View style={[styles.badgeIconBg, !badge.unlocked && styles.badgeIconLocked]}>
                <Ionicons
                  name={(badgeIcons[badge.icon] ?? 'medal') as any}
                  size={30}
                  color={badge.unlocked ? Colors.primary : Colors.gray[400]}
                />
                {!badge.unlocked && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={14} color={Colors.gray[500]} />
                  </View>
                )}
              </View>
              <Text style={[styles.badgeName, !badge.unlocked && styles.badgeNameLocked]}>
                {badge.name}
              </Text>
              <Text style={styles.badgeDesc} numberOfLines={2}>{badge.description}</Text>

              {badge.progress !== undefined && badge.maxProgress !== undefined && (
                <View style={styles.progressSection}>
                  <View style={styles.progressBarBg}>
                    {badge.unlocked ? (
                      <LinearGradient
                        colors={Colors.gradient.primary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressBarFill, { width: '100%' }]}
                      />
                    ) : (
                      <View
                        style={[
                          styles.progressBarFillPlain,
                          { width: `${(badge.progress / badge.maxProgress) * 100}%` },
                        ]}
                      />
                    )}
                  </View>
                  <Text style={styles.progressText}>
                    {badge.progress}/{badge.maxProgress}
                  </Text>
                </View>
              )}

              {badge.unlocked && (
                <View style={styles.unlockedBadge}>
                  <Text style={styles.unlockedText}>Desbloqueado</Text>
                </View>
              )}

              <View style={styles.categoryRow}>
                <Text style={styles.categoryText}>{badge.category}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: { marginBottom: 6 },
  statValue: { fontSize: 28, fontWeight: '800', color: Colors.gray[900] },
  statLabel: { fontSize: 12, color: Colors.gray[500], marginTop: 2 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.gray[900],
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '47%',
    padding: 16,
    alignItems: 'center',
  },
  badgeCardLocked: { opacity: 0.7 },
  badgeIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  badgeIconLocked: { backgroundColor: Colors.gray[100] },
  badgeIcon: { fontSize: 32 },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  lockIcon: { fontSize: 16 },
  badgeName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeNameLocked: { color: Colors.gray[500] },
  badgeDesc: {
    fontSize: 11,
    color: Colors.gray[500],
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 10,
  },
  progressSection: { width: '100%', marginBottom: 8 },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: { height: '100%', borderRadius: 3 },
  progressBarFillPlain: { height: '100%', borderRadius: 3, backgroundColor: Colors.gray[400] },
  progressText: { fontSize: 10, color: Colors.gray[400], textAlign: 'center' },
  unlockedBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 4,
  },
  unlockedText: { fontSize: 10, fontWeight: '700', color: Colors.success },
  categoryRow: { marginTop: 4 },
  categoryText: { fontSize: 10, fontWeight: '600', color: Colors.gray[400] },
});
