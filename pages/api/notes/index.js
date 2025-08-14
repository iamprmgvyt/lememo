import { getUserFromReq } from '@/pages/api/_helpers'
import { connectDB } from '@/lib/db'
import Note from '@/models/Note'

export default async function handler(req, res) {
  const user = await getUserFromReq(req)
  if (!user) return res.status(401).json({ message: 'Unauthorized' })
  await connectDB()

  if (req.method === 'GET') {
    // default: do not return notes until passcode verified
    return res.status(403).json({ message: 'Passcode required' })
  }

  if (req.method === 'POST') {
    // for bot use only: create note
    const { title, content } = req.body || {}
    const note = await Note.create({ owner: user._id, title, content })
    return res.json({ note })
  }

  res.status(405).end()
}
