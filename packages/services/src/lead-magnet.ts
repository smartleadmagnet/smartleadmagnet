import prisma, { LeadMagnet } from "@smartleadmagnet/database";

export const createLeadMagnet = async (data: LeadMagnet) => {
  return prisma.leadMagnet.create({
    data,
  });
};

export const getLeadMagnetById = async (id: string): Promise<LeadMagnet> => {
  return prisma.leadMagnet.findUnique({
    where: { id },
  });
};

export const updateLeadMagnet = async (id: string, userId: string, data: Partial<LeadMagnet>) => {
  return prisma.leadMagnet.update({
    where: { id, userId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteLeadMagnet = async (id: string) => {
  return prisma.leadMagnet.delete({
    where: { id },
  });
};

export const getLeadMagnetsByUser = async (userId: string) => {
  return prisma.leadMagnet.findMany({
    where: { userId },
  });
};

export async function updateLeadMagnetUsage(id: string) {
  return prisma.leadMagnet.update({
    where: { id },
    data: {
      usedCount: { increment: 1 }, // Increment the usage count by 1
      lastUsedAt: new Date(), // Update the last used timestamp to the current time
    },
  });
}

export async function updateLeadMagnetImpressions(id: string) {
  return prisma.leadMagnet.update({
    where: { id },
    data: {
      impressionsCount: { increment: 1 },
      lastUsedAt: new Date(),
    },
  });
}

export async function createLeadMagnetUsageLog({
  leadMagnetId,
  ipAddress,
  payload,
}: {
  leadMagnetId: string;
  ipAddress: string;
  payload: any;
}) {
  return prisma.leadMagnetUsage.create({
    data: {
      leadMagnetId,
      ipAddress,
      payload,
    },
  });
}
