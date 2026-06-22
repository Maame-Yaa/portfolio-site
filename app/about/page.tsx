import type { Metadata } from 'next'
import Link from 'next/link'
import { JOURNEY } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About',
  description: 'A full-stack developer who has loved building for the web since childhood, and stayed for the engineering.',
  openGraph: {
    title: 'About | Maame Yaa Twumasi',
    description: 'A full-stack developer who has loved building for the web since childhood, and stayed for the engineering.',
  },
}

const VALUE_CARDS = [
  {
    tag: 'THE CRAFT',
    heading: 'I stayed for the engineering',
    body: 'I love the processes: separating structure from logic, keeping an API distinct from the business rules underneath it. At a startup with no existing codebase, my team and I built an entire backend from scratch, and that is still some of my favorite work.',
  },
  {
    tag: 'WHY I BUILD',
    heading: 'Watching ideas become real',
    body: 'I look at an app and wonder what if-statements made which features, and how the whole thing was put together. Turning a thought into something people can actually use is really exciting. This portfolio is one of those ideas, brought to life.',
  },
  {
    tag: 'I LIKE TO HELP',
    heading: 'Helping businesses grow',
    body: 'At Camara I use my tech skills, plus design and marketing, to help small businesses grow their online presence.',
  },
  {
    tag: 'A GOOD CHALLENGE',
    heading: 'Learning on the job',
    body: 'In a lot of my roles the stack was new to me on day one. I learned from documentation, from peers, and on the job, and grew comfortable working across the full stack.',
  },
]

export default function AboutPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Manrope',sans-serif" }}>
      <main style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>

        {/* HERO */}
        <section style={{ padding: '150px 0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: 'var(--accent,#ae42a5)' }}>01 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>ABOUT</span>
          </div>
          <h1 style={{ margin: '0 0 22px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: 0.98, letterSpacing: '-0.035em', fontSize: 'clamp(2.6rem,7vw,5rem)', color: 'var(--text,#ece8f0)' }}>
            Hi, I&apos;m{' '}
            <span style={{ background: 'linear-gradient(115deg,var(--accent,#ae42a5),var(--accent-strong,#d7a1d2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Maame Yaa.
            </span>
          </h1>
          <p style={{ maxWidth: 620, margin: 0, fontSize: 'clamp(1.1rem,2.4vw,1.45rem)', lineHeight: 1.6, color: 'var(--dim,#9a93a8)', fontWeight: 400 }}>
            A full-stack developer who has loved building for the web since childhood, and stayed for the engineering.
          </p>
        </section>

        {/* STORY */}
        <section style={{ padding: '50px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--accent,#ae42a5)' }}>HOW IT STARTED</span>
          <p style={{ margin: 0, maxWidth: 720, fontSize: '1.12rem', lineHeight: 1.72, color: 'var(--text,#ece8f0)' }}>
            I found out what code was in grade 5. On an old computer, I found an HTML tutorial and learned the basics in Notepad, convinced you could build a whole website in it; I figured out what an IDE was years later. Coding is very logical, but it has always felt a little magical to me, and that mix is exactly what keeps me here.
          </p>
        </section>

        {/* VALUE CARDS */}
        <section style={{ padding: '30px 0 50px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18 }}>
            {VALUE_CARDS.map(card => (
              <div key={card.tag} className="panel-card" style={{ border: '1px solid var(--line,rgba(255,255,255,0.1))', borderRadius: 18, background: 'var(--panel,rgba(255,255,255,0.02))', padding: '26px 24px' }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent,#ae42a5)', marginBottom: 12 }}>{card.tag}</div>
                <h3 style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.3rem', color: 'var(--text,#ece8f0)' }}>{card.heading}</h3>
                <p style={{ margin: 0, color: 'var(--dim,#9a93a8)', lineHeight: 1.66, fontSize: '0.98rem' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section style={{ padding: '40px 0' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>THE PATH SO FAR</span>
          <h2 style={{ margin: '10px 0 26px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(1.8rem,4.5vw,2.8rem)', color: 'var(--text,#ece8f0)' }}>How I&apos;ve grown</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
            {JOURNEY.map((label, i) => (
              <span key={label} style={{ display: 'contents' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, padding: '9px 15px', borderRadius: 10, background: 'var(--panel2,rgba(255,255,255,0.05))', border: '1px solid var(--line,rgba(255,255,255,0.1))', color: 'var(--text,#ece8f0)' }}>{label}</span>
                {i < JOURNEY.length - 1 && (
                  <span style={{ color: 'var(--accent,#ae42a5)', fontSize: 14 }}>→</span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '50px 0 110px', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <Link href="/work" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: 'var(--accent,#ae42a5)', color: 'var(--on-accent,#0b0710)', boxShadow: '0 14px 40px -14px var(--accent,#ae42a5)' }}>
            See my work →
          </Link>
          <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.16))' }}>
            Get in touch
          </Link>
        </section>

      </main>
    </div>
  )
}
