import {
	Chip,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { NavItemProps } from "../../../interfaces";

export const NavItem = ({ item }: NavItemProps) => {
	const location = useLocation();
	const isActive = location.pathname === item.path;
	const Icon = item.icon;

	return (
		<ListItem
			disablePadding
			sx={{ mb: 0.5, px: 1.5 }}
		>
			<ListItemButton
				component={RouterLink}
				to={item.path}
				selected={isActive}
				sx={{
					"borderRadius": 1.5,
					"py": 1,
					"px": 1.5,
					"color": isActive ? "#fff" : "text.secondary",
					"bgcolor": isActive ? "primary.main" : "transparent",
					"&:hover": {
						bgcolor: isActive ? "primary.dark" : "rgba(255, 255, 255, 0.04)",
					},
				}}
			>
				<ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
					<Icon fontSize="small" />
				</ListItemIcon>
				<ListItemText
					primary={item.title}
					slotProps={{
						primary: {
							sx: {
								fontSize: "0.875rem",
								fontWeight: isActive ? 600 : 500,
							},
						},
					}}
				/>
				{item.badge && (
					<Chip
						label={item.badge}
						size="small"
						color="error"
						sx={{ height: 20, fontSize: "0.7rem" }}
					/>
				)}
			</ListItemButton>
		</ListItem>
	);
};
