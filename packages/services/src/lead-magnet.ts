import prisma, { LeadMagnet } from "@smartleadmagnet/database";

export const createLeadMagnet = async (data: LeadMagnet) => {
  return prisma.leadMagnet.create({
    data
  })
};

export const getLeadMagnetById = async (id: string): Promise<LeadMagnet> => {
  return prisma.leadMagnet.findUnique({
    where: {id},
  });
};

export const updateLeadMagnet = async (id: string, userId: string, data: Partial<LeadMagnet>) => {
  return prisma.leadMagnet.update({
    where: {id, userId},
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
};

export const deleteLeadMagnet = async (id: string) => {
  return prisma.leadMagnet.delete({
    where: {id},
  });
};

export const getLeadMagnetsByUser = async (userId: string) => {
  return prisma.leadMagnet.findMany({
    where: {userId},
  });
};


