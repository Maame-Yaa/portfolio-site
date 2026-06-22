'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

const SMOKE = { r: 174, g: 66, b: 165 }

type Particle = {
  x: number; y: number; vx: number; vy: number
  life: number; decay: number; size: number; max: number
}

export function FluidCanvas() {
  const cvRef    = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef<string>('dark')
  const { theme } = useTheme()

  useEffect(() => { themeRef.current = theme }, [theme])

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')!
    let W = 0, H = 0, dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth; H = cv.clientHeight
      cv.width  = Math.max(1, W * dpr)
      cv.height = Math.max(1, H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const parts: Particle[] = []
    const MAX = 170
    const ptr = { x: W / 2, y: H / 2, px: W / 2, py: H / 2 }

    const spawn = (x: number, y: number, vx: number, vy: number, n: number, big?: boolean) => {
      for (let i = 0; i < n; i++) {
        if (parts.length > MAX) parts.shift()
        const a = Math.random() * 6.2832, sp = Math.random() * 0.6
        parts.push({
          x: x + (Math.random() - 0.5) * 14, y: y + (Math.random() - 0.5) * 14,
          vx: vx * 0.16 + Math.cos(a) * sp, vy: vy * 0.16 + Math.sin(a) * sp,
          life: 1, decay: 0.012 + Math.random() * 0.012,
          size: (big ? 70 : 48) + Math.random() * 46,
          max:  (big ? 180 : 130) + Math.random() * 60,
        })
      }
    }

    const onMove = (e: MouseEvent | TouchEvent) => {
      const t = 'touches' in e ? e.touches[0] : e
      ptr.px = ptr.x; ptr.py = ptr.y
      ptr.x = t.clientX; ptr.y = t.clientY
      const vx = ptr.x - ptr.px, vy = ptr.y - ptr.py
      spawn(ptr.x, ptr.y, vx, vy, 1 + Math.floor(Math.min(Math.hypot(vx, vy), 60) / 13))
    }

    const onResize = () => resize()
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('touchmove',  onMove as EventListener, { passive: true })
    window.addEventListener('resize',     onResize)

    let raf: number
    const loop = () => {
      if (Math.random() < 0.18)
        spawn(W * (0.3 + 0.4 * Math.random()), H * (0.3 + 0.4 * Math.random()),
              (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 1, true)

      const th = themeRef.current
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = th === 'dark' ? 'rgba(11,7,16,0.085)' : 'rgba(241,237,247,0.075)'
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = th === 'dark' ? 'lighter' : 'multiply'
      const baseA = th === 'dark' ? 0.022 : 0.05

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97; p.vy -= 0.018
        p.life -= p.decay; p.size = Math.min(p.max, p.size * 1.02)
        if (p.life <= 0) { parts.splice(i, 1); continue }
        const a = Math.max(0, p.life) * baseA
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        g.addColorStop(0,   `rgba(${SMOKE.r},${SMOKE.g},${SMOKE.b},${a * 0.7})`)
        g.addColorStop(0.4, `rgba(${SMOKE.r},${SMOKE.g},${SMOKE.b},${a * 0.35})`)
        g.addColorStop(1,   `rgba(${SMOKE.r},${SMOKE.g},${SMOKE.b},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.2832); ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove as EventListener)
      window.removeEventListener('resize',    onResize)
    }
  }, [])

  return (
    <canvas
      ref={cvRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
