import prisma, { Credit, Payment } from "@smartleadmagnet/database";
import { PlanTier } from "@smartleadmagnet/web/src/lib/types";

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

// get user payment history
export const getPayments = async (userId: string): Promise<Payment[]> => {
  return prisma.payment.findMany({
    where: {
      userId,
    },
  });
};

export const getCredit = async (userId: string): Promise<any> => {
  return prisma.credit.findUnique({
    where: { userId },
  });
};

export const createPayment = async (data: {
  planType: PlanTier;
  credits: number;
  price: number;
  stripeCustomerId: string;
  userId: string;
  stripeSessionId: string;
  subscriptionId?: string; // Optional field for subscription ID
  subscriptionStartDate?: Date; // Optional field for subscription start date
  subscriptionEndDate?: Date; // Optional field for subscription end date
  subscriptionStatus?: string; // Optional field for subscription status
}): Promise<Payment> => {
  return prisma.payment.create({
    data: {
      ...data,
      planType: data.planType as PlanTier, // Ensure the planType matches the enum
      subscriptionId: data.subscriptionId ?? null,
      subscriptionStartDate: data.subscriptionStartDate ?? null,
      subscriptionEndDate: data.subscriptionEndDate ?? null,
      subscriptionStatus: data.subscriptionStatus ?? null,
    },
  });
};

export async function getPaymentBySessionId(sessionId: string) {
  try {
    // Query the Payment table for a record with the given stripeSessionId
    // Return the payment record or null if not found
    return prisma.payment.findUnique({
      where: {
        stripeSessionId: sessionId,
      },
    });
  } catch (error) {
    console.error("Error fetching payment by session ID:", error);
    throw new Error("Could not fetch payment by session ID");
  }
}

export async function getUserPayments(userId: string): Promise<Array<Payment>> {
  return getPayments(userId);
}

export const updateSubscriptionDetailsForCancel = async ({
  stripeCustomerId,
  subscriptionId,
  currentPeriodStart,
  currentPeriodEnd,
}: {
  subscriptionId: string;
  stripeCustomerId: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
}) => {
  await prisma.payment.updateMany({
    where: {
      stripeCustomerId: stripeCustomerId,
      subscriptionId: subscriptionId,
    },
    data: {
      subscriptionStatus: "canceled",
      subscriptionStartDate: new Date(currentPeriodStart * 1000),
      subscriptionEndDate: new Date(currentPeriodEnd * 1000),
      planType: PlanTier.SUBSCRIPTION,
    },
  });
};

export async function incrementCreditUsage(userId: string) {
  return prisma.credit.update({
    where: { userId },
    data: { used: { increment: 1 }, updatedAt: new Date() },
  });
}
