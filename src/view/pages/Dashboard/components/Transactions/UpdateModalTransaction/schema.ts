import z from "zod";

export const updateSchemaType = z.object({
	value: z.string().min(1, "Este campo é obrigatorio"),
	name: z.string().min(1, "Este campo é obrigatorio"),
	categoryId: z.string().min(1, "Este campo é obrigatorio"),
	bankAccountId: z.string().min(1, "Este campo é obrigatorio"),
	date: z.date().min(1, "Este campo é obrigatorio"),
	type: z.enum(["INCOME", "EXPENSE"]),
});

export type UpdateSchemaType = z.infer<typeof updateSchemaType>;
