import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|dashboard/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get("host") || "foo.barbearia.io";

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  // const path = url.pathname;

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.barbearia.io`, "")
          .replace(`.barbearia-io.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");
  if (
    !["barbearia.io", "localhost:3000", "vercel.app"].some(
      (host) => host.includes(currentHost)
    )
  ) {
    console.log("path rewrite: ", url.href);
    // Subdomain available, rewriting
    url.pathname = `/appointment/${currentHost}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
