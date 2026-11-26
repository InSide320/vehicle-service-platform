import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import React, { StrictMode } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { vehicleServicePlatform } from "./theme/vehicleServicePlatform";
import { AuthProvider } from "./pages/auth/AuthContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider theme={vehicleServicePlatform}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
