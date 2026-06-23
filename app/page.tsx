'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import {
  ACCENT, SOCIALS, STATS, SKILLS, SKILL_ABBR, SKILL_SLUGS, SKILL_LOCAL, SKILL_MONO,
  HOME_PROJECTS, EXPERIENCE, TYPEWRITER_PHRASES,
} from '@/lib/data'

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('')
  const iRef = useRef(0); const cRef = useRef(0); const delRef = useRef(false)
  const ttRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const tick = () => {
      const full = phrases[iRef.current % phrases.length]
      if (delRef.current) cRef.current--; else cRef.current++
      setText(full.slice(0, cRef.current))
      let delay = delRef.current ? 38 : 80
      if (!delRef.current && cRef.current === full.length) { delRef.current = true; delay = 1500 }
      else if (delRef.current && cRef.current === 0) { delRef.current = false; iRef.current++; delay = 380 }
      ttRef.current = setTimeout(tick, delay)
    }
    ttRef.current = setTimeout(tick, 400)
    return () => { if (ttRef.current) clearTimeout(ttRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return text
}

// ─── Terminal ─────────────────────────────────────────────────────────────────
type TermLine = { text: string; color: string }
const INIT_LINES: TermLine[] = [
  { text: 'Maame Yaa Twumasi · interactive shell ✦', color: 'var(--text,#ece8f0)' },
  { text: "type 'help' to get started.",              color: 'var(--dim,#9a93a8)' },
]
function runCmd(raw: string, setLines: (fn: (p: TermLine[]) => TermLine[]) => void) {
  const cmd = raw.trim().toLowerCase()
  const add: TermLine[] = [{ text: '➜ ~ ' + raw, color: 'var(--accent,#ae42a5)' }]
  const o = (t: string, c?: string) => add.push({ text: t, color: c || 'var(--dim,#9a93a8)' })
  if      (cmd === 'clear')      { setLines(() => []); return }
  else if (cmd === '')           {}
  else if (cmd === 'help')       { o('commands:', 'var(--text,#ece8f0)'); o('  whoami · skills · projects · experience'); o('  socials · resume · contact · clear') }
  else if (cmd === 'whoami')     { o('Maame Yaa Twumasi', 'var(--text,#ece8f0)'); o('Full Stack Software Engineer, currently backend leaning.'); o('Based in Virginia · AWS Certified Cloud Practitioner.') }
  else if (cmd === 'skills')     { o('Frontend · Backend · Cloud & DevOps · Tools'); o('JS · TS · React · Next · Vue · FastAPI · Node · Postgres · Docker · AWS …') }
  else if (cmd === 'projects')   { o('Elopement Tracker: real-time geofencing safety system'); o('ServiceOps Lite: service-business intake tool (coming soon)'); o('scroll down to see the cards.') }
  else if (cmd === 'experience') { o('Full-stack roles across backend services, admin'); o('dashboards, and SaaS platforms, frontend to data layer.') }
  else if (cmd === 'socials')    { o('github    github.com/Maame-Yaa'); o('linkedin  linkedin.com/in/mytwumasi'); o('email     maameyaamtwumasi@gmail.com') }
  else if (cmd === 'resume')     { o('→ use the "Download Resume" button.') }
  else if (cmd === 'contact')    { o('maameyaamtwumasi@gmail.com', 'var(--text,#ece8f0)') }
  else                           { o(`zsh: command not found: ${cmd}, try 'help'`, '#ff7a7a') }
  setLines(prev => [...prev, ...add])
}

// ─── Skills helpers ───────────────────────────────────────────────────────────
const CATS = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'Tools']
function skillLogo(name: string, theme: string) {
  const local = SKILL_LOCAL[name]
  if (local) return { url: local.url(theme), tile: !!local.tile, size: local.size || '18px' }
  const slug = SKILL_SLUGS[name]
  if (!slug) return null
  const lc = theme === 'light' ? '2a2540' : 'e8e8ef'
  return { url: SKILL_MONO.includes(slug) ? `https://cdn.simpleicons.org/${slug}/${lc}` : `https://cdn.simpleicons.org/${slug}`, tile: false, size: '18px' }
}

