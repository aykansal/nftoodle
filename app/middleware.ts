import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/platforms', '/api/auth', '/gamezone']

// Define routes that require special permissions (e.g., admin routes)
const PROTECTED_ROUTES = {
  admin: ['/admin'],
  creator: ['/create'],
  user: ['/my-memes', '/gamezone/cardgame', '/gamezone/matchmeme']
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  // Get auth token from cookie
  const authToken = request.cookies.get('thirdweb_auth_token')
  const userRole = request.cookies.get('user_role')?.value || 'user'

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!authToken) {
    // Store the attempted URL to redirect back after login
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Check role-based access for protected routes
  for (const [role, routes] of Object.entries(PROTECTED_ROUTES)) {
    if (routes.some(route => pathname.startsWith(route))) {
      if (role !== userRole && role !== 'user') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )

  return response
}

// Configure which routes should be processed by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes (except /api/auth)
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. /favicon.ico (favicon file)
     */
    '/((?!api/(?!auth)|_next/static|_next/image|favicon.ico).*)',
  ],
}