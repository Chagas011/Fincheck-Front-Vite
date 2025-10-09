import { httpClient } from "../httpClient";

interface TransactionsParams {
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: Date;
	type: "INCOME" | "EXPENSE";
}

export const create = async (data: TransactionsParams) => {
	const response = await httpClient.post("/transactions", data);
	return response.data;
};
