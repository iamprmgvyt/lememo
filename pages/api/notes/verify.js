import { getUserFromReq } from '@/pages/api/_helpers'
import { connectDB } from '@/lib/db'
import Note from '@/models/Note'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { passcode } = req.body || {}
  if (!passcode) return res.status(400).json({ message: 'Missing passcode' })
  const user = await getUserFromReq(req)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })
  const ok = await bcrypt.compare(passcode, user.passcodeHash || '')
  if (!ok) return res.status(403).json({ message: 'Invalid passcode' })
  await connectDB()
  const notes = await Note.find({ owner: user._id }).sort({ createdAt: -1 })
  res.json({ notes })
}
