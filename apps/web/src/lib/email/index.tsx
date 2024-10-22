import { createTransport } from "nodemailer";

export const sendEmail = async (email: string, subject: string, text: string, html: string) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST!,
    port: Number(process.env.EMAIL_SERVER_PORT!),
    auth: {
      user: process.env.EMAIL_SERVER_USER!,
      pass: process.env.EMAIL_SERVER_PASSWORD!,
    },
  });

  return transporter.sendMail({
    from: `SmartLeadMagnet <${process.env.EMAIL_FROM!}>`,
    to: email,
    subject,
    text,
    html,
  });
};

export const sendEmailToUnRegisterUser = async (email: string, subject: string, text: string, html: string) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST_TO_UNREGISTER_USER!,
    port: Number(process.env.EMAIL_SERVER_PORT_TO_UNREGISTER_USER!),
    auth: {
      user: process.env.EMAIL_SERVER_USER_TO_UNREGISTER_USER!,
      pass: process.env.EMAIL_SERVER_PASSWORD_TO_UNREGISTER_USER!,
    },
  });

  return transporter.sendMail({
    from: `SmartLeadMagnet <${process.env.EMAIL_FROM_TO_UNREGISTER_USER!}>`,
    to: email,
    subject,
    text,
    html,
  });
};
