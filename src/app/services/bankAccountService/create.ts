import { httpClient } from "../httpClient";

interface BankAccountParams {
	name: string;
	initialBalance: number;
	color: string;
	type: "CHECKING" | "INVESTMENT" | "CASH";
}

export const create = async (data: BankAccountParams) => {
	const response = await httpClient.post("/bank-accounts", data);
	return response.data;
};
