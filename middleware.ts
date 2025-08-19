import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const rawPath = request.nextUrl.pathname
  const decodedPath = decodeURIComponent(rawPath)

  if (decodedPath === '/디데이계산기' || decodedPath === '/디데이계산기/') {
    const url = request.nextUrl.clone()
    url.pathname = '/dday'
    return NextResponse.rewrite(url)
  }
  if (decodedPath === '/dday' || decodedPath === '/dday/') {
    const url = request.nextUrl.clone()
    url.pathname = '/디데이계산기'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}


