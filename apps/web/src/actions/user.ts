"use server";

import { getUserById } from "@smartleadmagnet/services";
import { getSessionUser } from "@/services/user";


export async function getUserInfo() {
  const user = await getSessionUser();
  return getUserById(user?.id!);
}