// ─── Experience tree ──────────────────────────────────────────────────────────
function ExpTree({ narrow, theme }: { narrow: boolean; theme: string }) {
  const spineStyle: React.CSSProperties = narrow
    ? { position: 'absolute', left: 8, top: 6, bottom: 6, width: 2, background: 'linear-gradient(var(--accent,#ae42a5),var(--line,rgba(255,255,255,0.14)))' }
    : { position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6, bottom: 6, width: 2, background: 'linear-gradient(var(--accent,#ae42a5),var(--line,rgba(255,255,255,0.14)))' }
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      <div style={spineStyle} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        {EXPERIENCE.map((e, i) => {
          const left    = i % 2 === 0
          const dotBg   = e.cur ? 'var(--accent,#ae42a5)' : 'var(--bg,#0b0710)'
          const justify = narrow ? 'flex-end' : (left ? 'flex-start' : 'flex-end')
          const colW    = narrow ? 'calc(100% - 40px)' : 'calc(50% - 30px)'
          const dotStyle: React.CSSProperties = narrow
            ? { position: 'absolute', left: 9, transform: 'translateX(-50%)', background: dotBg, ...parseDotCommon() }
            : { position: 'absolute', left: '50%', transform: 'translateX(-50%)', background: dotBg, ...parseDotCommon() }
          const connStyle: React.CSSProperties = narrow
            ? { position: 'absolute', left: -31, top: 16, width: 31, height: 2, background: 'var(--line,rgba(255,255,255,0.2))' }
            : left
              ? { position: 'absolute', right: -30, top: 16, width: 30, height: 2, background: 'var(--line,rgba(255,255,255,0.2))' }
              : { position: 'absolute', left: -30, top: 16, width: 30, height: 2, background: 'var(--line,rgba(255,255,255,0.2))' }
          return (
            <div key={i} style={{ position: 'relative', display: 'flex', justifyContent: justify as 'flex-start' | 'flex-end' }}>
              <span style={dotStyle} />
              <div style={{ width: colW }}>
                <div style={{ position: 'relative', border: '1px solid var(--line,rgba(255,255,255,0.1))', borderRadius: 16, background: 'var(--panel,rgba(255,255,255,0.02))', padding: '20px 22px', transition: 'all .25s' }}>
                  <span style={connStyle} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 12px', marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.24rem', letterSpacing: '-0.01em', color: 'var(--text,#ece8f0)' }}>{e.role}</h3>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, padding: '3px 9px', borderRadius: 999, background: 'var(--panel2,rgba(255,255,255,0.05))', color: 'var(--accent,#ae42a5)' }}>{e.tag}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.96rem', color: 'var(--accent-strong,#d7a1d2)', marginBottom: 12 }}>
                    {e.company} <span style={{ color: 'var(--dim,#9a93a8)', fontWeight: 400 }}>· {e.loc}</span>
                  </div>
                  <p style={{ margin: '0 0 14px', color: 'var(--dim,#9a93a8)', lineHeight: 1.6, fontSize: '0.93rem' }}>{e.blurb}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {e.chips.map(c => <span key={c} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, padding: '4px 9px', borderRadius: 6, background: 'var(--panel2,rgba(255,255,255,0.05))', color: 'var(--dim,#9a93a8)' }}>{c}</span>)}
                  </div>
                </div>
                {e.leaves.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
                    {e.leaves.map((lf, li) => {
                      let img = '', circleBg = 'var(--panel2)', imgSize = '24px', fit: 'cover'|'contain' = 'contain'
                      if (lf.kind === 'repo') img = `https://cdn.simpleicons.org/github/${theme === 'light' ? '2a2540' : 'e8e8ef'}`
                      else if (/electrohouse/i.test(lf.url)) { img = '/assets/electrohouse.png'; circleBg = '#2b2433'; imgSize = '100%'; fit = 'cover' }
                      else if (/vannar/i.test(lf.url))       { img = '/assets/vannar.png';       circleBg = '#ffffff';  imgSize = '86%' }
                      return (
                        <a key={li} href={lf.url} target="_blank" rel="noopener noreferrer" title={lf.label} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 86 }}>
                          <span style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--line,rgba(255,255,255,0.14))', background: circleBg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                            {img ? <img src={img} alt={lf.label} loading="lazy" style={{ width: imgSize, height: imgSize, objectFit: fit, display: 'block' }} /> : <span style={{ fontSize: 20, color: 'var(--accent,#ae42a5)' }}>↗</span>}
                          </span>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: 'var(--dim,#9a93a8)', textAlign: 'center', lineHeight: 1.35, wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{lf.label}</span>
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function parseDotCommon(): React.CSSProperties {
  return { width: 16, height: 16, borderRadius: '50%', border: '3px solid var(--bg,#0b0710)', boxShadow: '0 0 0 1px var(--accent,#ae42a5)', top: 6, zIndex: 2 }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { theme } = useTheme()
  const tw = useTypewriter(TYPEWRITER_PHRASES)

  // Skills tab
  const [skillTab, setSkillTab] = useState('All')

  // Terminal
  const [termLines, setTermLines] = useState<TermLine[]>(INIT_LINES)
  const [termUsed,  setTermUsed]  = useState(false)
  const termBodyRef = useRef<HTMLDivElement>(null)
  const histRef = useRef<string[]>([]); const hiRef = useRef<number | null>(null)
  useEffect(() => { if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight }, [termLines])
  const onTermKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = e.currentTarget.value; e.currentTarget.value = ''
      if (v.trim()) { histRef.current.push(v); setTermUsed(v.trim().toLowerCase() !== 'clear') }; hiRef.current = histRef.current.length
      runCmd(v, setTermLines)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); const h = histRef.current
      if (!h.length) return; hiRef.current = Math.max(0, (hiRef.current ?? h.length) - 1); e.currentTarget.value = h[hiRef.current] || ''
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); const h = histRef.current
      hiRef.current = Math.min(h.length, (hiRef.current ?? h.length) + 1); e.currentTarget.value = h[hiRef.current] || ''
    }
  }, [])

  // Viewport
  const [vw, setVw] = useState(1280)
  useEffect(() => {
    const check = () => setVw(window.innerWidth); check()
    window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])
  const narrow = vw < 820

  const accent = ACCENT
  const dimC   = theme === 'light' ? '#5f5872' : '#9a93a8'
  const lineC  = theme === 'light' ? 'rgba(27,21,38,0.12)' : 'rgba(255,255,255,0.09)'
  const onAcc  = theme === 'light' ? '#ffffff' : '#0b0710'

  const countFor = (cat: string) => cat === 'All' ? SKILLS.length : SKILLS.filter(s => s[1] === cat).length
  const filtered  = skillTab === 'All' ? SKILLS : SKILLS.filter(s => s[1] === skillTab)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Manrope',sans-serif", transition: 'background .55s ease,color .55s ease' }}>

      <main id="top" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', alignItems: 'center', gap: 48, padding: '130px clamp(20px,5vw,56px) 70px' }}>

          {/* Left: copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.2em', color: accent }}>
              <span style={{ opacity: 0.5 }}>01</span>
              <span style={{ width: 34, height: 1, background: 'var(--line,rgba(255,255,255,0.2))' }} />
              HOME
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: 'var(--dim,#9a93a8)' }}>$ whoami</div>
            <h1 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.035em', fontSize: 'clamp(2.8rem,8vw,6.5rem)' }}>
              <span style={{ display: 'block', color: 'var(--text,#ece8f0)' }}>Maame Yaa</span>
              <span style={{ display: 'block', background: `linear-gradient(115deg,${accent},var(--accent-strong,#d7a1d2))`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Twumasi</span>
            </h1>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 'clamp(1.05rem,2.4vw,1.6rem)', fontWeight: 500 }}>
              <span style={{ color: 'var(--text,#ece8f0)' }}>{tw}</span>
              <span style={{ display: 'inline-block', width: 3, height: '1.05em', background: accent, marginLeft: 3, transform: 'translateY(3px)', animation: 'blink 1s steps(1) infinite' }} />
            </div>
            <p style={{ maxWidth: 520, margin: 0, fontSize: 'clamp(1rem,2vw,1.1rem)', lineHeight: 1.65, color: 'var(--dim,#9a93a8)' }}>
              I design databases, ship APIs, and build typed frontends. Full-stack, currently backend leaning. Building ServiceOps now; based in Virginia and AWS Certified.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 11, marginTop: 4 }}>
              <a href="#projects" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: accent, color: onAcc, boxShadow: `0 14px 40px -14px ${accent}`, transition: 'transform .2s' }}>View Projects →</a>
              <a href="/assets/Maame-Yaa-Twumasi-Resume.pdf" download="Maame Yaa Twumasi Resume.pdf" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.14))', transition: 'border-color .2s' }}>Download Resume</a>
              <a href="#contact" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.14))', transition: 'border-color .2s' }}>Get in Touch</a>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 2 }}>
              {SOCIALS.map(s => (
                <a key={s.k} href={s.u} target="_blank" rel="noopener noreferrer" title={s.l} style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--line,rgba(255,255,255,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: 'var(--dim,#9a93a8)', textDecoration: 'none', transition: 'all .2s' }}>{s.k}</a>
              ))}
            </div>
          </div>

          {/* Right: terminal */}
          <div
            onClick={() => { const i = termBodyRef.current?.querySelector('input') as HTMLInputElement | null; i?.focus() }}
            style={{ position: 'relative', height: 'min(58vh,440px)', minHeight: 320, border: '1px solid var(--line,rgba(255,255,255,0.14))', borderRadius: 14, background: 'var(--term-bg,rgba(0,0,0,0.3))', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono',monospace", boxShadow: `0 30px 80px -42px ${accent}`, cursor: 'text' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', borderBottom: '1px solid var(--line,rgba(255,255,255,0.1))', flexShrink: 0 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 8, fontSize: 11, letterSpacing: '0.05em', color: 'var(--dim,#9a93a8)' }}>maameyaa@portfolio · zsh</span>
            </div>
            <div ref={termBodyRef} className="thin-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontSize: 12.5, lineHeight: 1.75 }}>
              {termLines.map((ln, i) => (
                <div key={i} style={{ whiteSpace: 'pre-wrap', marginBottom: 2, color: ln.color }}>{ln.text}</div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ color: accent, animation: 'blink 1.1s steps(1) infinite' }}>➜</span>
                <span style={{ color: '#28c840' }}>~</span>
                <input onKeyDown={onTermKey} placeholder={termUsed ? 'type a command' : "type 'help'"} autoComplete="off" spellCheck={false} style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text,#ece8f0)', fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, caretColor: accent }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: '10px clamp(20px,5vw,56px) 70px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 'clamp(20px,5vw,64px)', borderTop: '1px solid var(--line,rgba(255,255,255,0.07))', borderBottom: '1px solid var(--line,rgba(255,255,255,0.07))', padding: '34px 0' }}>
            {STATS.map(st => (
              <div key={st.num}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: 'clamp(2rem,4.5vw,3.1rem)', lineHeight: 1, color: 'var(--text,#ece8f0)' }}>{st.num}</div>
                <div style={{ marginTop: 9, fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--dim,#9a93a8)' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ padding: '50px clamp(20px,5vw,56px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: accent }}>02 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>TECHNICAL EXPERTISE</span>
          </div>
          <h2 style={{ margin: '0 0 14px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(2.1rem,5.5vw,3.6rem)', color: 'var(--text,#ece8f0)' }}>Skills &amp; Technologies</h2>
          <p style={{ maxWidth: 560, margin: '0 0 30px', color: 'var(--dim,#9a93a8)', lineHeight: 1.6 }}>The toolkit I reach for across the stack, from interface to data layer.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, justifyContent: 'flex-start', marginBottom: 30, maxWidth: 760 }}>
            {CATS.map(cat => {
              const active = skillTab === cat
              return (
                <button key={cat} onClick={() => setSkillTab(cat)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 999, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, transition: 'all .2s', background: active ? accent : 'transparent', color: active ? onAcc : dimC, border: `1px solid ${active ? 'transparent' : lineC}` }}>
                  {cat}<span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, opacity: 0.7 }}>{countFor(cat)}</span>
                </button>
              )
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 12, width: '100%', maxWidth: 880 }}>
            {filtered.map(([name]) => {
              const li = skillLogo(name, theme)
              const abbr = SKILL_ABBR[name] || name.slice(0, 2)
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 15px', borderRadius: 13, background: 'transparent', border: '1px solid var(--line,rgba(255,255,255,0.09))', transition: 'all .2s' }}>
                  <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: li?.tile ? '50%' : 9, background: li?.tile ? '#ffffff' : 'var(--panel2,rgba(255,255,255,0.06))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {li
                      ? <img src={li.url} alt={name} loading="lazy" style={{ width: li.size, height: li.size, objectFit: 'contain', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; const fb = (e.target as HTMLImageElement).parentElement?.querySelector('[data-fb]') as HTMLElement | null; if (fb) fb.style.display = 'flex' }} />
                      : null
                    }
                    <span data-fb style={{ display: li ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: accent }}>{abbr}</span>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text,#ece8f0)', lineHeight: 1.2 }}>{name}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: '70px clamp(20px,5vw,56px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: accent }}>04 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>SELECTED WORK</span>
          </div>
          <h2 style={{ margin: '0 0 10px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(2.1rem,5.5vw,3.6rem)', color: 'var(--text,#ece8f0)' }}>Featured Projects</h2>
          <p style={{ maxWidth: 560, margin: '0 0 36px', color: 'var(--dim,#9a93a8)', lineHeight: 1.6 }}>A couple of things I&apos;ve built. The full set, with live demos and case studies, lives on the Work page.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 20, width: '100%', maxWidth: 1100 }}>
            {HOME_PROJECTS.map(p => {
              const tagBg = p.soon ? (theme === 'light' ? 'rgba(109,74,255,0.12)' : 'rgba(157,123,255,0.16)') : 'var(--panel2)'
              const tagFg = p.soon ? accent : dimC
              return (
                <div key={p.name} style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, border: '1px solid var(--line,rgba(255,255,255,0.1))', background: 'var(--panel,rgba(255,255,255,0.02))', overflow: 'hidden', transition: 'all .25s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', borderBottom: '1px solid var(--line,rgba(255,255,255,0.08))' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--line,rgba(255,255,255,0.25))' }} /><span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--line,rgba(255,255,255,0.25))' }} /><span style={{ width: 9, height: 9, borderRadius: '50%', background: accent }} />
                    <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--dim,#9a93a8)' }}>{p.name}</span>
                  </div>
                  <div style={{ height: 150, overflow: 'hidden', background: 'repeating-linear-gradient(135deg,var(--panel2,rgba(255,255,255,0.05)) 0 11px,transparent 11px 22px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.img
                      ? <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                      : <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: 'var(--dim,#9a93a8)', textAlign: 'center', padding: 16 }}>▦ {p.shot}</span>}
                  </div>
                  <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--text,#ece8f0)' }}>{p.name}</h3>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, padding: '3px 9px', borderRadius: 999, background: tagBg, color: tagFg }}>{p.tag}</span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--dim,#9a93a8)', lineHeight: 1.55, fontSize: '0.92rem' }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.tech.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, padding: '4px 9px', borderRadius: 6, background: 'var(--panel2,rgba(255,255,255,0.05))', color: 'var(--dim,#9a93a8)' }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 'auto', paddingTop: 6 }}>
                      {p.links.map(lk => <a key={lk.l} href={lk.u} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, color: accent }}>{lk.l} ↗</a>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <Link href="/work" style={{ marginTop: 34, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 26px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.16))', transition: 'all .2s' }}>See all work &amp; case studies →</Link>
        </section>

        {/* ── CONTACT CTA ── */}
        <section id="contact" style={{ padding: '80px clamp(20px,5vw,56px) 60px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '100%', maxWidth: 880, borderRadius: 26, border: '1px solid var(--line,rgba(255,255,255,0.1))', background: 'var(--panel,rgba(255,255,255,0.02))', padding: 'clamp(30px,6vw,60px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '50%', height: '140%', background: `radial-gradient(circle,${accent} 0%,transparent 65%)`, opacity: 0.16, filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: accent, marginBottom: 16, position: 'relative' }}>05 / GET IN TOUCH</div>
            <h2 style={{ margin: '0 0 28px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(2.1rem,6vw,3.8rem)', color: 'var(--text,#ece8f0)', position: 'relative' }}>Let&apos;s build something.</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 13, justifyContent: 'flex-start', position: 'relative' }}>
              <Link href="/contact" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 999, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: accent, color: onAcc, boxShadow: `0 14px 40px -12px ${accent}`, transition: 'transform .2s' }}>Email me →</Link>
              <a href="/assets/Maame-Yaa-Twumasi-Resume.pdf" download="Maame Yaa Twumasi Resume.pdf" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 999, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.16))', transition: 'border-color .2s' }}>Download Resume</a>
            </div>
          </div>

          <footer style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', boxSizing: 'border-box', marginTop: 54, borderTop: '1px solid var(--line,rgba(255,255,255,0.07))' }}>
            <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center', padding: '24px clamp(20px,5vw,56px) 4px' }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--dim,#9a93a8)' }}>© 2026 Maame Yaa Twumasi</span>
              <div style={{ display: 'flex', gap: 16 }}>
                {SOCIALS.map(s => <a key={s.k} href={s.u} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--dim,#9a93a8)' }}>{s.l}</a>)}
              </div>
              <a href="#top" style={{ textDecoration: 'none', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--dim,#9a93a8)' }}>back to top ↑</a>
            </div>
          </footer>
        </section>

      </main>
    </div>
  )
}
