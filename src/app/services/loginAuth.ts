import { httpClient } from "./httpClient";

interface LoginParams {
	email: string;
	password: string;
}

interface AccessToken {
	access_token: string;
}

export const login = async (data: LoginParams) => {
	const response = await httpClient.post<AccessToken>("/auth/signin", data);
	return response.data;
};
