import { httpClient } from "../httpClient";

interface TransactionsParams {
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: Date;
	type: "INCOME" | "EXPENSE";
}

export const update = async (id: string, data: TransactionsParams) => {
	const response = await httpClient.put(`/transactions/${id}`, data);
	return response.data;
};
