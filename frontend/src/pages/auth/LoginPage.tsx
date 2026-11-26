import { ChangeEvent, useState } from "react";
import {
	Alert,
	Box,
	Button,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signIn } from "../../api/";
import { useAuth } from "./AuthContext";

export function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const {refresh} = useAuth();

	async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signIn(email, password);

			if (!result.ok) {
				setError("Неправильна електронна пошта або пароль");
				return;
			}

			const authenticated = await refresh();

			if (!authenticated) {
				setError("Не вдалося увійти. Спробуйте ще раз.");
				return;
			}

			await navigate("/users", { replace: true });
		} catch (err) {
			if (axios.isAxiosError(err) && err.response?.status === 401) {
				setError("Неправильна електронна пошта або пароль.");
			} else {
				setError("Не вдалося увійти. Спробуйте ще раз.");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
			<Paper
				component="form"
				onSubmit={handleSubmit}
				sx={{ p: 4 }}
			>
				<Typography
					variant="h5"
					component="h1"
					sx={{ mb: 3 }}
				>
					Вхід
				</Typography>

				{error && (
					<Alert
						severity="error"
						sx={{ mb: 2 }}
					>
						{error}
					</Alert>
				)}

				<TextField
					label="Електронна пошта"
					type="email"
					autoComplete="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
					fullWidth
					margin="normal"
				/>

				<TextField
					label="Пароль"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
					fullWidth
					margin="normal"
				/>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					disabled={loading}
					sx={{ mt: 2 }}
				>
					{loading ? "Вхід..." : "Увійти"}
				</Button>
			</Paper>
		</Box>
	);
}
