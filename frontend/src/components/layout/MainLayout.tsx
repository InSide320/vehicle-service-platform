import React from "react";
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Toolbar,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar/Sidebar";
// import { TopBar } from "./TopBar/TopBar";

export const MainLayout = () => {
	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100vh",
				bgcolor: "background.default",
			}}
		>
			<Sidebar />
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					minWidth: 0,
				}}
			>
				<AppBar
					position="sticky"
					color="transparent"
					sx={{ borderBottom: 1, borderColor: "divider" }}
				>
					<Toolbar sx={{ gap: 2, minHeight: "68px !important" }}>
						<TextField
							size="small"
							placeholder="Пошук у FleetMQ"
							sx={{ width: { xs: "100%", sm: 340 } }}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon fontSize="medium" />
										</InputAdornment>
									),
								},
							}}
						/>
						<Box sx={{ flexGrow: 1 }} />
						<IconButton aria-label="Сповіщення">
							<Badge
								badgeContent={3}
								color="error"
							>
								<NotificationsNoneOutlinedIcon />
							</Badge>
						</IconButton>
						<Stack
							direction="row"
							spacing={1}
							sx={{ alignItems: "center" }}
						>
							<Avatar
								sx={{
									width: 34,
									height: 34,
									bgcolor: "primary.dark",
									fontSize: 13,
								}}
							>
								АД
							</Avatar>
							<Typography
								variant="body2"
								sx={{ display: { xs: "none", sm: "block" } }}
							>
								Адміністратор
							</Typography>
						</Stack>
					</Toolbar>
				</AppBar>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflow: "auto" }}
				>
					<Outlet /> {/* Тут автоматично монтуються /vehicles, /users тощо */}
				</Box>
			</Box>
		</Box>
	);
};
