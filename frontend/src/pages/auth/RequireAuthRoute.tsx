import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function RequireAuthRoute() {
	const { status, refresh } = useAuth();

	if (status === "loading") {
		return <div>Check session...</div>;
	}

	if (status === "error") {
		return (
			<div>
				<p>Can't check session.</p>
				<button onClick={() => void refresh()}>Try again</button>
			</div>
		);
	}

	if (status === "unauthenticated") {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return <Outlet />;
}
