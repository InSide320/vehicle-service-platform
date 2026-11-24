import React from "react";

export interface NavItemProps {
	item: {
		title: string;
		path: string;
		icon: React.ElementType;
		badge?: string | number;
	};
}

export interface NavItemConfig {
	title: string;
	path: string;
	icon: React.ComponentType;
	badge?: number;
}

export interface NavGroupConfig {
	subheader: string;
	items: NavItemConfig[];
}
