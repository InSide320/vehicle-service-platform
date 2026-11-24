import { NavGroupConfig } from "../interfaces";
import {
	AddCircleOutlined,
	DirectionsCarOutlined,
	NotificationsNoneOutlined,
	PeopleOutlined,
	PersonAddOutlined,
} from "@mui/icons-material";

export const SIDEBAR_NAV: NavGroupConfig[] = [
	{
		subheader: "НАВІГАЦІЯ",
		items: [
			{ title: "Користувачі", path: "/users", icon: PeopleOutlined },
			{
				title: "Транспортні засоби",
				path: "/vehicles",
				icon: DirectionsCarOutlined,
			},

		],
	},
	{
		subheader: "ШВИДКІ ДІЇ",
		items: [
			{
				title: "Додати користувача",
				path: "/users/new",
				icon: PersonAddOutlined,
			},
			{ title: "Додати ТЗ", path: "/vehicles/new", icon: AddCircleOutlined },
		],
	},
];
