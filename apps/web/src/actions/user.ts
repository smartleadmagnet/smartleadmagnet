"use server";

import { User } from "@smartleadmagnet/database";
import { getUserById } from "@smartleadmagnet/services";
import { getSessionUser } from "@/services/user";

export async function getUserInfo(): Promise<User> {
  const user = await getSessionUser();
  return getUserById(user?.id!);
}
