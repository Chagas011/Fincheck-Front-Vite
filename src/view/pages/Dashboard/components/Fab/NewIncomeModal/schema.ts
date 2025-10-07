import z from "zod";

export const incomeSchema = z.object({
	value: z.string().min(1, "Este campo é obrigatorio"),
	name: z.string().min(1, "Este campo é obrigatorio"),
	category: z.string().min(1, "Este campo é obrigatorio"),
	bankAccount: z.string().min(1, "Este campo é obrigatorio"),
	date: z.date().min(1, "Este campo é obrigatorio"),
	type: z.string(),
});

export type IncomeSchemaType = z.infer<typeof incomeSchema>;
