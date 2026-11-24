import {
	Box,
	Divider,
	Drawer,
	List,
	ListSubheader,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { NavItem } from "./NavItem";
import { NavItemProps } from "../../../interfaces";
import { SIDEBAR_NAV } from "../../../navigation/navConfig";
import HubIcon from "@mui/icons-material/Hub";

const DRAWER_WIDTH = 260;

export const Sidebar = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				"width": DRAWER_WIDTH,
				"flexShrink": 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
					bgcolor: "background.paper",
					borderRight: "1px solid",
					borderColor: "divider",
					display: "flex",
					flexDirection: "column",
				},
			}}
		>
			{/* Header Section */}
			<Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
				<HubIcon
					color="primary"
					sx={{ fontSize: 28 }}
				/>{" "}
				<Typography
					sx={{
						fontWeight: 700,
						color: "text.primary",
						fontSize: "1.25rem",
						letterSpacing: "-0.02em",
						component: "span",
					}}
					variant="h6"
				>
					FleetMQ
				</Typography>
			</Box>

			{/* 2. Navigation Section */}
			<Box sx={{ flexGrow: 1, overflowY: "auto", py: 1 }}>
				{SIDEBAR_NAV.map((group) => (
					<List
						key={group.subheader}
						subheader={
							<ListSubheader
								disableSticky
								sx={{
									bgcolor: "transparent",
									color: "text.disabled",
									fontSize: "0.7rem",
									fontWeight: 700,
									letterSpacing: "0.08em",
									lineHeight: "32px",
									px: 3,
								}}
							>
								{group.subheader}
							</ListSubheader>
						}
					>
						{group.items.map((item: NavItemProps["item"]) => (
							<NavItem
								key={item.path}
								item={item}
							/>
						))}
					</List>
				))}
			</Box>

			<Divider />

			{/* 3. Footer Section */}
			<Box sx={{ p: 2 }}>
				<Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
					<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main", boxShadow: "0 0 10px rgba(16,185,129,.6)" }} />
					<Typography variant="caption">RabbitMQ: Підключено</Typography>
				</Stack>
			</Box>
		</Drawer>
	);
};
