import Link from 'next/link'
export default function Home(){ return (
  <main className="min-h-screen grid place-items-center p-6 bg-slate-50">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">LeMemo</h1>
      <p className="text-slate-600">Notes for your Discord account.</p>
      <div className="flex gap-3 justify-center">
        <Link className="px-4 py-2 rounded bg-black text-white" href="/signin">Sign In</Link>
        <Link className="px-4 py-2 rounded border" href="/signup">Sign Up</Link>
      </div>
    </div>
  </main>
)}