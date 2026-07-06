import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { categories } from '../constants/categories';
import { fetchForumTopics } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function ForumScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');
  const { data: topics, loading, error, retry } = useApi(fetchForumTopics);

  if (loading) return <LoadingView />;
  if (error || !topics) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const filtered = filter === 'all'
    ? topics
    : topics.filter(t => t.category === filter);

  const getCategoryColor = (cat: string) => {
    const found = categories.find(c => c.name === cat);
    return found?.color || Colors.primary;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d atrás`;
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Fórum"
        subtitle="Discussões e debates"
        showBack
        onBack={() => navigation.goBack()}
      />

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
        contentContainerStyle={styles.filtersContent}
      >
        {['all', ...categories.map(c => c.name)].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterChip, filter === cat && styles.filterChipActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>
              {cat === 'all' ? '📋 Todos' : `${categories.find(c => c.name === cat)?.icon || ''} ${cat}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Topics */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(topic => (
          <Card key={topic.id} style={styles.topicCard}>
            {topic.isPinned && (
              <View style={styles.pinnedBadge}>
                <Ionicons name="pin" size={12} color={Colors.warning} />
                <Text style={styles.pinnedText}>Fixado</Text>
              </View>
            )}
            <Text style={styles.topicTitle}>{topic.title}</Text>
            <View style={styles.topicMeta}>
              <View style={[styles.categoryTag, { backgroundColor: `${getCategoryColor(topic.category)}15` }]}>
                <Text style={[styles.categoryTagText, { color: getCategoryColor(topic.category) }]}>
                  {topic.category}
                </Text>
              </View>
              <Text style={styles.timeText}>{formatDate(topic.lastActivity)}</Text>
            </View>
            <View style={styles.topicFooter}>
              <View style={styles.authorRow}>
                <Avatar uri={topic.authorPhotoUrl} name={topic.author} size={28} />
                <Text style={styles.authorName}>{topic.author}</Text>
              </View>
              <View style={styles.topicStats}>
                <View style={styles.topicStat}>
                  <Ionicons name="chatbubble-outline" size={14} color={Colors.gray[400]} />
                  <Text style={styles.topicStatText}>{topic.replies}</Text>
                </View>
                <View style={styles.topicStat}>
                  <Ionicons name="eye-outline" size={14} color={Colors.gray[400]} />
                  <Text style={styles.topicStatText}>{topic.views}</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.gray[50] },
  filters: { maxHeight: 56, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.gray[100] },
  filtersContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    marginRight: 4,
  },
  filterChipActive: { backgroundColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.gray[700] },
  filterTextActive: { color: Colors.white, fontWeight: '700' },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  topicCard: { marginBottom: 12, padding: 18 },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  pinnedText: { fontSize: 11, fontWeight: '700', color: Colors.warning },
  topicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 10,
    lineHeight: 22,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: { fontSize: 11, fontWeight: '700' },
  timeText: { fontSize: 12, color: Colors.gray[400] },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  authorName: { fontSize: 13, fontWeight: '600', color: Colors.gray[700] },
  topicStats: { flexDirection: 'row', gap: 14 },
  topicStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  topicStatText: { fontSize: 12, fontWeight: '600', color: Colors.gray[400] },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});
