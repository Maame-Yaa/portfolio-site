import { ImageResponse } from 'next/og'

export const size        = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32, height: 32,
          background: '#0b0710',
          borderRadius: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.14)',
        }}
      >
        <span style={{ color: '#ae42a5', fontSize: 17, fontWeight: 700, fontFamily: 'monospace' }}>M</span>
      </div>
    ),
    { ...size },
  )
}
