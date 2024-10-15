"use server";

import { getSessionUser } from "@/services/user";
import { createApiKey, deleteApiKey, getApiKeysByUserId, toggleDefaultKey,updateApiKey } from "@smartleadmagnet/services";
import { revalidatePath } from "next/cache";

export async function getApiKeys() {
  const user = await getSessionUser();
  return getApiKeysByUserId(user.id);
}

export async function createKey(data: { keyName: string; apiKey: string; provider: string; isDefault: boolean }) {
  const user = await getSessionUser();
  await createApiKey({
    ...data,
    userId: user.id,
  });

  revalidatePath("/api/settings/manage-keys");
}

export async function updateKey(keyid:string,data: {  keyName: string; apiKey: string; provider: string; isDefault: boolean }) {
  const user = await getSessionUser();
  await updateApiKey(
    keyid,
    user.id,data);

  revalidatePath("/api/settings/manage-keys");
}

export async function toggleKey(keyId: string) {
  const user = await getSessionUser();
  await toggleDefaultKey(keyId, user.id);
  revalidatePath("/api/settings/manage-keys");
}

export async function deleteKey(keyId: string) {
  const user = await getSessionUser();
  await deleteApiKey(keyId, user.id);
  revalidatePath("/api/settings/manage-keys");
}
