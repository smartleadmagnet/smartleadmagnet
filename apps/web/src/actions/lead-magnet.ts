"use server";

import {
  copyLeadMagnet,
  createLeadMagnet,
  deleteLeadMagnet,
  getLeadBySlug,
  getLeadMagnetById,
  getLeadMagnetsByUser,
  getLeadMagnetUsageById,
  getLeadMagnetsByPopularity,
} from "@smartleadmagnet/services";
import { adjectives, Config, names, starWars, uniqueNamesGenerator } from "unique-names-generator";
import { getSessionUser } from "@/services/user";
import { LeadMagnet } from "@smartleadmagnet/database";
import { revalidatePath } from "next/cache";

const config: Config = {
  dictionaries: [names, starWars, adjectives],
};

export async function createLead(): Promise<LeadMagnet> {
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

export async function cloneLead(id: string): Promise<LeadMagnet> {
  const user = await getSessionUser();
  try {
    // @ts-ignore
    return copyLeadMagnet(id, user?.id);
  } catch (error: any) {
    console.error("Error cloning lead:", error);
    throw new Error(error.message);
  }
}

export async function getByUser(status: string = "") {
  const user = await getSessionUser();
  const leads = await getLeadMagnetsByUser(user?.id!, status);
  return leads || [];
}

export async function getById(id: string) {
  return getLeadMagnetById(id);
}

export async function deleteLead(keyId: string) {
  await deleteLeadMagnet(keyId);
  revalidatePath("/api/my-magnets");
}

export async function getUsageById(id: string) {
  return getLeadMagnetUsageById(id);
}

export async function getBySlug(template: string) {
  try {
    return await getLeadBySlug(template);
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createFromWebsite(data: {
  name: string;
  outputType: string;
  prompt: string;
  components: any[];
  websiteUrl: string;
}): Promise<LeadMagnet> {
  const user = await getSessionUser();
  try {
    // @ts-ignore
    return createLeadMagnet({
      name: data.name,
      status: "pending",
      prompt: data.prompt,
      components: data.components,
      userId: user?.id!,
      description: `Lead magnet generated from ${data.websiteUrl}`,
      output: data.outputType
    });
  } catch (error: any) {
    console.error("Error creating lead from website:", error);
    throw new Error(error.message);
  }
}

export async function getTopLeadMagnets(limit: number = 10) {
  return getLeadMagnetsByPopularity(limit);
}
