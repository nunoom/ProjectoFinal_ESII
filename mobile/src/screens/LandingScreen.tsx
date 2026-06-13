import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, radius, font } from '../theme';
import Reveal from '../components/Reveal';

// ─── Pequenos building blocks ──────────────────────────────────────────────────

function Logo() {
  return (
    <View style={styles.logoRow}>
      <View style={styles.logoMark}>
        <Text style={styles.logoMarkText}>E</Text>
      </View>
      <Text style={styles.logoText}>EHA</Text>
    </View>
  );
}

function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
      <Feather name="arrow-right" size={16} color={colors.white} />
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressedLight]}
    >
      <Text style={styles.secondaryBtnText}>{label}</Text>
    </Pressable>
  );
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export default function LandingScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Header translúcido: fade-in do fundo branco + borda ao fazer scroll
  const headerBg = scrollY.interpolate({
    inputRange: [0, 44],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)'],
    extrapolate: 'clamp',
  });
  const headerBorder = scrollY.interpolate({
    inputRange: [0, 44],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER fixo translúcido */}
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBg, borderBottomColor: colors.border, borderBottomWidth: headerBorder },
        ]}
      >
        <Logo />
        <Pressable style={({ pressed }) => [styles.headerCta, pressed && styles.pressedLight]}>
          <Text style={styles.headerCtaText}>Entrar</Text>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HERO ── */}
        <View style={styles.hero}>
          {/* Glow ambiente */}
          <LinearGradient
            colors={['rgba(139,0,0,0.07)', 'rgba(139,0,0,0)']}
            style={styles.heroGlow}
            pointerEvents="none"
          />

          <Reveal delay={0}>
            <View style={styles.eyebrow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrowText}>Plataforma Educacional · ISPTEC</Text>
            </View>
          </Reveal>

          <Reveal delay={100}>
            <Text style={styles.heroTitle}>
              A história que{' '}
              <Text style={styles.heroTitleAccent}>moldou</Text>
              {' '}uma nação.
            </Text>
          </Reveal>

          <Reveal delay={180}>
            <Text style={styles.heroSubtitle}>
              Explore a economia angolana através de conteúdos interativos, quizzes e debate em
              comunidade.
            </Text>
          </Reveal>

          <Reveal delay={260} style={styles.heroButtons}>
            <PrimaryButton label="Criar conta" />
            <SecondaryButton label="Já tenho conta" />
          </Reveal>

          <Reveal delay={900} style={styles.scrollHint}>
            <Feather name="chevron-down" size={22} color={colors.grayLight} />
          </Reveal>
        </View>

        {/* ── STATS ── */}
        <View style={styles.statsRow}>
          {[
            { value: '500+', label: 'Conteúdos' },
            { value: '200+', label: 'Quizzes' },
            { value: '10K+', label: 'Estudantes' },
            { value: '95%', label: 'Satisfação' },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70} style={styles.statCell}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Reveal>
          ))}
        </View>

        {/* ── FEATURES ── */}
        <View style={styles.section}>
          <Reveal>
            <Text style={styles.sectionTitle}>Tudo o que precisa.{'\n'}Numa só plataforma.</Text>
          </Reveal>

          <View style={styles.featureStack}>
            {/* Conteúdos */}
            <Reveal delay={60}>
              <View style={styles.featureCardLight}>
                <View style={[styles.iconBadge, { backgroundColor: colors.blueBg }]}>
                  <Feather name="book-open" size={22} color={colors.blue} />
                </View>
                <Text style={styles.featureTitleDark}>Conteúdos ricos e acessíveis.</Text>
                <Text style={styles.featureBodyDark}>
                  Artigos aprofundados sobre petróleo, kwanza, guerra civil, agricultura e reformas
                  económicas.
                </Text>
              </View>
            </Reveal>

            {/* Quizzes — bordeaux */}
            <Reveal delay={120}>
              <View style={[styles.featureCard, { backgroundColor: colors.brand }]}>
                <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                  <Feather name="cpu" size={22} color={colors.white} />
                </View>
                <Text style={styles.featureTitleLight}>Quizzes que desafiam.</Text>
                <Text style={[styles.featureBodyLight, { color: 'rgba(255,255,255,0.72)' }]}>
                  Múltiplos níveis de dificuldade. Feedback imediato com explicações detalhadas.
                </Text>
              </View>
            </Reveal>

            {/* Ranking — dark */}
            <Reveal delay={180}>
              <View style={[styles.featureCard, { backgroundColor: colors.black }]}>
                <View style={[styles.iconBadge, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Feather name="award" size={22} color={colors.yellow} />
                </View>
                <Text style={styles.featureTitleLight}>Compete. Lidera.</Text>
                <Text style={[styles.featureBodyLight, { color: 'rgba(255,255,255,0.55)' }]}>
                  Ranking global e semanal. Pontos, níveis e conquistas desbloqueáveis.
                </Text>
              </View>
            </Reveal>

            {/* Fórum */}
            <Reveal delay={240}>
              <View style={styles.featureCardLight}>
                <View style={[styles.iconBadge, { backgroundColor: colors.greenBg }]}>
                  <Feather name="users" size={22} color={colors.green} />
                </View>
                <Text style={styles.featureTitleDark}>Uma comunidade que aprende junta.</Text>
                <Text style={styles.featureBodyDark}>
                  Fórum organizado por tópicos. Partilhe perspetivas e construa conhecimento de forma
                  colaborativa.
                </Text>
              </View>
            </Reveal>
          </View>
        </View>

        {/* ── TOPICS ── */}
        <View style={styles.sectionPlain}>
          <Reveal>
            <Text style={styles.eyebrowLabel}>TÓPICOS</Text>
            <Text style={styles.sectionTitle}>Seis décadas.{'\n'}Seis áreas temáticas.</Text>
          </Reveal>

          <View style={styles.topicList}>
            {[
              { name: 'Petróleo', count: '45', desc: 'Da descoberta à dependência', dot: colors.brand },
              { name: 'Kwanza', count: '32', desc: 'Reformas monetárias e inflação', dot: '#B8860B' },
              { name: 'Guerra Civil', count: '28', desc: 'Impacto do conflito armado', dot: '#4B5563' },
              { name: 'Agricultura', count: '38', desc: 'Do café à soberania alimentar', dot: '#065F46' },
              { name: 'Reformas', count: '25', desc: 'Transição pós-independência', dot: '#1E40AF' },
              { name: 'Comércio', count: '30', desc: 'Parceiros e exportações', dot: '#C2410C' },
            ].map((topic, i) => (
              <Reveal key={topic.name} delay={i * 40}>
                <Pressable
                  style={({ pressed }) => [styles.topicRow, pressed && styles.pressedLight]}
                >
                  <View style={[styles.topicDot, { backgroundColor: topic.dot }]} />
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicName}>{topic.name}</Text>
                    <Text style={styles.topicDesc}>{topic.desc}</Text>
                  </View>
                  <Text style={styles.topicCount}>{topic.count}</Text>
                  <Feather name="chevron-right" size={18} color={colors.grayLight} />
                </Pressable>
              </Reveal>
            ))}
          </View>
        </View>

        {/* ── CTA escuro ── */}
        <View style={styles.cta}>
          <Reveal>
            <Text style={styles.ctaTitle}>Pronto para começar a aprender?</Text>
          </Reveal>
          <Reveal delay={100}>
            <Text style={styles.ctaSubtitle}>
              Junte-se a mais de 10.000 estudantes que já exploram a história económica de Angola.
            </Text>
          </Reveal>
          <Reveal delay={200}>
            <Pressable style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}>
              <Text style={styles.ctaButtonText}>Criar conta gratuitamente</Text>
              <Feather name="arrow-right" size={16} color={colors.black} />
            </Pressable>
          </Reveal>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Logo />
          <Text style={styles.footerText}>
            Democratizando o acesso ao conhecimento sobre história económica angolana.
          </Text>
          <Text style={styles.footerCopy}>
            © 2026 Economia com História: Angola · ISPTEC
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Estilos ────────────────────────────────────────────────────────────────────

