import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { getCurrentUser, logout, fetchQuizzes } from '../services/api';
import { useApi } from '../services/useApiData';

export default function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const user = getCurrentUser();
  const { data: quizzes } = useApi(fetchQuizzes);
  const completedCount = (quizzes ?? []).filter((q) => q.completed).length;
  const points = user?.points ?? 0;
  const level = user?.level ?? 1;
  const progressPercent = Math.min(points % 100, 100);
  const pointsToNext = Math.max(level * 100 - points, 0);

  const menuSections = [
    {
      title: 'Conta',
      items: [
        { icon: 'person-outline', title: 'Editar Perfil', screen: 'EditProfile', color: undefined as string | undefined },
        { icon: 'notifications-outline', title: 'Notificações', screen: 'Notifications', color: undefined as string | undefined },
        { icon: 'ribbon-outline', title: 'Badges', screen: 'Badges', color: undefined as string | undefined },
      ],
    },
    {
      title: 'Aplicação',
      items: [
        { icon: 'settings-outline', title: 'Configurações', screen: 'Settings', color: undefined as string | undefined },
        { icon: 'chatbubbles-outline', title: 'Fórum', screen: 'Forum', color: undefined as string | undefined },
        { icon: 'help-circle-outline', title: 'Ajuda & FAQ', screen: 'Help', color: undefined as string | undefined },
      ],
    },
    {
      title: '',
      items: [
        { icon: 'log-out-outline', title: 'Sair', screen: 'Logout', color: Colors.error as string | undefined },
      ],
    },
  ];

  const handleMenuPress = (screen: string) => {
    if (screen === 'Logout') {
      logout();
      navigation.replace('Auth');
    } else if (['EditProfile', 'Notifications', 'Badges', 'Settings', 'Forum'].includes(screen)) {
      navigation.navigate(screen);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark, '#450000']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <Avatar uri={user?.photoUrl} name={user?.name ?? 'Estudante'} size={88} />
          </View>
          <Text style={styles.name}>{user?.name ?? 'Estudante'}</Text>
          <Text style={styles.email}>{user?.email ?? ''}</Text>
          <View style={styles.levelBadge}>
            <Ionicons name="star" size={14} color={Colors.accent} />
            <Text style={styles.levelText}>Nível {level}</Text>
          </View>
        </View>

        {/* Decorative */}
        <View style={[styles.decorCircle, { top: -30, right: -60 }]} />
        <View style={[styles.decorCircle, { bottom: 40, left: -40, width: 120, height: 120 }]} />
      </LinearGradient>

      <View style={styles.content}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            {[
              { value: String(points), label: 'Pontos', icon: 'star', color: Colors.warning },
              { value: String(level), label: 'Nível', icon: 'trending-up', color: Colors.info },
              { value: String(completedCount), label: 'Quizzes', icon: 'bulb', color: Colors.success },
            ].map((stat, i) => (
              <View key={i} style={styles.statCard}>
                <Ionicons name={stat.icon as any} size={22} color={stat.color} style={styles.statIcon} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Progress Card */}
        <Card variant="elevated" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progresso para Nível {level + 1}</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={Colors.gradient.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
          <View style={styles.progressFooter}>
            <Text style={styles.progressText}>{points} pontos</Text>
            <Text style={styles.progressTextGoal}>Faltam {pointsToNext} pts</Text>
          </View>
        </Card>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <View key={si} style={styles.menuSection}>
            {section.title ? (
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
            ) : null}
            <View style={styles.menuCard}>
              {section.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  style={[styles.menuItem, ii < section.items.length - 1 && styles.menuItemBorder]}
                  onPress={() => handleMenuPress(item.screen)}
                  activeOpacity={0.6}
                >
                  <View style={[
                    styles.menuIconBg,
                    { backgroundColor: item.color ? Colors.errorLight : '#FFF5F5' },
                  ]}>
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={item.color || Colors.primary}
                    />
                  </View>
                  <Text style={[styles.menuText, item.color && { color: item.color }]}>
                    {item.title}
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color={Colors.gray[300]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <Text style={styles.version}>EHA v1.0.0</Text>

        <View style={{ height: insets.bottom + 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  header: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  avatarSection: { alignItems: 'center', zIndex: 2 },
  avatarRing: {
    padding: 4,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 14,
  },
  name: { fontSize: 24, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  email: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 12 },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  levelText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  decorCircle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  content: { paddingHorizontal: 16 },
  statsContainer: {
    marginTop: -20,
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
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: { marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.gray[900] },
  statLabel: { fontSize: 11, color: Colors.gray[500], marginTop: 2, fontWeight: '500' },
  progressCard: { marginBottom: 20, padding: 20 },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressTitle: { fontSize: 15, fontWeight: '700', color: Colors.gray[900] },
  progressPercent: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  progressBarBg: {
    height: 10,
    backgroundColor: Colors.gray[100],
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: { fontSize: 12, color: Colors.gray[500], fontWeight: '500' },
  progressTextGoal: { fontSize: 12, color: Colors.gray[400], fontWeight: '500' },
  menuSection: { marginBottom: 16 },
  menuSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray[400],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.gray[800] },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.gray[400],
    marginTop: 8,
    marginBottom: 8,
  },
});
