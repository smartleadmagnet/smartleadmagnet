import prisma, { LeadMagnet, LeadMagnetUsage } from "@smartleadmagnet/database";

export const createLeadMagnet = async (data: LeadMagnet) => {
  return prisma.leadMagnet.create({
    data,
  });
};

export const getLeadMagnetById = async (id: string): Promise<LeadMagnet> => {
  return prisma.leadMagnet.findUnique({
    where: { id },
    include: {
      apiKey: true,
    },
  });
};

export const getPublicLeadMagnets = async () => {
  return prisma.leadMagnet.findMany({
    where: {
      status: "published",
      public: true,
    },
  });
};

function convertSlugToName(slug: string): string {
  return slug
    .replace(/-/g, " ") // Replace hyphens with spaces
    .toLowerCase(); // Convert to lowercase (assuming names in the DB are lowercase)
}

export async function getLeadBySlug(slug: string): Promise<LeadMagnet> {
  const name = convertSlugToName(slug);
  try {
    return await prisma.leadMagnet.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  } catch (error) {
    // TODO sentry error
    console.error("Error finding user by slug:", error);
  }
}

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

export const getLeadMagnetsByUser = async (userId: string, status?: string) => {
  return prisma.leadMagnet.findMany({
    where: {
      userId,
      ...(status && { status }), // Only include status if it's provided
    },
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
  webhookStatus,
  emailSent,
}: {
  leadMagnetId: string;
  ipAddress: string;
  payload: any;
  webhookStatus: string;
  emailSent: boolean;
}) {
  return prisma.leadMagnetUsage.create({
    data: {
      leadMagnetId,
      ipAddress,
      payload,
      webhookStatus,
      emailSent,
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

export const getLeadMagnetUsageById = async (
  leadMagnetId: string
): Promise<{
  usage: LeadMagnetUsage[];
  leadMagnet: {
    name: string;
    impressionsCount: number;
    usedCount: number;
    createdAt: Date;
    status: string;
  };
}> => {
  // Fetch LeadMagnetUsage records for the given leadMagnetId
  const usageRecords = await prisma.leadMagnetUsage.findMany({
    where: { leadMagnetId },
  });

  // Fetch the associated LeadMagnet information
  const leadMagnet = await prisma.leadMagnet.findUnique({
    where: { id: leadMagnetId },
    select: {
      name: true,
      impressionsCount: true,
      usedCount: true,
      createdAt: true,
      status: true,
    }, // Assuming id is the unique identifier for LeadMagnet
  });

  return {
    usage: usageRecords, // All usage records
    leadMagnet, // The LeadMagnet information
  };
};
