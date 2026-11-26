import React, { FormEvent, useState } from "react";
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	FormControlLabel,
	MenuItem,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserRecord } from "./usersData";

export function NewUserPage() {
	const navigate = useNavigate();
	const [active, setActive] = useState(true);
	const [channels, setChannels] = useState({
		maintenance: true,
		fines: true,
		telemetry: false,
	});
	const [error, setError] = useState("");

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const firstName = String(form.get("firstName") || "").trim();
		const lastName = String(form.get("lastName") || "").trim();
		const email = String(form.get("email") || "").trim();
		const phone = String(form.get("phone") || "").trim();
		if (!firstName || !lastName || !email || !phone) {
			setError("Заповніть обов’язкові поля, позначені зірочкою.");
			return;
		}
		const middleName = String(form.get("middleName") || "").trim();
		const initials =
			`${lastName[0] || ""}${firstName[0] || ""}`.toLocaleUpperCase("uk");
		const created: UserRecord = {
			id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
			name: [firstName, middleName, lastName].filter(Boolean).join(" "),
			email,
			phone,
			vehicles: 0,
			status: active ? "Активний" : "Заблокований",
			lastEvent: "Профіль створено",
			initials,
		};
		navigate("/users", { state: { newUser: created } });
	};

	return (
		<Stack
			spacing={3}
			sx={{ maxWidth: 1050, mx: "auto" }}
		>
			<Button
				component={RouterLink}
				to="/users"
				startIcon={<ArrowBackIcon />}
				color="inherit"
				sx={{ alignSelf: "flex-start" }}
			>
				До реєстру користувачів
			</Button>
			<Box>
				<Typography variant="h4">Створення користувача</Typography>
				<Typography
					color="text.secondary"
					sx={{ mt: 1 }}
				>
					Зареєструйте нового власника або водія для подальшої прив’язки
					транспортних засобів.
				</Typography>
			</Box>
			<form onSubmit={submit}>
				<Stack spacing={2.5}>
					<Card>
						<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
							<Stack spacing={2.5}>
								<Stack
									direction="row"
									spacing={1.5}
									sx={{ alignItems: "center" }}
								>
									<Typography
										variant="overline"
										color="primary.light"
										sx={{ fontWeight: 700 }}
									>
										01
									</Typography>
									<Box>
										<Typography variant="h6">Основна інформація</Typography>
										<Typography variant="caption">
											Контактні дані профілю
										</Typography>
									</Box>
								</Stack>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: {
											xs: "1fr",
											sm: "repeat(2, minmax(0, 1fr))",
										},
										gap: 2,
									}}
								>
									<TextField
										required
										name="lastName"
										label="Last Name"
									/>
									<TextField
										required
										name="firstName"
										label="First Name"
									/>
									<TextField
										required
										name="email"
										label="Email"
										type="email"
										helperText="For login"
									/>
									<TextField
										required
										name="phone"
										label="Phone"
										type="tel"
									/>
								</Box>
							</Stack>
						</CardContent>
					</Card>
					<Card>
						<CardContent sx={{ p: { xs: 2, sm: 3 } }}>
							<Stack spacing={2}>
								<Stack
									direction="row"
									spacing={1.5}
									sx={{ alignItems: "center" }}
								>
									<Typography
										variant="overline"
										color="primary.light"
										sx={{ fontWeight: 700 }}
									>
										02
									</Typography>
									<Box>
										<Typography variant="h6">Статус та роль</Typography>
										<Typography variant="caption">
											Рівень доступу до платформи
										</Typography>
									</Box>
								</Stack>
								<Box
									sx={{
										display: "grid",
										gridTemplateColumns: {
											xs: "1fr",
											sm: "minmax(220px, 1fr) minmax(260px, 1.4fr)",
										},
										gap: 2,
										alignItems: "center",
									}}
								>
									<TextField
										select
										name="role"
										label="Роль"
										defaultValue="Водій"
									>
										<MenuItem value="Власник ТЗ">Власник ТЗ</MenuItem>
										<MenuItem value="Водій">Водій</MenuItem>
										<MenuItem value="Менеджер автопарку">
											Менеджер автопарку
										</MenuItem>
									</TextField>
									<FormControlLabel
										control={
											<Switch
												checked={active}
												onChange={(event) => setActive(event.target.checked)}
											/>
										}
										label={
											<Box>
												<Typography
													variant="body2"
													color="text.primary"
												>
													Активний акаунт
												</Typography>
												<Typography variant="caption">
													Доступ до системи дозволено
												</Typography>
											</Box>
										}
									/>
								</Box>
							</Stack>
						</CardContent>
					</Card>
					{error && <Alert severity="error">{error}</Alert>}
					<Stack
						direction="row"
						spacing={1.5}
						sx={{ justifyContent: "flex-end" }}
					>
						<Button
							component={RouterLink}
							to="/users"
							color="inherit"
						>
							Скасувати
						</Button>
						<Button
							type="submit"
							variant="contained"
							startIcon={<PersonAddAlt1OutlinedIcon />}
						>
							Створити користувача
						</Button>
					</Stack>
				</Stack>
			</form>
		</Stack>
	);
}
