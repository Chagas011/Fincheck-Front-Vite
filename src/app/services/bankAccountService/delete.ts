import { httpClient } from "../httpClient";

export const deleteAccount = async (id: string) => {
	const response = await httpClient.delete(`/bank-accounts/${id}`);
	return response.data;
};
