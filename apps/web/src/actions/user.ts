"use server";

import { User } from "@smartleadmagnet/database";
import { getUserById, updateUser } from "@smartleadmagnet/services";
import { getSessionUser } from "@/services/user";

export async function getUserInfo(): Promise<User> {
  const user = await getSessionUser();
  return getUserById(user?.id!);
}

export async function updateUserInfo(bio: string, name: string): Promise<User> {
  const user = await getSessionUser();
  return updateUser({ id: user?.id!, bio, name });
}
