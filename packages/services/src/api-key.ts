import prisma, { ApiKey } from "@smartleadmagnet/database";

// create api key
export async function createApiKey(data: {
  userId: string;
  keyName: string;
  apiKey: string;
  provider: string;
  isDefault: boolean;
}): Promise<ApiKey> {
  if (data.isDefault) {
    await prisma.apiKey.updateMany({
      where: {
        userId: data.userId,
      },
      data: {
        isDefault: false,
      },
    });
  }
  return prisma.apiKey.create({
    data,
  });
}

// get api keys by user id
export async function getApiKeysByUserId(userId: string): Promise<ApiKey[]> {
  return prisma.apiKey.findMany({
    where: {
      userId,
    },
  });
}

export async function deleteApiKey(keyId: string, userId: string) {
  await prisma.apiKey.delete({
    where: {
      id: keyId,
      userId,
    },
  });
}

export async function toggleDefaultKey(keyId: string, userId: string) {
  const key = await prisma.apiKey.findFirst({
    where: {
      id: keyId,
    },
  });

  if (!key) {
    throw new Error("Key not found");
  }

  await prisma.apiKey.updateMany({
    where: {
      userId,
    },
    data: {
      isDefault: false,
    },
  });

  await prisma.apiKey.update({
    where: {
      id: keyId,
    },
    data: {
      isDefault: true,
    },
  });
}
