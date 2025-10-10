import { httpClient } from "../httpClient";

export const deleteTransaction = async (id: string) => {
	const response = await httpClient.delete(`/transactions/${id}`);
	return response.data;
};
