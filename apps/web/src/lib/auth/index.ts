import NextAuth, { NextAuthResult } from 'next-auth';
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@smartleadmagnet/database";

// @ts-ignore
const nextAuth  = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 2 * 24 * 60 * 60, // 48 hours
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-ignore
    async session({ session, token, user }: any) {
      if (user?.id) session.user.id = user.id;
      if (token?.sub) session.user.id = token.sub;
      if (user?.role) session.user.role = user.role;

      // // add stripe payment information to the session
      // const userData = await getUserByEmail(session.user.email);
      // if (userData) {
      // 	session.user.stripeCustomerId = userData.stripeCustomerId;
      // 	session.user.stripePaymentDate = userData.stripePaymentDate;
      // }

      // if (user?.picture) session.user.image = user.picture;

      return session;
    },
  },
});

export const { handlers, signIn, signOut } = nextAuth;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
