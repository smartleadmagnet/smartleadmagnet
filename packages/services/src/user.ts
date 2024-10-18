import prisma, { User } from "@smartleadmagnet/database";

export async function getUsers() {
  return prisma.user.findMany({
    where: {
      createdAt: {
        lte: new Date(),
      },
    },
  });
}

export const getUserById = async (id: string): Promise<User> =>
  prisma.user.findUnique({
    where: { id },
    include: {
      Credit: true,
    },
  });

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
  });

export const getUserByStripeCustomerId = async (stripeCustomerId: string): Promise<User> => {
  return prisma.user.findFirst({
    where: { stripeCustomerId },
  });
};

export const updateStripeCustomerId = async ({ id, stripeCustomerId }: { id: string; stripeCustomerId: string }) => {
  return prisma.user.update({
    where: { id },
    data: { stripeCustomerId: stripeCustomerId! },
  });
};
