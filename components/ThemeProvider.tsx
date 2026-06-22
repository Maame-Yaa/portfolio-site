'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

function applyCursors(accent: string) {
  const enc = (s: string) => 'data:image/svg+xml,' + encodeURIComponent(s)
  const ring = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='12' cy='12' r='6' fill='none' stroke='${accent}' stroke-width='1.6'/><circle cx='12' cy='12' r='1.7' fill='${accent}'/></svg>`
  const dot  = `<svg xmlns='http://www.w3.org/2000/svg' width='26' height='26'><circle cx='13' cy='13' r='7' fill='${accent}'/><circle cx='13' cy='13' r='7' fill='none' stroke='#ffffff' stroke-width='1.4' opacity='0.85'/></svg>`
  document.documentElement.style.setProperty('--cur',  `url("${enc(ring)}") 12 12, auto`)
  document.documentElement.style.setProperty('--curp', `url("${enc(dot)}") 13 13, pointer`)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    let stored: Theme = 'dark'
    try {
      const v = localStorage.getItem('myt-theme')
      if (v === 'dark' || v === 'light') stored = v
    } catch {}
    setTheme(stored)
    document.documentElement.setAttribute('data-theme', stored)
    applyCursors('#ae42a5')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('myt-theme', next) } catch {}
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
