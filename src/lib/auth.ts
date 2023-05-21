import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { env } from "~/env.mjs";
import { db } from "~/lib/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      barbershopId: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    barbershopId: number;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ token, session }) => {
      if (token) {
        session.user.barbershopId = token.barbershopId as number;
      }

      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.barbershopId = user.barbershopId;
        token.image = user.image;
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials-app",
      credentials: {
        username: { label: "Email/Celular", type: "text", placeholder: "" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await db
          .selectFrom("BarbershopUser")
          .innerJoin("User", "User.id", "BarbershopUser.userId")
          .selectAll("User")
          .select("BarbershopUser.barbershopId as barbershopId")
          .where("BarbershopUser.entityType", "=", "EMPLOYEE")
          .where(({ or, cmpr }) =>
            or([
              cmpr("User.email", "=", credentials.username),
              cmpr("User.phone", "=", credentials.username),
            ])
          )
          .executeTakeFirst();

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          barbershopId: user.barbershopId,
          name: user.name,
          email: user.email,
          image: "",
        };
      },
    }),
    // CredentialsProvider({
    //   id: "credentials-appointments",
    //   credentials: {
    //     barbershop: { label: "Barbearia", type: "text" },
    //     username: { label: "Email/Celular", type: "text", placeholder: "" },
    //     password: { label: "Senha", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials) {
    //       return null;
    //     }

    //     const user = await db
    //       .selectFrom("User")
    //       .selectAll("User")
    //       .where("User.barbershopId", "=", Number(credentials.barbershop))
    //       .where("User.entityType", "=", "CUSTOMER")
    //       .where(({ or, cmpr }) =>
    //         or([
    //           cmpr("User.email", "=", credentials.username),
    //           cmpr("User.phone", "=", credentials.username),
    //         ])
    //       )
    //       .executeTakeFirst();

    //     if (!user) {
    //       return null;
    //     }

    //     return {
    //       id: user.id.toString(),
    //       name: user.name,
    //       email: user.email,
    //       image: "",
    //     };
    //   },
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
