import { httpClient } from "./httpClient";

interface RegisterParams {
	email: string;
	password: string;
	name: string;
}

interface AccessToken {
	access_token: string;
}

export const register = async (data: RegisterParams) => {
	const response = await httpClient.post<AccessToken>("/auth/signup", data);
	return response.data;
};
