import React, { useMemo, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	FormControl,
	IconButton,
	InputAdornment,
	MenuItem,
	Pagination,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { initialUsers, UserRecord, UserStatus } from "./usersData";

const PAGE_SIZE = 5;

function MetricCard({
	title,
	value,
	caption,
	icon,
	color,
}: {
	title: string;
	value: string;
	caption: string;
	icon: React.ReactNode;
	color: string;
}) {
	return (
		<Card sx={{ flex: "1 1 205px", minWidth: 180 }}>
			<CardContent sx={{ p: "20px !important" }}>
				<Stack
					direction="row"
					sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
				>
					<Box>
						<Typography variant="body2">{title}</Typography>
						<Typography
							variant="h5"
							sx={{ mt: 1, fontSize: 27 }}
						>
							{value}
						</Typography>
						<Typography variant="caption">{caption}</Typography>
					</Box>
					<Avatar
						variant="rounded"
						sx={{ bgcolor: `${color}20`, color, width: 40, height: 40 }}
					>
						{icon}
					</Avatar>
				</Stack>
			</CardContent>
		</Card>
	);
}

function statusColor(status: UserStatus): "success" | "warning" | "error" {
	if (status === "Активний") return "success";
	return status === "На перевірці" ? "warning" : "error";
}

export function UsersPage() {
	const location = useLocation();
	const newUser = (location.state as { newUser?: UserRecord } | null)?.newUser;
	const [users, setUsers] = useState<UserRecord[]>(() =>
		newUser ? [newUser, ...initialUsers] : initialUsers
	);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("Усі");
	const [vehicleCount, setVehicleCount] = useState("Усі");
	const [page, setPage] = useState(1);

	const filteredUsers = useMemo(
		() =>
			users.filter((user) => {
				const query = search.trim().toLocaleLowerCase("uk");
				const matchesSearch =
					!query ||
					`${user.name} ${user.email} ${user.phone} ${user.id}`
						.toLocaleLowerCase("uk")
						.includes(query);
				const matchesStatus = status === "Усі" || user.status === status;
				const matchesVehicles =
					vehicleCount === "Усі" ||
					(vehicleCount === "Без ТЗ"
						? user.vehicles === 0
						: vehicleCount === "1–2 авто"
							? user.vehicles >= 1 && user.vehicles <= 2
							: user.vehicles >= 3);
				return matchesSearch && matchesStatus && matchesVehicles;
			}),
		[users, search, status, vehicleCount]
	);
	const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
	const visibleUsers = filteredUsers.slice(
		(page - 1) * PAGE_SIZE,
		page * PAGE_SIZE
	);

	const resetFilters = () => {
		setSearch("");
		setStatus("Усі");
		setVehicleCount("Усі");
		setPage(1);
	};
	const updateStatus = (id: string, nextStatus: UserStatus) =>
		setUsers((current) =>
			current.map((user) =>
				user.id === id ? { ...user, status: nextStatus } : user
			)
		);

	return (
		<Stack
			spacing={3}
			sx={{ maxWidth: 1600, mx: "auto" }}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: { xs: "flex-start", sm: "center" },
					gap: 2,
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<Box>
					<Typography
						variant="overline"
						color="primary.light"
						sx={{ letterSpacing: ".12em", fontWeight: 700 }}
					>
						01 / РЕЄСТР ОНОВЛЕНО ЩОЙНО
					</Typography>
					<Typography
						variant="h4"
						sx={{ mt: 0.5 }}
					>
						Користувачі
					</Typography>
					<Typography
						color="text.secondary"
						sx={{ mt: 0.75 }}
					>
						Управління власниками та водіями транспортних засобів
					</Typography>
				</Box>
				<Button
					component={RouterLink}
					to="/users/new"
					variant="contained"
					startIcon={<AddIcon />}
					sx={{ whiteSpace: "nowrap" }}
				>
					Додати користувача
				</Button>
			</Box>

			<Stack
				direction="row"
				sx={{ flexWrap: "wrap", gap: 2 }}
			>
				<MetricCard
					title="Всього користувачів"
					value="1 248"
					caption="↑ 4.2% за місяць"
					icon={<GroupOutlinedIcon />}
					color="#60a5fa"
				/>
				<MetricCard
					title="Активні"
					value="1 180"
					caption="94.5% від усіх"
					icon={<VerifiedUserOutlinedIcon />}
					color="#34d399"
				/>
				<MetricCard
					title="З прив'язаними ТЗ"
					value="942"
					caption="75.4% покриття"
					icon={<DirectionsCarOutlinedIcon />}
					color="#a78bfa"
				/>
				<MetricCard
					title="Очікують підтвердження"
					value="68"
					caption="Потребують уваги"
					icon={<HourglassTopOutlinedIcon />}
					color="#fbbf24"
				/>
			</Stack>

			<Card>
				<Box
					sx={{
						p: 2,
						display: "flex",
						gap: 1.5,
						flexWrap: "wrap",
						alignItems: "center",
					}}
				>
					<TextField
						size="small"
						placeholder="Пошук за ім'ям, телефоном або email"
						value={search}
						onChange={(event) => {
							setSearch(event.target.value);
							setPage(1);
						}}
						sx={{ flex: "1 1 280px" }}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								),
							},
						}}
					/>
					<FormControl
						size="small"
						sx={{ minWidth: 160 }}
					>
						<Select
							value={status}
							onChange={(event) => {
								setStatus(event.target.value);
								setPage(1);
							}}
							aria-label="Статус"
						>
							<MenuItem value="Усі">Статус: Усі</MenuItem>
							<MenuItem value="Активний">Активний</MenuItem>
							<MenuItem value="На перевірці">На перевірці</MenuItem>
							<MenuItem value="Заблокований">Заблокований</MenuItem>
						</Select>
					</FormControl>
					<FormControl
						size="small"
						sx={{ minWidth: 160 }}
					>
						<Select
							value={vehicleCount}
							onChange={(event) => {
								setVehicleCount(event.target.value);
								setPage(1);
							}}
							aria-label="Кількість ТЗ"
						>
							<MenuItem value="Усі">Кількість ТЗ: Усі</MenuItem>
							<MenuItem value="Без ТЗ">Без ТЗ</MenuItem>
							<MenuItem value="1–2 авто">1–2 авто</MenuItem>
							<MenuItem value="3+ авто">3+ авто</MenuItem>
						</Select>
					</FormControl>
					<Button
						color="inherit"
						onClick={resetFilters}
					>
						Скинути
					</Button>
				</Box>
				<TableContainer sx={{ overflowX: "auto" }}>
					<Table sx={{ minWidth: 930 }}>
						<TableHead>
							<TableRow>
								<TableCell>Користувач</TableCell>
								<TableCell>Телефон</TableCell>
								<TableCell>Кількість ТЗ</TableCell>
								<TableCell>Статус</TableCell>
								<TableCell>Останнє сповіщення RabbitMQ</TableCell>
								<TableCell align="right">Дії</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{visibleUsers.map((user) => (
								<TableRow
									key={user.id}
									hover
								>
									<TableCell>
										<Stack
											direction="row"
											spacing={1.5}
											sx={{ alignItems: "center" }}
										>
											<Avatar
												sx={{
													width: 38,
													height: 38,
													bgcolor: "primary.dark",
													fontSize: 13,
												}}
											>
												{user.initials}
											</Avatar>
											<Box>
												<Typography
													variant="body2"
													color="text.primary"
													sx={{ fontWeight: 600 }}
												>
													{user.name}
												</Typography>
												<Typography variant="caption">{user.email}</Typography>
											</Box>
										</Stack>
									</TableCell>
									<TableCell sx={{ whiteSpace: "nowrap" }}>
										{user.phone}
									</TableCell>
									<TableCell>
										<Chip
											size="small"
											variant="outlined"
											icon={<DirectionsCarOutlinedIcon />}
											label={`${user.vehicles} ${user.vehicles === 1 ? "авто" : "авто"}`}
										/>
									</TableCell>
									<TableCell>
										<Chip
											size="small"
											color={statusColor(user.status)}
											label={user.status}
										/>
									</TableCell>
									<TableCell>
										<Stack
											direction="row"
											spacing={1}
											sx={{ alignItems: "center", color: "text.secondary" }}
										>
											{user.lastEvent.toLowerCase().includes("то") ? (
												<BuildOutlinedIcon
													fontSize="small"
													color="warning"
												/>
											) : user.lastEvent.toLowerCase().includes("штраф") ? (
												<ReceiptLongOutlinedIcon
													fontSize="small"
													color="error"
												/>
											) : (
												<VerifiedUserOutlinedIcon
													fontSize="small"
													color="success"
												/>
											)}
											<Typography variant="body2">{user.lastEvent}</Typography>
										</Stack>
									</TableCell>
									<TableCell align="right">
										<Stack
											direction="row"
											spacing={0.25}
											sx={{ justifyContent: "flex-end" }}
										>
											<IconButton
												size="small"
												aria-label={`Переглянути ${user.name}`}
											>
												<VisibilityOutlinedIcon fontSize="small" />
											</IconButton>
											<IconButton
												size="small"
												aria-label={`Редагувати ${user.name}`}
											>
												<EditOutlinedIcon fontSize="small" />
											</IconButton>
											<IconButton
												size="small"
												aria-label={`Змінити статус ${user.name}`}
												onClick={() =>
													updateStatus(
														user.id,
														user.status === "Заблокований"
															? "Активний"
															: "Заблокований"
													)
												}
											>
												<MoreHorizIcon fontSize="small" />
											</IconButton>
										</Stack>
									</TableCell>
								</TableRow>
							))}
							{visibleUsers.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={6}
										align="center"
										sx={{ py: 6 }}
									>
										<Typography color="text.secondary">
											За цими умовами користувачів не знайдено
										</Typography>
										<Button
											onClick={resetFilters}
											sx={{ mt: 1 }}
										>
											Скинути фільтри
										</Button>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={1.5}
					sx={{
						px: 2.5,
						py: 2,
						borderTop: 1,
						borderColor: "divider",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="body2">
						Показано {filteredUsers.length ? (page - 1) * PAGE_SIZE + 1 : 0}–
						{Math.min(page * PAGE_SIZE, filteredUsers.length)} із{" "}
						{filteredUsers.length} користувачів
					</Typography>
					<Pagination
						count={pageCount}
						page={page}
						onChange={(_, value) => setPage(value)}
						color="primary"
						size="small"
					/>
				</Stack>
			</Card>
		</Stack>
	);
}
