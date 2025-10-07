import { httpClient } from "../httpClient";

interface BankAccountResponse {
	id: string;
	name: string;
	color: string;
	currentBalance: number;
	type: "CHECKING" | "INVESTMENT" | "CASH";
}

export const get = async () => {
	const response = await httpClient.get<BankAccountResponse[] | []>(
		"/bank-accounts"
	);
	return response.data;
};
