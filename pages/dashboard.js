import { useEffect,useState } from 'react'
import { t } from '@/utils/i18n'
export default function Dashboard(){
  const [lang,setLang]=useState('en')
  const dict=t(lang)
  const [notes,setNotes]=useState([])
  const [passcode,setPasscode]=useState(''); const [unlocked,setUnlocked]=useState(false)
  const [dark,setDark]=useState(false)

  useEffect(()=>{ document.documentElement.classList.toggle('dark-mode', dark) },[dark])

  const checkPass = async ()=>{
    const res = await fetch('/api/notes/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({passcode})})
    if(res.status===200){ const d=await res.json(); setNotes(d.notes||[]); setUnlocked(true) }
    else { const d=await res.json(); alert(d.message||'Wrong passcode') }
  }

  const logout = async ()=>{ await fetch('/api/auth/logout',{method:'POST'}); window.location.href='/signin' }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{dict.appTitle}</h1>
            <select value={lang} onChange={e=>setLang(e.target.value)} className="border px-2 rounded">
              <option value="en">EN</option><option value="vi">VI</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2"><input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)}/> Dark</label>
            <button onClick={logout} className="px-3 py-2 rounded border">{dict.logout}</button>
          </div>
        </div>

        {!unlocked && (
          <div className="panel rounded p-4 mb-4 shadow">
            <p className="mb-2">{dict.enterPasscode}</p>
            <input className="border rounded px-3 py-2 mr-2" value={passcode} onChange={e=>setPasscode(e.target.value)} />
            <button onClick={checkPass} className="px-3 py-2 rounded bg-black text-white">{dict.unlock}</button>
          </div>
        )}

        {unlocked && (
          <div className="panel rounded p-4 mb-4 shadow">
            <h2 className="font-semibold mb-2">{dict.newNote}</h2>
            <div className="grid gap-3">
              {notes.map(n=>(
                <div key={n._id} className="rounded panel p-4 shadow">
                  <h3 className="font-semibold">{n.title||'Untitled'}</h3>
                  <p className="whitespace-pre-wrap">{n.content}</p>
                  <div className="text-xs text-slate-500">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
