import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { getValidSubdomain } from '@/utils/subdomain';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);
  if (subdomain) {
    // Subdomain available, rewriting
    url.pathname = `/appointment/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
