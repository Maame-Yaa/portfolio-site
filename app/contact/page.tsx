import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Maame Yaa Twumasi — drop a message, or reach out directly via email, GitHub, or LinkedIn.',
  openGraph: {
    title: 'Contact | Maame Yaa Twumasi',
    description: 'Get in touch — drop a message or reach out directly.',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
