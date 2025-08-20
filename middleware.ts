import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const rawPath = request.nextUrl.pathname
  const decodedPath = decodeURIComponent(rawPath)

  // Korean URLs are canonical (what users see), ASCII pages exist for stability.
  if (decodedPath === '/디데이계산기' || decodedPath === '/디데이계산기/') {
    const url = request.nextUrl.clone()
    url.pathname = '/dday'
    return NextResponse.rewrite(url)
  }
  if (decodedPath === '/일수계산기' || decodedPath === '/일수계산기/') {
    const url = request.nextUrl.clone()
    url.pathname = '/days-diff'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}


