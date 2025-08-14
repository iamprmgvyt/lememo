import { NextResponse } from 'next/server'
export function middleware(req){
  if(req.nextUrl.pathname.startsWith('/dashboard')){
    const token = req.cookies.get('token')?.value
    if(!token) return NextResponse.redirect(new URL('/signin', req.url))
  }
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard'] }
