import jwt from 'jsonwebtoken'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export const getUserFromReq = async (req) => {
  try {
    const token = req.cookies?.token
    if (!token) return null
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    await connectDB()
    return await User.findById(payload.uid)
  } catch { return null }
}

export const setAuthCookie = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30*24*60*60}`)
}

export const clearAuthCookie = (res) => {
  res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
}
