import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import axios from "axios";
import { getMe } from "../../api";
import { User } from "../../types/users";

type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";

type AuthContextType = {
	status: AuthStatus;
	user: User | null;
	refresh: () => Promise<boolean>;
	clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [status, setStatus] = useState<AuthStatus>("loading");
	const [user, setUser] = useState<User | null>(null);

	const refresh = useCallback(async () => {
		setStatus("loading");

		try {
			const currentUser = await getMe();
			setUser(currentUser);
			setStatus("authenticated");
			return true;
		} catch (error) {
			setUser(null);

			if (axios.isAxiosError(error) && error.response?.status === 401) {
				setStatus("unauthenticated");
			} else {
				setStatus("error");
			}
			return false;
		}
	}, []);

	useEffect(() => {
		void refresh();
	}, [refresh]);

	const clearAuth = useCallback(() => {
		setUser(null);
		setStatus("unauthenticated");
	}, []);
	const value = useMemo(
		() => ({ status, user, refresh, clearAuth }),
		[status, user, refresh, clearAuth]
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
