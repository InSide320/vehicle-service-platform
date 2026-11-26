import api from "./axios";

export interface SignInResponse {
	ok: boolean;
}

export const signIn = async (
	email: string,
	password: string
): Promise<SignInResponse> => {
	const response = await api.post("/auth/sign-in", { email, password });
	return response.data;
};

export const signOut = async (): Promise<{ ok: boolean }> => {
	const response = await api.post("/auth/sign-out");
	return response.data;
};

export const signUp = async (
	email: string,
	password: string
): Promise<SignInResponse> => {
	const response = await api.post("/auth/sign-up", { email, password });
	return response.data;
};
