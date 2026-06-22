'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { EXPERIENCE, WORK_GROUPS, WORK_PROJECTS } from '@/lib/data'

function parseDotCommon(): React.CSSProperties {
  return { width: 16, height: 16, borderRadius: '50%', border: '3px solid var(--bg,#0b0710)', boxShadow: '0 0 0 1px var(--accent,#ae42a5)', top: 6, zIndex: 2 }
}

function leafImg(lf: { kind: string; url: string }, theme: string) {
  if (lf.kind === 'repo') return { src: `https://cdn.simpleicons.org/github/${theme === 'light' ? '2a2540' : 'e8e8ef'}`, bg: 'var(--panel2)', size: '24px', fit: 'contain' as const }
  if (/electrohouse/i.test(lf.url)) return { src: '/assets/electrohouse.png', bg: '#2b2433', size: '100%', fit: 'cover' as const }
  if (/vannar/i.test(lf.url))       return { src: '/assets/vannar.png',       bg: '#ffffff',  size: '86%', fit: 'contain' as const }
  return null
}

export function WorkClient() {
  const { theme } = useTheme()
  const [vw, setVw] = useState(1280)
  const [activeId, setActiveId] = useState('elopement')
  const [openGroup, setOpenGroup] = useState('IOT')

  useEffect(() => {
    const fn = () => setVw(window.innerWidth); fn()
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])

  const narrow = vw < 760
  const accent = 'var(--accent,#ae42a5)'
  const dimC = theme === 'light' ? '#5f5872' : '#9a93a8'

  // ── Experience tree ──────────────────────────────────────────────
  const spineStyle: React.CSSProperties = narrow
    ? { position: 'absolute', left: 8, top: 6, bottom: 6, width: 2, background: 'linear-gradient(var(--accent,#ae42a5),var(--line,rgba(255,255,255,0.14)))' }
    : { position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 6, bottom: 6, width: 2, background: 'linear-gradient(var(--accent,#ae42a5),var(--line,rgba(255,255,255,0.14)))' }

  // ── Project browser ──────────────────────────────────────────────
  const tabBg   = theme === 'light' ? '#ffffff' : 'rgba(255,255,255,0.14)'
  const onAcc   = theme === 'light' ? '#ffffff' : '#0b0710'

  const groups = WORK_GROUPS.map(g => {
    const open = g.name === openGroup
    return {
      ...g, open, caret: open ? '▾' : '▸',
      tabs: WORK_PROJECTS.filter(p => p.group === g.name).map(p => ({
        id: p.id, label: p.label, fav: p.fav,
        active: activeId === p.id,
      })),
    }
  })

  const p = WORK_PROJECTS.find(x => x.id === activeId) || WORK_PROJECTS[0]
  const isLive       = p.kind === 'live'
  const isShot       = p.kind === 'shot'
  const isWalkthrough = p.kind === 'walkthrough'
  const isBuilding   = p.kind === 'building'
  const isSite       = isLive || isShot

  const rm       = p.roadmap || []
  const doneN    = rm.filter(r => r.status === 'done').length
  const activeN  = rm.filter(r => r.status === 'active').length
  const pct      = rm.length ? Math.round(((doneN + activeN * 0.5) / rm.length) * 100) : 0
  const addr     = isSite ? (p.url || '').replace('https://', '') : (isBuilding ? 'github.com/Maame-Yaa/ServiceOps-Lite' : 'github.com/Maame-Yaa/Autism-Elopement-Tracker')
  const openUrl  = isSite ? p.url : p.repo
  const openLabel = isSite ? 'Open site' : 'View repo'
  const tagBuilding = p.kind === 'building'
  const tagBg    = tagBuilding ? 'rgba(255,176,32,0.16)' : 'var(--panel2,rgba(255,255,255,0.05))'
  const tagFg    = tagBuilding ? '#ffb020' : 'var(--accent,#ae42a5)'

  const vpCols   = narrow ? '1fr' : '1.75fr 0.95fr'
  const vpHeight = narrow ? 'auto' : '480px'
  const deviceCls = narrow ? 'device phone' : 'device laptop'

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Manrope',sans-serif" }}>
      <main style={{ position: 'relative', zIndex: 2, maxWidth: 1140, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>

        {/* HERO */}
        <section style={{ padding: '140px 0 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: accent }}>01 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>WORK</span>
          </div>
          <h1 style={{ margin: '0 0 18px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: 0.96, letterSpacing: '-0.035em', fontSize: 'clamp(2.6rem,7vw,5rem)', color: 'var(--text,#ece8f0)' }}>
            Experience &amp;{' '}
            <span style={{ background: 'linear-gradient(115deg,var(--accent,#ae42a5),var(--accent-strong,#d7a1d2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>projects</span>
          </h1>
          <p style={{ maxWidth: 620, margin: 0, fontSize: 'clamp(1.05rem,2.3vw,1.3rem)', lineHeight: 1.6, color: 'var(--dim,#9a93a8)' }}>
            Where I&apos;ve worked and what I&apos;ve built. Scroll into the browser below to actually use the live projects.
          </p>
        </section>

        {/* ── EXPERIENCE TREE ── */}
        <section style={{ padding: '46px 0 30px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: accent }}>02 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>WHERE I&apos;VE WORKED</span>
          </div>
          <h2 style={{ margin: '0 0 8px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(1.9rem,5vw,3.2rem)', color: 'var(--text,#ece8f0)' }}>Experience</h2>
          <p style={{ maxWidth: 560, margin: '0 0 40px', color: 'var(--dim,#9a93a8)', lineHeight: 1.6 }}>Roles, what I built, and the work tied to each, most recent first.</p>

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
                      <div className="panel-card" style={{ position: 'relative', border: '1px solid var(--line,rgba(255,255,255,0.1))', borderRadius: 16, background: 'var(--panel,rgba(255,255,255,0.02))', padding: '20px 22px', transition: 'all .25s' }}>
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
                            const img = leafImg(lf, theme)
                            return (
                              <a key={li} href={lf.url} target="_blank" rel="noopener noreferrer" title={lf.label} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 86 }}>
                                <span className="leaf-circle" style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--line,rgba(255,255,255,0.14))', background: img ? img.bg : 'var(--panel2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {img ? <img src={img.src} alt={lf.label} loading="lazy" style={{ width: img.size, height: img.size, objectFit: img.fit, display: 'block' }} /> : <span style={{ fontSize: 20, color: 'var(--accent,#ae42a5)' }}>↗</span>}
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
        </section>

        {/* ── PROJECT BROWSER ── */}
        <section style={{ padding: '50px 0 30px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: accent }}>03 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>PROJECTS · LIVE</span>
          </div>
          <h2 style={{ margin: '0 0 8px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(1.9rem,5vw,3.2rem)', color: 'var(--text,#ece8f0)' }}>Open a tab</h2>
          <p style={{ maxWidth: 600, margin: '0 0 26px', color: 'var(--dim,#9a93a8)', lineHeight: 1.6 }}>
            Each tab is a project, grouped by type. The live sites run right here, click around inside the window.
          </p>

          {/* Device */}
          <div className={deviceCls}>
            <div className="device-lid">
              <div className="laptop-cam" />
              <div className="phone-island" />

              {/* Browser frame */}
              <div className="browser-frame" style={{ borderRadius: 9, overflow: 'hidden', border: '1px solid var(--line,rgba(255,255,255,0.12))', background: 'var(--bg2,#0f0a17)' }}>

                {/* Tab bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px 0', background: 'var(--panel2,rgba(255,255,255,0.05))', borderBottom: '1px solid var(--line,rgba(255,255,255,0.08))' }}>
                  <div style={{ display: 'flex', gap: 7, paddingBottom: 11, flexShrink: 0 }}>
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
                    <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
                  </div>
                  <div className="thin-scroll" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, overflowX: 'auto', paddingBottom: 0 }}>
                    {groups.map(g => (
                      <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px 7px', borderRadius: '11px 11px 0 0', background: g.tint }}>
                        <button
                          onClick={() => { const first = WORK_PROJECTS.find(px => px.group === g.name); setOpenGroup(g.name); if (first) setActiveId(first.id) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', padding: '3px 6px', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', color: g.color, cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: g.color }} />{g.name}
                          <span style={{ opacity: 0.7, fontSize: 9 }}>{g.caret}</span>
                        </button>
                        {g.open && g.tabs.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setActiveId(t.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, border: 0, padding: '7px 12px', borderRadius: 9, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 500, background: t.active ? tabBg : 'transparent', color: t.active ? 'var(--text,#ece8f0)' : dimC, boxShadow: t.active ? '0 2px 8px rgba(0,0,0,0.18)' : 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .18s' }}
                          >
                            <img src={t.fav} alt="" loading="lazy" style={{ width: 14, height: 14, borderRadius: 3, objectFit: 'cover', display: 'block' }} />
                            {t.label}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', background: 'var(--bg2,#0f0a17)', borderBottom: '1px solid var(--line,rgba(255,255,255,0.07))' }}>
                  <div style={{ display: 'flex', gap: 5, flexShrink: 0, color: 'var(--dim,#9a93a8)', fontSize: 13 }}>
                    <span>←</span><span style={{ opacity: 0.4 }}>→</span><span style={{ opacity: 0.4 }}>⟳</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 8, background: 'var(--panel,rgba(255,255,255,0.05))', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--dim,#9a93a8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ color: isSite ? '#1f8a5b' : dimC }}>{isSite ? '🔒 ' : '⎇ '}</span>{addr}
                  </div>
                  <a href={openUrl} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 12.5, padding: '6px 13px', borderRadius: 8, background: 'var(--accent,#ae42a5)', color: `var(--on-accent,${onAcc})` }}>
                    {openLabel} ↗
                  </a>
                </div>

                {/* Viewport */}
                <div style={{ display: 'grid', gridTemplateColumns: vpCols, height: vpHeight, background: 'var(--bg,#0b0710)' }}>

                  {/* Screen */}
                  <div style={{ position: 'relative', height: '100%', minHeight: 400, overflow: 'hidden', borderRight: '1px solid var(--line,rgba(255,255,255,0.07))' }}>
                    {isLive && (
                      <iframe src={p.url} title={p.name} loading="lazy" style={{ width: '100%', height: '100%', minHeight: 440, border: 0, display: 'block', background: '#fff' }} />
                    )}
                    {isShot && p.shot && (
                      <div style={{ position: 'relative', height: '100%', minHeight: 400, overflow: 'hidden', background: '#fff' }}>
                        <img src={p.shot} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 9, padding: '9px 13px', background: 'linear-gradient(transparent,rgba(0,0,0,0.7))' }}>
                          <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.92)', color: '#111' }}>SCREENSHOT</span>
                          <span style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11.5, color: 'rgba(255,255,255,0.92)', lineHeight: 1.3 }}>This store blocks embedding, hit Open site to shop it live.</span>
                        </div>
                      </div>
                    )}
                    {isWalkthrough && (
                      <div style={{ position: 'relative', height: '100%', minHeight: 440, overflow: 'hidden', background: '#000' }}>
                        {p.video && <video src={p.video} controls muted playsInline preload="metadata" poster={p.img ?? undefined} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000', display: 'block' }} />}
                      </div>
                    )}
                    {isBuilding && (
                      <div className="thin-scroll" style={{ height: '100%', minHeight: 440, padding: '24px 26px', overflowY: 'auto' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 999, background: 'rgba(255,176,32,0.14)', border: '1px solid rgba(255,176,32,0.4)', marginBottom: 20 }}>
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffb020', animation: 'wkpulse 1.8s infinite' }} />
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#ffb020' }}>IN DEVELOPMENT</span>
                        </div>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--dim,#9a93a8)', marginBottom: 16 }}>SYSTEM</div>
                        <div style={{ position: 'relative', paddingLeft: 24, marginBottom: 30 }}>
                          <div style={{ position: 'absolute', left: 6, top: 7, bottom: 9, width: 2, background: 'linear-gradient(var(--accent,#ae42a5),rgba(174,66,165,0.15))' }} />
                          {(p.layers || []).map((L, li) => (
                            <div key={li} style={{ position: 'relative', marginBottom: 16 }}>
                              <span style={{ position: 'absolute', left: -24, top: 3, width: 13, height: 13, borderRadius: '50%', border: '2px solid var(--accent,#ae42a5)', background: 'var(--bg,#0b0710)', display: 'block' }} />
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap' }}>
                                <span style={{ flexShrink: 0, width: 52, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent,#ae42a5)' }}>{L.tier}</span>
                                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.96rem', color: 'var(--text,#ece8f0)' }}>{L.tech}</span>
                              </div>
                              <div style={{ marginLeft: 63, fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: 'var(--dim,#9a93a8)', marginTop: 2 }}>{L.host}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--dim,#9a93a8)' }}>ROADMAP</span>
                          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: 'var(--accent,#ae42a5)' }}>{doneN} done · {activeN} in progress</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: 'var(--panel2,rgba(255,255,255,0.07))', overflow: 'hidden', marginBottom: 18 }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#1f8a5b,var(--accent,#ae42a5))', borderRadius: 3 }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                          {rm.map((r, ri) => {
                            const done = r.status === 'done'; const act = r.status === 'active'
                            return (
                              <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', border: `2px solid ${done ? '#1f8a5b' : act ? '#ffb020' : 'var(--line,rgba(255,255,255,0.25))'}`, background: done ? '#1f8a5b' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff' }}>{done ? '✓' : ''}</span>
                                <span style={{ flex: 1, minWidth: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: act ? 700 : 500, color: act || done ? 'var(--text,#ece8f0)' : 'var(--dim,#9a93a8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.m}</span>
                                <span style={{ flexShrink: 0, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 999, background: done ? 'rgba(31,138,91,0.16)' : act ? 'rgba(255,176,32,0.16)' : 'var(--panel2,rgba(255,255,255,0.05))', color: done ? '#1f8a5b' : act ? '#ffb020' : dimC }}>
                                  {done ? 'DONE' : act ? 'IN PROGRESS' : 'PLANNED'}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Case study */}
                  <div className="thin-scroll" style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, height: '100%', overflowY: 'auto' }}>
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 9, marginBottom: 8 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: '4px 11px', borderRadius: 999, background: tagBg, color: tagFg, letterSpacing: '0.04em' }}>{p.tag}</span>
                        <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text,#ece8f0)' }}>{p.name}</h3>
                      </div>
                      <p style={{ margin: 0, color: 'var(--dim,#9a93a8)', lineHeight: 1.55, fontSize: '0.96rem' }}>{p.blurb}</p>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent,#ae42a5)', marginBottom: 7 }}>PROBLEM</div>
                      <p style={{ margin: 0, color: 'var(--text,#ece8f0)', lineHeight: 1.6, fontSize: '0.92rem', opacity: 0.9 }}>{p.problem}</p>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent,#ae42a5)', marginBottom: 7 }}>APPROACH</div>
                      <p style={{ margin: 0, color: 'var(--text,#ece8f0)', lineHeight: 1.6, fontSize: '0.92rem', opacity: 0.9 }}>{p.approach}</p>
                    </div>
                    {p.modules && p.modules.length > 0 && (
                      <div>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent,#ae42a5)', marginBottom: 9 }}>MODULES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                          {p.modules.map((m, mi) => (
                            <div key={mi} style={{ border: '1px solid var(--line,rgba(255,255,255,0.1))', borderRadius: 11, background: 'var(--panel,rgba(255,255,255,0.02))', padding: '11px 14px' }}>
                              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--text,#ece8f0)', marginBottom: 2 }}>{m.n}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--dim,#9a93a8)', lineHeight: 1.5 }}>{m.d}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {p.challenges && (
                      <div>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent,#ae42a5)', marginBottom: 7 }}>KEY CHALLENGES</div>
                        <p style={{ margin: 0, color: 'var(--text,#ece8f0)', lineHeight: 1.6, fontSize: '0.92rem', opacity: 0.9 }}>{p.challenges}</p>
                      </div>
                    )}
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent,#ae42a5)', marginBottom: 9 }}>STACK</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {p.stack.map(s => <span key={s} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, padding: '4px 10px', borderRadius: 6, background: 'var(--panel2,rgba(255,255,255,0.05))', color: 'var(--dim,#9a93a8)' }}>{s}</span>)}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="device-base" />
          </div>
          <p style={{ margin: '20px 2px 0', maxWidth: 760, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--dim,#9a93a8)', lineHeight: 1.5 }}>{p.note}</p>
        </section>

        {/* CTA */}
        <section style={{ padding: '40px 0 110px', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: 'var(--accent,#ae42a5)', color: 'var(--on-accent,#0b0710)', boxShadow: '0 14px 40px -14px var(--accent,#ae42a5)' }}>
            Let&apos;s build something →
          </Link>
          <a href="/assets/Maame-Yaa-Twumasi-Resume.pdf" download="Maame Yaa Twumasi Resume.pdf" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 28px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: 'var(--text,#ece8f0)', border: '1px solid var(--line,rgba(255,255,255,0.16))' }}>
            Download Resume
          </a>
        </section>

      </main>
    </div>
  )
}
