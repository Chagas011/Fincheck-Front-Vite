import { httpClient } from "../httpClient";

interface TransactionsResponse {
	id: string;
	name: string;
	value: number;
	date: Date;
	type: "INCOME" | "EXPENSE";
	bankAccountId: string;
	category?: {
		id: string;
		name: string;
		icon: string;
	};
}

interface TransactionsFilters {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: "INCOME" | "EXPENSE";
}

export const get = async (filters: TransactionsFilters) => {
	await new Promise((resolve) => setTimeout(resolve, 100));
	const response = await httpClient.get<TransactionsResponse[] | []>(
		"/transactions",
		{
			params: filters,
		}
	);
	return response.data;
};
