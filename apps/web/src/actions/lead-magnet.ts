"use server";

import { createLeadMagnet } from "@smartleadmagnet/services";
import { uniqueNamesGenerator, Config, names, starWars, adjectives } from 'unique-names-generator';
import { getSessionUser } from "@/services/user";
const config: Config = {
	dictionaries: [names, starWars, adjectives]
}

export async function createLead(){
	const user = await getSessionUser();
	try {
		return createLeadMagnet({
			name: uniqueNamesGenerator(config),
			status: "pending",
			prompt: "",
			components: [],
			userId: user.id,
		})
	} catch (error: any) {
		console.error('Error creating lead:', error);
		throw new Error(error.message);
	}
}