'use client'
import { useState, useEffect, useRef } from 'react'
import { CONTACTS } from '@/lib/data'

export function ContactClient() {
  const [sent,    setSent]    = useState(false)
  const [err,     setErr]     = useState('')
  const [loading, setLoading] = useState(false)
  const [vw,      setVw]      = useState(1280)
  const nameRef  = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const msgRef   = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const fn = () => setVw(window.innerWidth); fn()
    window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn)
  }, [])

  const cols = vw < 760 ? '1fr' : '0.9fr 1.1fr'

  async function send() {
    const name  = nameRef.current?.value.trim()  || ''
    const email = emailRef.current?.value.trim() || ''
    const msg   = msgRef.current?.value.trim()   || ''
    if (!name || !email || !msg)            { setErr('Please fill in every field.');         return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr("That email doesn't look right."); return }
    setErr(''); setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error || 'Something went wrong. Please try again.'); return }
      setSent(true)
    } catch {
      setErr('Could not send. Please email directly at maameyaamtwumasi@gmail.com.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    if (nameRef.current)  nameRef.current.value  = ''
    if (emailRef.current) emailRef.current.value = ''
    if (msgRef.current)   msgRef.current.value   = ''
    setSent(false); setErr('')
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', fontFamily: "'Manrope',sans-serif" }}>
      <main style={{ position: 'relative', zIndex: 2, maxWidth: 1040, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        <section style={{ padding: '130px 0 90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: 'var(--accent,#ae42a5)' }}>01 /</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.25em', color: 'var(--dim,#9a93a8)' }}>CONTACT</span>
          </div>
          <h1 style={{ margin: '0 0 40px', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, lineHeight: 0.96, letterSpacing: '-0.035em', fontSize: 'clamp(2.6rem,7vw,5rem)', color: 'var(--text,#ece8f0)' }}>
            Let&apos;s build{' '}
            <span style={{ background: 'linear-gradient(115deg,var(--accent,#ae42a5),var(--accent-strong,#d7a1d2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>something.</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 34, alignItems: 'start' }}>

            {/* LEFT: direct links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ margin: '0 0 6px', color: 'var(--dim,#9a93a8)', lineHeight: 1.65, fontSize: '1.02rem' }}>Drop a message, or reach me directly.</p>
              <div style={{ marginTop: 6, borderTop: '1px solid var(--line,rgba(255,255,255,0.1))' }}>
                {CONTACTS.map(c => (
                  <a key={c.label} href={c.url} target={c.target} className="contact-row" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 16, padding: '18px 2px', borderBottom: '1px solid var(--line,rgba(255,255,255,0.1))' }}>
                    <span style={{ flexShrink: 0, width: 74, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--accent,#ae42a5)' }}>{c.label}</span>
                    <span style={{ flex: 1, minWidth: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 'clamp(1.02rem,2.2vw,1.22rem)', color: 'var(--text,#ece8f0)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.value}</span>
                    <span style={{ flexShrink: 0, fontSize: 15, color: 'var(--dim,#9a93a8)' }}>{c.arrow}</span>
                  </a>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 2px 0', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--dim,#9a93a8)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1f8a5b', flexShrink: 0 }} />
                Based in Virginia, USA
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="panel-card" style={{ position: 'relative', border: '1px solid var(--line,rgba(255,255,255,0.1))', borderRadius: 20, background: 'var(--panel,rgba(255,255,255,0.02))', padding: 'clamp(24px,4vw,34px)' }}>
              {!sent ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.1em', color: 'var(--dim,#9a93a8)' }}>NAME</span>
                    <input ref={nameRef} type="text" placeholder="Your name" style={{ fontFamily: "'Manrope',sans-serif", fontSize: 15, padding: '13px 15px', borderRadius: 11, border: '1px solid var(--line,rgba(255,255,255,0.14))', background: 'var(--bg2,rgba(0,0,0,0.2))', color: 'var(--text,#ece8f0)', outline: 'none', transition: 'border-color .2s', width: '100%', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent,#ae42a5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line,rgba(255,255,255,0.14))'}
                    />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.1em', color: 'var(--dim,#9a93a8)' }}>EMAIL</span>
                    <input ref={emailRef} type="email" placeholder="you@example.com" style={{ fontFamily: "'Manrope',sans-serif", fontSize: 15, padding: '13px 15px', borderRadius: 11, border: '1px solid var(--line,rgba(255,255,255,0.14))', background: 'var(--bg2,rgba(0,0,0,0.2))', color: 'var(--text,#ece8f0)', outline: 'none', transition: 'border-color .2s', width: '100%', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent,#ae42a5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line,rgba(255,255,255,0.14))'}
                    />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.1em', color: 'var(--dim,#9a93a8)' }}>MESSAGE</span>
                    <textarea ref={msgRef} rows={4} placeholder="What are you building?" style={{ fontFamily: "'Manrope',sans-serif", fontSize: 15, padding: '13px 15px', borderRadius: 11, border: '1px solid var(--line,rgba(255,255,255,0.14))', background: 'var(--bg2,rgba(0,0,0,0.2))', color: 'var(--text,#ece8f0)', outline: 'none', resize: 'vertical', transition: 'border-color .2s', width: '100%', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent,#ae42a5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line,rgba(255,255,255,0.14))'}
                    />
                  </label>
                  {err && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#ff7a7a' }}>{err}</span>}
                  <button onClick={send} disabled={loading} className="btn-primary" style={{ marginTop: 4, border: 0, padding: '15px 20px', borderRadius: 12, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, background: 'var(--accent,#ae42a5)', color: 'var(--on-accent,#0b0710)', boxShadow: '0 14px 40px -16px var(--accent,#ae42a5)', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sending…' : 'Send message →'}
                  </button>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: 'var(--dim,#9a93a8)', lineHeight: 1.5, opacity: 0.8 }}>I&apos;ll get back to you as soon as possible.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '30px 10px', animation: 'popIn .4s ease both' }}>
                  <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(31,138,91,0.16)', border: '1px solid #1f8a5b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#1f8a5b' }}>✓</span>
                  <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '1.5rem', color: 'var(--text,#ece8f0)' }}>Thanks for reaching out</h3>
                  <p style={{ margin: 0, color: 'var(--dim,#9a93a8)', lineHeight: 1.6, maxWidth: 320 }}>Message sent! I&apos;ll get back to you soon. You can also email me directly at maameyaamtwumasi@gmail.com.</p>
                  <button onClick={reset} className="btn-outline" style={{ border: '1px solid var(--line,rgba(255,255,255,0.16))', background: 'transparent', padding: '11px 20px', borderRadius: 11, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text,#ece8f0)', cursor: 'pointer' }}>
                    Send another
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}
