import prisma, { EmailLog } from "@smartleadmagnet/database";

export async function wasEmailSent(userId, emailType) {
  const emailLog = await prisma.emailLog.findFirst({
    where: {
      userId,
      emailType,
    },
  });
  return !!emailLog;
}

export async function logEmail(userId: string, emailType: string): Promise<EmailLog> {
  return prisma.emailLog.create({
    data: {
      userId: userId,
      emailType,
      sentAt: new Date(),
    },
  });
}
