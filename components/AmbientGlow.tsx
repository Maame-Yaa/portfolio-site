export function AmbientGlow() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-12%', left: '-8%', width: '46vw', height: '46vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent,#ae42a5) 0%, transparent 70%)',
        opacity: 0.11, filter: 'blur(40px)',
        animation: 'floatA 18s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-18%', right: '-10%', width: '52vw', height: '52vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--accent-strong,#d7a1d2) 0%, transparent 72%)',
        opacity: 0.08, filter: 'blur(55px)',
        animation: 'floatB 22s ease-in-out infinite',
      }} />
    </div>
  )
}
