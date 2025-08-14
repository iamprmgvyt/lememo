import { useState } from 'react'
import { t } from '@/utils/i18n'
export default function AuthForm({ mode='signin' }){
  const [lang,setLang]=useState('en')
  const dict=t(lang)
  const [discordId,setDiscordId]=useState('')
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [passcode,setPasscode]=useState('')
  const [err,setErr]=useState(''); const [loading,setLoading]=useState(false)
  const validateId = (id) => { return /^[0-9]{5,25}$/.test(id) }
  const onSubmit=async e=>{
    e.preventDefault(); setLoading(true); setErr('')
    try{
      if(mode==='signup' && !validateId(discordId)){ throw new Error('Invalid Discord ID') }
      const body={discordId,password}
      if(mode==='signup'){ body.username=username; body.passcode=passcode }
      const res=await fetch('/api/auth/'+mode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      const data=await res.json()
      if(!res.ok) throw new Error(data.message||'Error')
      window.location.href='/dashboard'
    }catch(err){ setErr(err.message) } finally{ setLoading(false) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md rounded-2xl panel p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{dict.appTitle}</h1>
          <select value={lang} onChange={e=>setLang(e.target.value)} className="border px-2 rounded">
            <option value="en">EN</option><option value="vi">VI</option>
          </select>
        </div>
        <p className="text-sm text-slate-600">{mode==='signup'?dict.createAccount:dict.signIn}</p>
        <form onSubmit={onSubmit} className="space-y-3 mt-3">
          <div><label className="block text-sm">{dict.discordId}</label>
            <input required className="w-full border rounded px-3 py-2" value={discordId} onChange={e=>setDiscordId(e.target.value)}/></div>
          {mode==='signup' && <div><label className="block text-sm">{dict.username}</label>
            <input required className="w-full border rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)}/></div>}
          <div><label className="block text-sm">{dict.password}</label>
            <input required type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)}/></div>
          {mode==='signup' && <div><label className="block text-sm">{dict.passcode}</label>
            <input required className="w-full border rounded px-3 py-2" value={passcode} onChange={e=>setPasscode(e.target.value)}/></div>}
          <button disabled={loading} className="w-full rounded-2xl bg-black text-white py-2">{mode==='signup'?dict.signUp:dict.signIn}</button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      </div>
    </div>
  )
}
