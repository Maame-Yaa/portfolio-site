import type { Metadata } from 'next'
import { WorkClient } from './WorkClient'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Experience and projects — live sites, IoT systems, and full-stack applications by Maame Yaa Twumasi.',
  openGraph: {
    title: 'Work | Maame Yaa Twumasi',
    description: 'Experience and projects — live sites, IoT systems, and full-stack applications.',
  },
}

export default function WorkPage() {
  return <WorkClient />
}
