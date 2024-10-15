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
  const leadMagnet = await prisma.leadMagnet.findUnique({
    where: { id },
  });
  return prisma.leadMagnet.update({
    where: { id },
    data: {
      usedCount: leadMagnet.usedCount + 1, // Increment the usage count by 1
      lastUsedAt: new Date(), // Update the last used timestamp to the current time
    },
  });
}

export async function updateLeadMagnetImpressions(id: string) {
  const leadMagnet = await prisma.leadMagnet.findUnique({
    where: { id },
  });

  return prisma.leadMagnet.update({
    where: { id },
    data: {
      impressionsCount: leadMagnet.impressionsCount + 1, // manually incrementing
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

export async function copyLeadMagnet(id: string, userId: string) {
  const leadMagnet = await prisma.leadMagnet.findFirst({
    where: { id },
  });

  return prisma.leadMagnet.create({
    data: {
      ...leadMagnet,
      id: undefined,
      impressionsCount: 0,
      usedCount: 0,
      status: "pending",
      apiKeyId: null,
      webhook: "",
      userId,
      name: `${leadMagnet.name} - Copy`,
    },
  });
}
