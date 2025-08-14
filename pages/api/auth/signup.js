import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { setAuthCookie } from '@/pages/api/_helpers'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { discordId, username, password, passcode } = req.body || {}
  if (!discordId || !username || !password || !passcode) return res.status(400).json({ message: 'Missing fields' })
  // validate discordId: numeric, length 5-25
  if (!/^[0-9]{5,25}$/.test(discordId)) return res.status(400).json({ message: 'Invalid Discord ID' })
  await connectDB()
  const exists = await User.findOne({ discordId })
  if (exists) return res.status(409).json({ message: 'Discord ID already registered' })
  const passwordHash = await bcrypt.hash(password, 10)
  const passcodeHash = await bcrypt.hash(passcode, 10)
  const user = await User.create({ discordId, username, passwordHash, passcodeHash })
  setAuthCookie(res, { uid: user._id.toString() })
  res.json({ ok: true })
}
