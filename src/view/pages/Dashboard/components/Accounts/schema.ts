import z from "zod";
export const BankAccountType = {
	CHECKING: "Conta Corrente",
	INVESTMENT: "Investimentos",
	CASH: "Dinheiro",
} as const;

export type BankAccountType = keyof typeof BankAccountType;

export const newAccountSchema = z.object({
	name: z.string().min(1, "Este campo é obrigatorio"),
	initialBalance: z.number().min(1, "Este campo é obrigatorio"),
	type: z.enum(Object.keys(BankAccountType) as [keyof typeof BankAccountType]),
	color: z.hex().min(1, "Campo obrigatorio"),
});

export type NewAccountSchema = z.infer<typeof newAccountSchema>;
