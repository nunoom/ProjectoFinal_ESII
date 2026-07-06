import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default function LandingScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    { icon: 'book-outline', title: 'Conteúdo Educacional', desc: 'Centenas de artigos sobre economia angolana' },
    { icon: 'bulb-outline', title: 'Quizzes Interativos', desc: 'Teste e reforce seus conhecimentos' },
    { icon: 'trophy-outline', title: 'Ranking & Competição', desc: 'Compete com outros estudantes' },
    { icon: 'chatbubbles-outline', title: 'Fórum de Discussão', desc: 'Participe em debates económicos' },
    { icon: 'ribbon-outline', title: 'Badges & Conquistas', desc: 'Desbloqueie conquistas especiais' },
    { icon: 'phone-portrait-outline', title: 'Acesso Mobile', desc: 'Estude em qualquer lugar' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
      <LinearGradient
        colors={[Colors.primary, Colors.primaryDark, '#450000']}
        style={[styles.hero, { paddingTop: insets.top + 40 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Animated.View
          style={[
            styles.heroContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>E</Text>
            </View>
            <View style={styles.logoGlow} />
          </View>
          <Text style={styles.title}>Economia com{'\n'}História</Text>
          <View style={styles.subtitleContainer}>
            <View style={styles.subtitleLine} />
            <Text style={styles.subtitle}>ANGOLA</Text>
            <View style={styles.subtitleLine} />
          </View>
          <Text style={styles.description}>
            Aprenda sobre a história económica de Angola através de conteúdos interativos e quizzes envolventes
          </Text>

          <View style={styles.buttonGroup}>
            <Button
              title="Começar Agora"
              onPress={() => navigation.navigate('Register')}
              variant="secondary"
              style={styles.primaryBtn}
            />
            <Button
              title="Já tenho conta"
              onPress={() => navigation.navigate('Login')}
              variant="outline"
              style={styles.outlineBtn}
            />
          </View>
        </Animated.View>

        {/* Decorative circles */}
        <View style={[styles.decorCircle, styles.circle1]} />
        <View style={[styles.decorCircle, styles.circle2]} />
        <View style={[styles.decorCircle, styles.circle3]} />
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        {[
          { value: '500+', label: 'Conteúdos', icon: 'book', color: Colors.info },
          { value: '200+', label: 'Quizzes', icon: 'bulb', color: Colors.success },
          { value: '1000+', label: 'Estudantes', icon: 'people', color: Colors.primary },
        ].map((stat, i) => (
          <View key={i} style={styles.statItem}>
            <Ionicons name={stat.icon as any} size={24} color={stat.color} style={styles.statIcon} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Por que escolher a EHA?</Text>
        <Text style={styles.sectionSubtitle}>
          Tudo o que precisa para dominar a economia angolana
        </Text>

        {features.map((feature, i) => (
          <View key={i} style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon as any} size={28} color={Colors.primary} />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray[300]} />
          </View>
        ))}
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={Colors.gradient.primary}
        style={styles.ctaSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.ctaTitle}>Pronto para começar?</Text>
        <Text style={styles.ctaText}>
          Junte-se a milhares de estudantes e aprenda sobre a economia de Angola
        </Text>
        <Button
          title="Criar Conta Grátis"
          onPress={() => navigation.navigate('Register')}
          variant="secondary"
          style={styles.ctaButton}
        />
      </LinearGradient>

      <View style={{ height: insets.bottom + 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  hero: {
    paddingBottom: 50,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 28,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: Colors.white,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  subtitleLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 4,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    width: '100%',
  },
  outlineBtn: {
    width: '100%',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -80,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: -30,
    left: -60,
  },
  circle3: {
    width: 100,
    height: 100,
    top: '40%',
    right: -30,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    marginTop: -24,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
    fontWeight: '500',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: Colors.gray[500],
    textAlign: 'center',
    marginBottom: 28,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  featureIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: Colors.gray[500],
    lineHeight: 18,
  },
  ctaSection: {
    margin: 20,
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  ctaButton: {
    width: '100%',
  },
});
