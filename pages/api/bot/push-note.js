import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Note from '@/models/Note'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const key = req.headers['x-bot-key'] || req.headers['x-bot-api-key']
  if (!key || key !== process.env.BOT_API_KEY) return res.status(401).json({ message: 'Unauthorized' })
  const { discordId, title, content } = req.body || {}
  if (!discordId || !content) return res.status(400).json({ message: 'Missing fields' })
  await connectDB()
  const user = await User.findOne({ discordId })
  if (!user) return res.status(404).json({ message: 'User not found' })
  const note = await Note.create({ owner: user._id, title: title||'', content })
  res.json({ ok:true, note })
}
