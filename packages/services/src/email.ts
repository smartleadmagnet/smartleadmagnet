import prisma, { EmailLog } from "@smartleadmagnet/database";

export async function wasEmailSent(userId: string, emailType: string) {
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

export async function getLastEmailSentDate(userId: string): Promise<Date | null> {
  const result = await prisma.emailLog.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      sentAt: 'desc'
    }
  });
  
  return result ? result.sentAt : null;
}
