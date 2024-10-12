"use server";

import { createLeadMagnet, getLeadMagnetById, getLeadMagnetsByUser } from "@smartleadmagnet/services";
import { adjectives, Config, names, starWars, uniqueNamesGenerator } from "unique-names-generator";
import { getSessionUser } from "@/services/user";

const config: Config = {
  dictionaries: [names, starWars, adjectives],
};

export async function createLead() {
  const user = await getSessionUser();
  try {
    // @ts-ignore
    return createLeadMagnet({
      name: uniqueNamesGenerator(config),
      status: "pending",
      prompt: "",
      components: [] as any,
      userId: user?.id!,
      description: "",
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    throw new Error(error.message);
  }
}

export async function getByUser() {
  const user = await getSessionUser();
  const leads = await getLeadMagnetsByUser(user?.id!);
  return leads || [];
}

export async function getById(id: string) {
  return getLeadMagnetById(id);
}
