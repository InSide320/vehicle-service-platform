export type Role = "guest"| "user" | "admin";

export interface User {
	id: string;
	email: string;
	emailVerified: boolean;
	role: Role;
}


export interface UserRow extends User {
	passwordHash: string;
}