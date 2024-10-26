import {createEnv} from "@t3-oss/env-nextjs";

import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const Env = createEnv({
	// TODO fix the format of the URL and ID
	server: {
		PRISMA_DATABASE_URL: z.string().url().optional(),
	},
	runtimeEnv: {
    PRISMA_DATABASE_URL: process.env.DATABASE_URL,
	},
});
