import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Nav }           from '@/components/Nav'
import { FluidCanvas }   from '@/components/FluidCanvas'
import { AmbientGlow }   from '@/components/AmbientGlow'

export const metadata: Metadata = {
  title: {
    default: 'Maame Yaa Twumasi — Full Stack Software Engineer',
    template: '%s | Maame Yaa Twumasi',
  },
  description: 'Portfolio of Maame Yaa Twumasi — full-stack software engineer, AWS Certified Cloud Practitioner, based in Virginia.',
  openGraph: {
    type: 'website',
    siteName: 'Maame Yaa Twumasi',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeProvider>
          <AmbientGlow />
          <FluidCanvas />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
