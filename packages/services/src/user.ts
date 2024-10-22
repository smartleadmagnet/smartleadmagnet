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

export const getUserById = async (id: string): Promise<any> =>
  prisma.user.findUnique({
    where: { id },
    include: {
      Credit: true,
      Payments: true,
    },
  });

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
  });

// @ts-ignore
export const getUserByStripeCustomerId = async (stripeCustomerId: string): Promise<User> => {
  // @ts-ignore
  return prisma.user.findFirst({
    where: { stripeCustomerId: stripeCustomerId! },
  });
};

export const updateStripeCustomerId = async ({ id, stripeCustomerId }: { id: string; stripeCustomerId: string }) => {
  return prisma.user.update({
    where: { id },
    data: { stripeCustomerId: stripeCustomerId! },
  });
};

export const updateUser = async ({ id, bio, name }: { id: string; bio: string; name: string }) => {
  return prisma.user.update({
    where: { id },
    data: { bio, name },
  });
};

export const updateUserKey = async ({ id, key }: { id: string; key: string }) => {
  return prisma.user.update({
    where: { id },
    data: { key },
  });
};
