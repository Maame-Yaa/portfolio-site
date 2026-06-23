import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const rateMap = new Map<string, { count: number; reset: number }>()
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5

function checkRate(ip: string): boolean {
  const now = Date.now()
  for (const [k, v] of rateMap) { if (v.reset < now) rateMap.delete(k) }
  const entry = rateMap.get(ip)
  if (!entry || entry.reset < now) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_PER_WINDOW) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'
  if (!checkRate(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const { name, email, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Please fill in every field.' }, { status: 400 })
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 })
    }

    const safeName    = escapeHtml(name.trim())
    const safeEmail   = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim())

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
      port:   Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to:      'maameyaamtwumasi@gmail.com',
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `Portfolio message from ${name.trim()}`,
      text:    `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`,
      html:    `<p>${safeMessage.replace(/\n/g, '<br>')}</p><p style="color:#888">— ${safeName} (${safeEmail})</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact route error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
