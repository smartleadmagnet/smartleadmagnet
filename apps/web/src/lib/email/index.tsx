import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAGIC_LINK_EMAIL_SERVER_HOST,
  port: process.env.MAGIC_LINK_EMAIL_SERVER_PORT,
  auth: {
    user: process.env.MAGIC_LINK_EMAIL_SERVER_USER,
    pass: process.env.MAGIC_LINK_EMAIL_SERVER_PASSWORD,
  },
});

export const sendEmail = async (email: string, subject: string, text: string, html: string) => {
  return transporter.sendMail({
    from: `SmartLeadMagnet <${process.env.MAGIC_LINK_EMAIL_FROM}>`,
    to: email,
    subject,
    text,
    html,
  });
};
