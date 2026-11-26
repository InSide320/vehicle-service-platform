import { NavGroupConfig } from "../interfaces";
import {
	AddCircleOutlined,
	DirectionsCarOutlined,
	PeopleOutlined,
	PersonAddOutlined,
} from "@mui/icons-material";

export const SIDEBAR_NAV: NavGroupConfig[] = [
	{
		subheader: "NAVIGATION",
		items: [
			{ title: "Users", path: "/users", icon: PeopleOutlined },
			{
				title: "Vehicles",
				path: "/vehicles",
				icon: DirectionsCarOutlined,
			},
		],
	},
	{
		subheader: "FAST ACTIONS",
		items: [
			{
				title: "Add User",
				path: "/users/new",
				icon: PersonAddOutlined,
			},
			{ title: "Add Vehicle", path: "/vehicles/new", icon: AddCircleOutlined },
		],
	},
];
