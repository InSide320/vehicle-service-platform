import api from "./axios";
import { User } from "../types/users";

export const getMe = async ():Promise<User> => {
	const response = await api.get<User>("/users/me");
	return response.data;
}

export const getUsers = async ():Promise<User[]> => {
	const response = await api.get<User[]>("/users");
	return response.data;
}
