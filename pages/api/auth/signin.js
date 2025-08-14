import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { setAuthCookie } from '@/pages/api/_helpers'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { discordId, password } = req.body || {}
  if (!discordId || !password) return res.status(400).json({ message: 'Missing fields' })
  await connectDB()
  const user = await User.findOne({ discordId })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  setAuthCookie(res, { uid: user._id.toString() })
  res.json({ ok: true })
}
