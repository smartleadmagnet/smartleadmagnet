import prisma from "@smartleadmagnet/database";

export async function getUsers() {
  return prisma.user.findMany({
    where: {
      createdAt: {
        lte: new Date(),
      },
    },
  });
}
