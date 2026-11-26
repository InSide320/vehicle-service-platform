import { Navigate } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { useAuth } from "./AuthContext";

export function GuestOnlyRoute() {
	const { status } = useAuth();

	if (status === "loading") return <div>Перевіряю сесію...</div>;
	if (status === "error") return <div>Не вдалося перевірити сесію.</div>;
	if (status === "authenticated") {
		return (
			<Navigate
				to="/users"
				replace
			/>
		);
	}

	return <LoginPage />;
}
