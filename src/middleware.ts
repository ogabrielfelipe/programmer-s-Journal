import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ["/protect/:path*"] }


export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/protect')) {
    return NextResponse.rewrite(new URL('/protect-2', request.url))
  }
}


/*import { NextRequest, NextResponse } from 'next/server';


export const config = {
  matcher: '/protect/:path*',
};


export async function middleware(req: NextRequest) {
  console.log(_isAuthenticated)
  
  return new NextResponse(
    JSON.stringify({ success: false, message: 'authentication failed' }),
    { status: 401, headers: { 'content-type': 'application/json' } }
  ) 
}


async function _isAuthenticated(req: NextRequest) {
  console.log(req)
}*/