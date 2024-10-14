import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@smartleadmagnet/database";
import { randomInt } from "crypto";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import LoginCodeEmail from "@/emails/login-code";
const verifyEmailMaxAge = 5 * 60; // 5 minutes

const verificationTokenLength = 5;
const newToken = () => {
  let token = "";
  for (let i = 0; i < verificationTokenLength; i++) {
    token += randomInt(10).toString();
  }
  return token;
};

async function sendVerificationRequest(params: any) {
  try {
    const { identifier, provider, token } = params;
    // const { host } = new URL(url);
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(provider.server);
    const emailHtml = await render(<LoginCodeEmail loginCode={token} />);
    console.log(emailHtml);
    const result = await transport.sendMail({
      to: identifier,
      from: `SmartLeadMagnet <${provider.from}>`,
      subject: `Your SmartLeadMagnet login code is ${token}`,
      text: `${token}\n\nThis code will expire in 5 minutes.\n\n`,
      html: emailHtml,
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
  } catch (error) {
    console.error("Error", error);
  }
}

const nextAuth = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Nodemailer({
      id: "email-code",
      server: {
        host: process.env.MAGIC_LINK_EMAIL_SERVER_HOST,
        port: process.env.MAGIC_LINK_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.MAGIC_LINK_EMAIL_SERVER_USER,
          pass: process.env.MAGIC_LINK_EMAIL_SERVER_PASSWORD,
        },
      },
      maxAge: verifyEmailMaxAge,
      from: process.env.MAGIC_LINK_EMAIL_FROM,
      generateVerificationToken: () => {
        return newToken();
      },
      sendVerificationRequest,
    }),
  ],
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
