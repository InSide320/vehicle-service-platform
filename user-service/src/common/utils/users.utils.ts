import { User, UserRow } from "../../users/user.js";

// As the package passes addresses to handlers: an accent typed as two code points matches the stored one.
export const normalize = (email: string) =>
	email.trim().normalize("NFC").toLowerCase();
export const toUser = ({ id, email, emailVerified, role }: UserRow): User => ({
	id,
	email,
	emailVerified,
	role: role,
});
