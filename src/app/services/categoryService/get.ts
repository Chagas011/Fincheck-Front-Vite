import { httpClient } from "../httpClient";

interface CatagoriesResponse {
	id: string;
	userId: string;
	name: string;
	icon: string;
	type: "INCOME" | "EXPENSE";
}

export const get = async () => {
	const response = await httpClient.get<CatagoriesResponse[] | []>(
		"/categories"
	);
	return response.data;
};
