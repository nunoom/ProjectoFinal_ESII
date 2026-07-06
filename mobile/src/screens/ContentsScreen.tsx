import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Card from '../components/Card';
import { categories } from '../constants/categories';
import { fetchContents } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

export default function ContentsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const { data: contents, loading, error, retry } = useApi(fetchContents);

  if (loading) return <LoadingView />;
  if (error || !contents) return <ErrorView message={error ?? 'Erro'} onRetry={retry} />;

  const filtered = contents.filter(c =>
    (category === 'all' || c.category === category) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark]}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Conteúdos</Text>
        <Text style={styles.headerSubtitle}>Explore e aprenda sobre economia angolana</Text>
      </LinearGradient>

      {/* Search & Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar conteúdos..."
            placeholderTextColor={Colors.gray[400]}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity
            style={[styles.categoryChip, category === 'all' && styles.categoryChipActive]}
            onPress={() => setCategory('all')}
            activeOpacity={0.7}
          >
            <Text style={[styles.categoryChipText, category === 'all' && styles.categoryChipTextActive]}>
              📋 Todos
            </Text>
          </TouchableOpacity>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, category === cat.name && styles.categoryChipActive]}
              onPress={() => setCategory(cat.name)}
              activeOpacity={0.7}
            >
              <Text style={[styles.categoryChipText, category === cat.name && styles.categoryChipTextActive]}>
                {cat.icon} {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultText}>
          {filtered.length} {filtered.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}
        </Text>
      </View>

      {/* Content List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(content => (
          <TouchableOpacity
            key={content.id}
            onPress={() => navigation.navigate('ContentDetail', { contentId: content.id })}
            activeOpacity={0.85}
          >
            <Card variant="elevated" style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: content.imageUrl }} style={styles.image} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.6)']}
                  style={styles.imageGradient}
                />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{content.category}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={2}>{content.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>{content.summary}</Text>
                <View style={styles.meta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={15} color={Colors.gray[400]} />
                    <Text style={styles.metaText}>{content.readTime} min</Text>
                  </View>
                  <View style={styles.metaDivider} />
                  <View style={styles.metaItem}>
                    <Ionicons name="eye-outline" size={15} color={Colors.gray[400]} />
                    <Text style={styles.metaText}>{content.views.toLocaleString()}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="search-outline" size={48} color={Colors.gray[300]} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum conteúdo encontrado</Text>
            <Text style={styles.emptyText}>Tente ajustar a pesquisa ou os filtros</Text>
          </View>
        )}

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
  },
  searchSection: {
    backgroundColor: Colors.white,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.gray[50],
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.gray[900],
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    marginRight: 4,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  categoryChipText: {
    fontSize: 13,
    color: Colors.gray[700],
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  resultText: {
    fontSize: 13,
    color: Colors.gray[500],
    fontWeight: '500',
  },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  card: {
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    padding: 0,
  },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 200, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  cardContent: { padding: 18 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
    lineHeight: 24,
  },
  summary: {
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: 14,
    lineHeight: 20,
  },
  meta: { flexDirection: 'row', alignItems: 'center' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray[300],
    marginHorizontal: 12,
  },
  metaText: { fontSize: 13, color: Colors.gray[400], fontWeight: '500' },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray[500],
  },
});
