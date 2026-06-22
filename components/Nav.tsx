'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

const LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Work',    href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const pathname  = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [narrow,   setNarrow]   = useState(false)

  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 880)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18,
        padding: '18px clamp(20px,5vw,56px)',
        backdropFilter: 'blur(14px)',
        background: 'var(--nav-bg,rgba(11,7,16,0.5))',
        borderBottom: '1px solid var(--line,rgba(255,255,255,0.06))',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text,#ece8f0)' }}>
          <span style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0,
            border: '1px solid var(--line,rgba(255,255,255,0.12))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 13,
            color: 'var(--accent,#ae42a5)',
          }}>M</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, letterSpacing: '-0.01em', fontSize: 15 }}>
            Maame Yaa <span style={{ color: 'var(--accent,#ae42a5)' }}>Twumasi</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Desktop nav links */}
          {!narrow && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 6 }}>
              {LINKS.map(n => {
                const active = pathname === n.href
                return (
                  <Link key={n.href} href={n.href} style={{
                    textDecoration: 'none', fontSize: 14, fontWeight: 500,
                    padding: '8px 13px', borderRadius: 9, transition: 'color .2s,background .2s',
                    color: active ? 'var(--text,#ece8f0)' : 'var(--dim,#9a93a8)',
                    background: active ? 'var(--panel,rgba(255,255,255,0.05))' : 'transparent',
                  }}>{n.label}</Link>
                )
              })}
            </div>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle day / night"
            style={{
              width: 40, height: 40, borderRadius: 11,
              border: '1px solid var(--line,rgba(255,255,255,0.1))',
              background: 'var(--panel,rgba(255,255,255,0.03))',
              color: 'var(--text,#ece8f0)', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
            }}>
            {theme === 'light' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
              </svg>
            ) : '☾'}
          </button>

          {/* Hamburger */}
          {narrow && (
            <button
              onClick={() => setMenuOpen(true)}
              title="Menu"
              style={{
                width: 40, height: 40, borderRadius: 11,
                border: '1px solid var(--line,rgba(255,255,255,0.1))',
                background: 'var(--panel,rgba(255,255,255,0.03))',
                color: 'var(--text,#ece8f0)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
              <span style={{ width: 16, height: 2, background: 'currentColor', borderRadius: 2 }} />
              <span style={{ width: 16, height: 2, background: 'currentColor', borderRadius: 2 }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'var(--bg,#0b0710)', backdropFilter: 'blur(8px)',
          display: 'flex', flexDirection: 'column',
          padding: '90px clamp(24px,7vw,48px) 40px', gap: 6,
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', top: 20, right: 24, width: 40, height: 40,
              borderRadius: 11, border: '1px solid var(--line)', background: 'var(--panel)',
              color: 'var(--text)', fontSize: 20,
            }}>×</button>
          {LINKS.map(n => (
            <Link
              key={n.href} href={n.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none', color: 'var(--text,#ece8f0)',
                fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 600,
                padding: '12px 0', borderBottom: '1px solid var(--line,rgba(255,255,255,0.06))',
              }}>{n.label}</Link>
          ))}
        </div>
      )}
    </>
  )
}
