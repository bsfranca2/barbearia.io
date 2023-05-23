// import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "~/lib/auth";

/*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const hostname = req.headers.host ?? "foo.barbearia.io";
  const currentHost =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname
          .replace(`.barbearia.io`, "")
          .replace(`.barbearia-io.vercel.app`, "")
      : hostname.replace(`.localhost:3000`, "");
  if (
    !["barbearia.io", "localhost:3000", "vercel.app"].some((host) =>
      host.includes(currentHost)
    )
  ) {
    console.log("has subdomain for", req.url, currentHost);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return NextAuth(req, res, authOptions);
}
*/

export default NextAuth(authOptions);
