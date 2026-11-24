import React from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "./pages/users/UsersPage";
import { VehiclesPage } from "./pages/vehicles/VehiclesPage";
import { NewUserPage } from "./pages/users/NewUserPage";

export default function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route
					index
					element={
						<Navigate
							to="/users"
							replace
						/>
					}
				/>
				<Route
					path="users"
					element={<UsersPage />}
				/>
				<Route
					path="vehicles"
					element={<VehiclesPage />}
				/>
				<Route
					path="notifications"
					element={null}
				/>
				<Route
					path="users/new"
					element={<NewUserPage />}
				/>
				<Route
					path="vehicles/new"
					element={null}
				/>
			</Route>
		</Routes>
	);
}