const HEADER_HEIGHT = 92;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scrollContent: { paddingBottom: 0 },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: HEADER_HEIGHT,
    paddingTop: 48,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCta: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  headerCtaText: { fontSize: 14, color: colors.black, fontWeight: '500' },

  // Logo
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: { color: colors.white, fontWeight: '700', fontSize: 13 },
  logoText: { fontSize: 16, fontWeight: '600', color: colors.black, letterSpacing: -0.3 },

  // Hero
  hero: {
    minHeight: 620,
    paddingTop: HEADER_HEIGHT + 40,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 420 },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: spacing.lg,
    alignSelf: 'center',
  },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
  eyebrowText: { fontSize: 13, color: colors.gray },
  heroTitle: {
    fontSize: font.hero,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 56,
    letterSpacing: -1.5,
    marginBottom: spacing.lg,
  },
  heroTitleAccent: { color: colors.brand },
  heroSubtitle: {
    fontSize: font.body,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  heroButtons: { width: '100%', gap: spacing.sm, alignItems: 'stretch' },
  scrollHint: { marginTop: spacing.xl, alignItems: 'center' },

  // Buttons
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    paddingVertical: 15,
    borderRadius: radius.full,
  },
  primaryBtnText: { color: colors.white, fontSize: 15, fontWeight: '600' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingVertical: 15,
    borderRadius: radius.full,
  },
  secondaryBtnText: { color: colors.black, fontSize: 15, fontWeight: '600' },
  pressed: { opacity: 0.85 },
  pressedLight: { opacity: 0.5 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statCell: {
    width: '50%',
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statValue: { fontSize: 40, fontWeight: '700', color: colors.black, letterSpacing: -1 },
  statLabel: { fontSize: 14, color: colors.gray, marginTop: 2 },

  // Sections
  section: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['3xl'],
  },
  sectionPlain: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: font.h1,
    fontWeight: '700',
    color: colors.black,
    letterSpacing: -1.2,
    lineHeight: 44,
    marginBottom: spacing.xl,
  },
  eyebrowLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.brand,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },

  // Feature cards
  featureStack: { gap: spacing.md },
  featureCard: { borderRadius: radius.lg, padding: spacing.xl },
  featureCardLight: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  featureTitleDark: {
    fontSize: font.h3,
    fontWeight: '700',
    color: colors.black,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
  },
  featureTitleLight: {
    fontSize: font.h3,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
  },
  featureBodyDark: { fontSize: 15, color: colors.gray, lineHeight: 23 },
  featureBodyLight: { fontSize: 15, lineHeight: 23 },

  // Topics
  topicList: { marginTop: spacing.sm },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  topicDot: { width: 8, height: 8, borderRadius: 4 },
  topicInfo: { flex: 1 },
  topicName: { fontSize: 17, fontWeight: '600', color: colors.black },
  topicDesc: { fontSize: 13, color: colors.gray, marginTop: 1 },
  topicCount: { fontSize: 13, color: colors.grayLight },

  // CTA escuro
  cta: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.lg,
    paddingVertical: 80,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: font.h1,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: -1.2,
    lineHeight: 44,
    marginBottom: spacing.md,
  },
  ctaSubtitle: {
    fontSize: font.body,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: spacing.xl,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: 15,
    borderRadius: radius.full,
  },
  ctaButtonText: { color: colors.black, fontSize: 15, fontWeight: '600' },

  // Footer
  footer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['2xl'],
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 20,
    marginTop: spacing.md,
    maxWidth: 240,
  },
  footerCopy: { fontSize: 12, color: colors.grayLight, marginTop: spacing.lg },
});
