'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Design tokens ────────────────────────────────────────────────────────────
const BLACK  = '#1d1d1f';
const GRAY   = '#6e6e73';
const SURFACE = '#f5f5f7';
const BRAND  = '#8B0000';
const EASE   = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 44);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ color: BLACK }}>

      {/* ── NAVBAR ── */}
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b bg-white/80 backdrop-blur-2xl'
            : 'bg-transparent',
        )}
        style={{ borderColor: scrolled ? 'rgba(29,29,31,0.1)' : 'transparent' }}
      >
        <div
          className="mx-auto flex h-14 max-w-[980px] items-center justify-between px-5"
        >
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: BRAND }}
            >
              <span className="text-[13px] font-bold text-white">E</span>
            </div>
            <span className="text-[15px] font-semibold tracking-tight" style={{ color: BLACK }}>
              EHA
            </span>
          </Link>

          {/* Centre links */}
          <div className="hidden items-center gap-8 text-[13px] md:flex" style={{ color: GRAY }}>
            <Link href="/login" className="transition-colors hover:text-black">Conteúdos</Link>
            <Link href="/login" className="transition-colors hover:text-black">Quizzes</Link>
            <Link href="/login" className="transition-colors hover:text-black">Ranking</Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[13px]">
            <Link
              href="/login"
              className="rounded-full px-4 py-1.5 transition-colors hover:bg-black/5"
              style={{ color: BLACK }}
            >
              Entrar
            </Link>
            <Link href="/register">
              <span
                className="rounded-full px-4 py-1.5 text-[13px] font-medium text-white transition-colors"
                style={{ background: BRAND }}
              >
                Começar
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-14">
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,0,0,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-[760px] text-center">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px]"
            style={{ borderColor: 'rgba(29,29,31,0.15)', color: GRAY }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: BRAND }}
            />
            Plataforma Educacional · ISPTEC
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="mb-6 text-[52px] font-bold leading-[1.06] tracking-tight md:text-[76px]"
            style={{ color: BLACK }}
          >
            A história que{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, #C0392B 100%)`,
              }}
            >
              moldou
            </span>
            {' '}uma nação.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASE }}
            className="mb-9 text-[19px] leading-relaxed"
            style={{ color: GRAY }}
          >
            Explore a economia angolana através de conteúdos interativos,
            <br className="hidden md:block" />
            quizzes e debate em comunidade.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.26, ease: EASE }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/register">
              <span
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: BRAND }}
              >
                Criar conta
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/login">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-medium transition-colors hover:bg-black/4"
                style={{ borderColor: 'rgba(29,29,31,0.18)', color: BLACK }}
              >
                Já tenho conta
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown
            className="h-5 w-5 animate-bounce"
            style={{ color: GRAY }}
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid rgba(29,29,31,0.1)` }}>
        <div className="mx-auto max-w-[980px] px-5">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderRight: `1px solid rgba(29,29,31,0.1)` }}
          >
            {[
              { value: '500+', label: 'Conteúdos' },
              { value: '200+', label: 'Quizzes' },
              { value: '10K+', label: 'Estudantes' },
              { value: '95%',  label: 'Satisfação' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <div
                  className="py-12 text-center"
                  style={{ borderLeft: `1px solid rgba(29,29,31,0.1)` }}
                >
                  <div
                    className="text-[42px] font-bold tracking-tight"
                    style={{ color: BLACK }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[14px]" style={{ color: GRAY }}>
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section
        className="py-28"
        style={{ background: SURFACE, borderTop: `1px solid rgba(29,29,31,0.1)` }}
      >
        <div className="mx-auto max-w-[980px] px-5">
          <Reveal className="mb-16">
            <h2
              className="text-[44px] font-bold leading-tight tracking-tight"
              style={{ color: BLACK }}
            >
              Tudo o que precisa.
              <br />
              Numa só plataforma.
            </h2>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3">
            {/* Wide card: Conteúdos */}
            <Reveal className="md:col-span-2" delay={0.08}>
              <div className="h-full rounded-3xl bg-white p-10">
                <div
                  className="mb-7 inline-flex rounded-2xl p-4"
                  style={{ background: '#DBEAFE' }}
                >
                  <BookOpen className="h-7 w-7 text-blue-600" />
                </div>
                <h3
                  className="mb-3 text-[26px] font-bold tracking-tight"
                  style={{ color: BLACK }}
                >
                  Conteúdos ricos e acessíveis.
                </h3>
                <p className="text-[16px] leading-relaxed" style={{ color: GRAY }}>
                  Artigos aprofundados sobre petróleo, kwanza, guerra civil, agricultura e reformas
                  económicas. Escritos por especialistas, pensados para estudantes.
                </p>
              </div>
            </Reveal>

            {/* Tall card: Quizzes (bordeaux) */}
            <Reveal delay={0.16}>
              <div
                className="h-full rounded-3xl p-8 text-white"
                style={{ background: BRAND }}
              >
                <div className="mb-7 inline-flex rounded-2xl bg-white/20 p-4">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-[22px] font-bold tracking-tight">
                  Quizzes que desafiam.
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                  Múltiplos níveis de dificuldade. Feedback imediato com explicações detalhadas.
                </p>
              </div>
            </Reveal>

            {/* Tall card: Ranking (dark) */}
            <Reveal delay={0.12}>
              <div
                className="h-full rounded-3xl p-8 text-white"
                style={{ background: BLACK }}
              >
                <div className="mb-7 inline-flex rounded-2xl bg-white/10 p-4">
                  <Trophy className="h-7 w-7 text-yellow-400" />
                </div>
                <h3 className="mb-3 text-[22px] font-bold tracking-tight">
                  Compete. Lidera.
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Ranking global e semanal. Pontos, níveis e conquistas desbloqueáveis.
                </p>
              </div>
            </Reveal>

            {/* Wide card: Fórum */}
            <Reveal className="md:col-span-2" delay={0.2}>
              <div className="h-full rounded-3xl bg-white p-10">
                <div
                  className="mb-7 inline-flex rounded-2xl p-4"
                  style={{ background: '#D1FAE5' }}
                >
                  <Users className="h-7 w-7 text-emerald-600" />
                </div>
                <h3
                  className="mb-3 text-[26px] font-bold tracking-tight"
                  style={{ color: BLACK }}
                >
                  Uma comunidade que aprende junta.
                </h3>
                <p className="text-[16px] leading-relaxed" style={{ color: GRAY }}>
                  Fórum de discussão organizado por tópicos. Partilhe perspetivas, faça perguntas
                  e construa conhecimento de forma colaborativa.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TOPICS LIST ── */}
      <section
        className="py-28"
        style={{ borderTop: `1px solid rgba(29,29,31,0.1)` }}
      >
        <div className="mx-auto max-w-[980px] px-5">
          <Reveal className="mb-16">
            <p
              className="mb-3 text-[12px] font-semibold uppercase tracking-widest"
              style={{ color: BRAND }}
            >
              Tópicos
            </p>
            <h2
              className="text-[40px] font-bold tracking-tight"
              style={{ color: BLACK }}
            >
              Seis décadas de história.
              <br />
              Seis áreas temáticas.
            </h2>
          </Reveal>

          <div>
            {[
              { name: 'Petróleo',     count: '45 artigos', desc: 'Da descoberta à dependência económica',      dot: BRAND },
              { name: 'Kwanza',       count: '32 artigos', desc: 'Reformas monetárias e inflação',             dot: '#B8860B' },
              { name: 'Guerra Civil', count: '28 artigos', desc: 'Impacto económico do conflito armado',       dot: '#4B5563' },
              { name: 'Agricultura',  count: '38 artigos', desc: 'Do café colonial à soberania alimentar',     dot: '#065F46' },
              { name: 'Reformas',     count: '25 artigos', desc: 'Transição económica pós-independência',      dot: '#1E40AF' },
              { name: 'Comércio',     count: '30 artigos', desc: 'Parceiros internacionais e exportações',     dot: '#C2410C' },
            ].map((topic, i) => (
              <Reveal key={topic.name} delay={i * 0.04}>
                <Link href="/login">
                  <div
                    className="group flex items-center gap-5 py-5 transition-all duration-200 hover:pl-3"
                    style={{ borderTop: `1px solid rgba(29,29,31,0.1)` }}
                  >
                    <span
                      className="h-2 w-2 flex-shrink-0 rounded-full"
                      style={{ background: topic.dot }}
                    />
                    <div className="flex flex-1 items-baseline gap-4">
                      <span
                        className="text-[18px] font-semibold"
                        style={{ color: BLACK }}
                      >
                        {topic.name}
                      </span>
                      <span className="hidden text-[14px] md:block" style={{ color: GRAY }}>
                        {topic.desc}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px]" style={{ color: GRAY }}>
                        {topic.count}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                        style={{ color: BRAND }}
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid rgba(29,29,31,0.1)` }} />
          </div>
        </div>
      </section>

      {/* ── CTA – DARK ── */}
      <section
        className="overflow-hidden py-36"
        style={{ background: BLACK }}
      >
        <div className="mx-auto max-w-[680px] px-5 text-center">
          <Reveal>
            <h2
              className="mb-6 text-[46px] font-bold leading-[1.08] tracking-tight text-white md:text-[58px]"
            >
              Pronto para começar
              <br />a aprender?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mb-10 text-[18px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Junte-se a mais de 10.000 estudantes que já exploram
              <br className="hidden md:block" />
              a história económica de Angola.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Link href="/register">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold transition-opacity hover:opacity-90" style={{ color: BLACK }}>
                Criar conta gratuitamente
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-16"
        style={{
          background: SURFACE,
          borderTop: `1px solid rgba(29,29,31,0.1)`,
        }}
      >
        <div className="mx-auto max-w-[980px] px-5">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: BRAND }}
                >
                  <span className="text-[13px] font-bold text-white">E</span>
                </div>
                <span className="text-[15px] font-semibold" style={{ color: BLACK }}>
                  EHA
                </span>
              </div>
              <p
                className="max-w-[220px] text-[13px] leading-relaxed"
                style={{ color: GRAY }}
              >
                Democratizando o acesso ao conhecimento sobre história económica angolana.
              </p>
            </div>

            {/* Link columns */}
            {[
              {
                title: 'Plataforma',
                links: [
                  { label: 'Conteúdos', href: '/contents' },
                  { label: 'Quizzes',   href: '/quizzes'  },
                  { label: 'Ranking',   href: '/ranking'  },
                  { label: 'Fórum',     href: '/forum'    },
                ],
              },
              {
                title: 'Conta',
                links: [
                  { label: 'Entrar',    href: '/login'    },
                  { label: 'Registar',  href: '/register' },
                  { label: 'Perfil',    href: '/profile'  },
                ],
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacidade', href: '/privacy' },
                  { label: 'Termos',      href: '/terms'   },
                  { label: 'Contacto',    href: '/contact' },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="mb-4 text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: BLACK }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>
                        <span
                          className="text-[13px] transition-colors hover:text-black"
                          style={{ color: GRAY }}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-14 pt-8"
            style={{ borderTop: `1px solid rgba(29,29,31,0.1)` }}
          >
            <p className="text-[12px]" style={{ color: GRAY }}>
              © 2026 Economia com História: Angola. Desenvolvido na ISPTEC.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
