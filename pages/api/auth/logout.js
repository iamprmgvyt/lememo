import { clearAuthCookie } from '@/pages/api/_helpers'
export default async function handler(req,res){ if(req.method!=='POST') return res.status(405).end(); clearAuthCookie(res); res.json({ok:true}) }
