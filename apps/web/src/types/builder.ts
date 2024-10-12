import { z } from "zod";

export const builderSchemaForm = z.object({
	image: z.string().min(1, "Image is required"),
	name: z.string().min(1, "Title is required"),
	tagline: z.string().min(1, "Tagline is required"),
	description: z.string().min(1, "Description is required"),
	category: z.string().min(1, "Category is required"),
});

export type BuilderSchemaForm = z.infer<typeof builderSchemaForm>;