import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { fetchContent, fetchContents } from '../services/api';
import { useApi } from '../services/useApiData';
import { LoadingView, ErrorView } from '../components/StatusViews';

// Converte o corpo HTML vindo da API em blocos renderizáveis em RN
type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

function parseArticleBody(html: string): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const pattern = /<(h2|p|ul)>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const inner = match[2];
    const clean = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (tag === 'h2') {
      blocks.push({ type: 'heading', text: clean(inner) });
    } else if (tag === 'p') {
      blocks.push({ type: 'paragraph', text: clean(inner) });
    } else {
      const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/gi)].map((m) => clean(m[1]));
      blocks.push({ type: 'list', items });
    }
  }
  return blocks;
}

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.42;

export default function ContentDetailScreen({ route, navigation }: any) {
  const { contentId } = route.params;
  const { data: content, loading, error, retry } = useApi(() => fetchContent(contentId));
  const { data: allContents } = useApi(fetchContents);
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();

  if (loading) return <LoadingView />;
  if (error && !error.includes('não encontrado')) {
    return <ErrorView message={error} onRetry={retry} />;
  }
  if (!content) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconBg}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.gray[400]} />
        </View>
        <Text style={styles.errorTitle}>Conteúdo não encontrado</Text>
        <Text style={styles.errorText}>
          O conteúdo que procura não existe ou foi removido.
        </Text>
        <TouchableOpacity style={styles.errorButton} onPress={() => navigation.goBack()}>
          <Text style={styles.errorButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${content.title}\n\n${content.summary}\n\nVia EHA - Economia com História: Angola`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsRead = () => {
    alert('Conteúdo marcado como lido! +10 pontos');
  };

  const fullContent = parseArticleBody(content.body);

  const relatedContents = (allContents ?? [])
    .filter((c) => c.id !== content.id && c.category === content.category)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Floating Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsSaved(!isSaved)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: content.imageUrl }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.75)']}
            style={styles.heroGradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{content.category}</Text>
            </View>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.metadata}>
              <View style={styles.metadataItem}>
                <Ionicons name="time-outline" size={15} color="rgba(255,255,255,0.9)" />
                <Text style={styles.metadataText}>{content.readTime} min</Text>
              </View>
              <View style={styles.metadataDivider} />
              <View style={styles.metadataItem}>
                <Ionicons name="eye-outline" size={15} color="rgba(255,255,255,0.9)" />
                <Text style={styles.metadataText}>{content.views.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryHeader}>
            <Ionicons name="information-circle" size={22} color={Colors.primary} />
            <Text style={styles.summaryTitle}>Resumo</Text>
          </View>
          <Text style={styles.summaryText}>{content.summary}</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {fullContent.map((section, index) => {
            if (section.type === 'heading') {
              return (
                <Text key={index} style={styles.contentHeading}>{section.text}</Text>
              );
            } else if (section.type === 'paragraph') {
              return (
                <Text key={index} style={styles.contentParagraph}>{section.text}</Text>
              );
            } else if (section.type === 'list') {
              return (
                <View key={index} style={styles.listContainer}>
                  {(section as any).items?.map((item: string, itemIndex: number) => (
                    <View key={itemIndex} style={styles.listItem}>
                      <View style={styles.listBullet}>
                        <View style={styles.bulletDot} />
                      </View>
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>

        {/* Related Contents */}
        {relatedContents.length > 0 && (
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedTitle}>Conteúdos Relacionados</Text>
            {relatedContents.map((relatedContent) => (
              <TouchableOpacity
                key={relatedContent.id}
                style={styles.relatedCard}
                onPress={() => navigation.push('ContentDetail', { contentId: relatedContent.id })}
                activeOpacity={0.7}
              >
                <Image source={{ uri: relatedContent.imageUrl }} style={styles.relatedImage} />
                <View style={styles.relatedContent}>
                  <Text style={styles.relatedCardTitle} numberOfLines={2}>
                    {relatedContent.title}
                  </Text>
                  <View style={styles.relatedMeta}>
                    <Ionicons name="time-outline" size={12} color={Colors.gray[500]} />
                    <Text style={styles.relatedMetaText}>{relatedContent.readTime} min</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quiz CTA */}
        <TouchableOpacity
          style={styles.quizCTA}
          onPress={() => navigation.navigate('Quizzes')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.quizGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.quizIconContainer}>
              <Ionicons name="bulb" size={28} color="#fff" />
            </View>
            <View style={styles.quizTextContainer}>
              <Text style={styles.quizCTATitle}>Teste seus Conhecimentos</Text>
              <Text style={styles.quizCTAText}>Faça um quiz sobre este tema e ganhe pontos!</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.bottomAction, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.markReadButton} onPress={handleMarkAsRead} activeOpacity={0.8}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.markReadGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <Text style={styles.markReadText}>Marcar como Lido</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 10,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: { flexDirection: 'row', gap: 10 },
  scrollView: { flex: 1 },
  heroContainer: { position: 'relative', height: HERO_HEIGHT },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT * 0.65,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 22,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: Math.min(width * 0.065, 28),
    fontWeight: '800',
    color: '#fff',
    marginBottom: 12,
    lineHeight: Math.min(width * 0.08, 34),
    letterSpacing: -0.3,
  },
  metadata: { flexDirection: 'row', alignItems: 'center' },
  metadataItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metadataDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 12,
  },
  metadataText: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '600' },
  summaryContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    padding: 18,
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: Colors.gray[900] },
  summaryText: { fontSize: 15, color: Colors.gray[700], lineHeight: 24 },
  contentContainer: { paddingHorizontal: 20 },
  contentHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.gray[900],
    marginTop: 28,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  contentParagraph: {
    fontSize: 15,
    color: Colors.gray[700],
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'justify',
  },
  listContainer: {
    marginBottom: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 14,
    padding: 16,
  },
  listItem: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  listBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  listText: { flex: 1, fontSize: 15, color: Colors.gray[700], lineHeight: 24 },
  relatedContainer: {
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    marginHorizontal: 20,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.gray[900],
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  relatedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  relatedImage: { width: 100, height: 100 },
  relatedContent: { flex: 1, padding: 14, justifyContent: 'center' },
  relatedCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
    lineHeight: 19,
  },
  relatedMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  relatedMetaText: { fontSize: 12, color: Colors.gray[500], fontWeight: '500' },
  quizCTA: {
    marginHorizontal: 20,
    marginTop: 28,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  quizGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 14,
  },
  quizIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizTextContainer: { flex: 1 },
  quizCTATitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 4 },
  quizCTAText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 18 },
  bottomAction: {
    paddingHorizontal: 16,
    paddingTop: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  markReadButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  markReadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  markReadText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.white,
  },
  errorIconBg: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: Colors.gray[500],
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  errorButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  errorButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
