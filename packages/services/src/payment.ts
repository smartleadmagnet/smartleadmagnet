import prisma, { Credit, Payment } from "@smartleadmagnet/database";

export const upsetCredits = async ({
  userId,
  totalCredit,
}: {
  userId: string;
  totalCredit: number;
}): Promise<Credit> => {
  return prisma.credit.upsert({
    where: { userId: userId },
    update: { total: totalCredit },
    create: { userId: userId, total: totalCredit },
  });
};

export const getCredit = async (userId: string): Promise<Credit> => {
  return prisma.credit.findUnique({
    where: { userId },
  });
};

export const createPayment = async (data: {
  planType: string;
  credits: number;
  price: number;
  stripeCustomerId: string;
  userId: string;
  stripeSessionId: string;
}): Promise<Payment> => {
  return prisma.payment.create({
    data,
  });
};
