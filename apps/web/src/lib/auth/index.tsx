import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@smartleadmagnet/database";
import { randomInt } from "crypto";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import LoginCodeEmail from "@/emails/login-code";
import WelcomeEmail from "@/emails/welcome-email";
import { sendEmail } from "@/lib/email";
const { convert } = require("html-to-text");

const whitelistedBlogUsers = [
  "durga@dcoder.ai",
  "karanjalendere@gmail.com",
  "durgaprasad.budhwani@gmail.com",
  "joharekhushi@gmail.com",
];

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
    const result = await transport.sendMail({
      to: identifier,
      from: `SmartLeadMagnet <${provider.from}>`,
      subject: `Your SmartLeadMagnet login code is ${token}`,
      text: `${token}\n\nThis code will expire in 5 minutes.\n\n`,
      html: emailHtml,
    });
    // @ts-ignore
    const failed = result.rejected.concat(result?.pending).filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
  } catch (error) {
    console.error("Error", error);
  }
}

const nextAuth = NextAuth({
  debug: false,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Nodemailer({
      id: "email-code",
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      maxAge: verifyEmailMaxAge,
      from: process.env.EMAIL_FROM!,
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
      if (user?.id) session.user.id = user?.id!;
      if (token?.sub) session.user.id = token.sub;
      if (user?.role) session.user.role = user.role;

      if (session?.user) {
        // check for the following email addresses to set the user role to admin
        if (whitelistedBlogUsers.includes(session.user.email)) {
          session.user.role = "admin";
          session.user.enabled = true;
          session.user.verified = true;
        }
      }

      // if (user?.picture) session.user.image = user.picture;

      return session;
    },
  },
  events: {
    async createUser(message) {
      // send a welcome email
      console.log("User created:", message.user?.email!);
      const emailHtml = await render(<WelcomeEmail userName={message.user?.name!} />);
      await sendEmail(message.user?.email!, "Welcome to SmartLeadMagnet", convert(emailHtml), emailHtml);
    },
  },
});

export const { handlers, signIn, signOut } = nextAuth;
export const auth: NextAuthResult["auth"] = nextAuth.auth;
