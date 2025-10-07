import { httpClient } from "../httpClient";

export interface BankAccountParams {
	name: string;
	initialBalance: number;
	color: string;
	type: "CHECKING" | "INVESTMENT" | "CASH";
}

export const update = async (id: string, data: BankAccountParams) => {
	const response = await httpClient.put(`/bank-accounts/${id}`, data);
	return response.data;
};
