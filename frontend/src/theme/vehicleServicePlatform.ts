import { createTheme, alpha } from "@mui/material/styles";

// Токени дизайн-системи Obsidian Telemetry
const COLORS = {
	background: "#0a0e18", // surface-container-lowest
	paper: "#171b26", // surface-container-low / default card
	paperElevated: "#1f2433", // surface-container
	border: "rgba(255, 255, 255, 0.08)",
	borderFocus: "#3b82f6",

	// Акценти
	primary: "#3b82f6", // Синій корпоративний
	primaryHover: "#2563eb",
	secondary: "#10b981", // Зелений (MQ Active / Доставлено / Успіх)
	warning: "#f59e0b", // Помаранчевий (ТО, попередження)
	error: "#ef4444", // Червоний (DLQ, Штрафи, помилки)
	info: "#38bdf8",

	// Текст
	textPrimary: "#f1f5f9",
	textSecondary: "#94a3b8",
	textDisabled: "#475569",
};

export const vehicleServicePlatform = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: COLORS.primary,
			light: "#60a5fa",
			dark: COLORS.primaryHover,
			contrastText: "#ffffff",
		},
		secondary: {
			main: COLORS.secondary,
			light: "#34d399",
			dark: "#059669",
			contrastText: "#ffffff",
		},
		error: {
			main: COLORS.error,
			contrastText: "#ffffff",
		},
		warning: {
			main: COLORS.warning,
			contrastText: "#ffffff",
		},
		info: {
			main: COLORS.info,
			contrastText: "#ffffff",
		},
		success: {
			main: COLORS.secondary,
			contrastText: "#ffffff",
		},
		background: {
			default: COLORS.background,
			paper: COLORS.paper,
		},
		text: {
			primary: COLORS.textPrimary,
			secondary: COLORS.textSecondary,
			disabled: COLORS.textDisabled,
		},
		divider: COLORS.border,
		action: {
			hover: "rgba(255, 255, 255, 0.04)",
			selected: alpha(COLORS.primary, 0.16),
			disabledBackground: "rgba(255, 255, 255, 0.06)",
			disabled: COLORS.textDisabled,
		},
	},

	shape: {
		borderRadius: 8, // Єдиний радіус заокруглення
	},

	typography: {
		fontFamily:
			'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		h5: {
			fontWeight: 700,
			letterSpacing: "-0.02em",
			color: COLORS.textPrimary,
		},
		h6: {
			fontWeight: 600,
			letterSpacing: "-0.01em",
			color: COLORS.textPrimary,
		},
		subtitle1: {
			fontWeight: 500,
			color: COLORS.textPrimary,
		},
		subtitle2: {
			fontWeight: 500,
			color: COLORS.textSecondary,
		},
		body1: {
			fontSize: "0.9375rem", // 15px
			color: COLORS.textPrimary,
		},
		body2: {
			fontSize: "0.8125rem", // 13px
			color: COLORS.textSecondary,
		},
		button: {
			textTransform: "none",
			fontWeight: 600,
			fontSize: "0.875rem",
		},
		caption: {
			fontSize: "0.75rem",
			color: COLORS.textSecondary,
		},
	},

	components: {
		// Базові контейнери та картки
		MuiPaper: {
			defaultProps: {
				variant: "outlined",
				elevation: 0,
			},
			styleOverrides: {
				root: {
					backgroundColor: COLORS.paper,
					borderColor: COLORS.border,
					backgroundImage: "none",
					borderRadius: 10,
				},
			},
		},
		MuiCard: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					backgroundColor: COLORS.paper,
					borderColor: COLORS.border,
					borderRadius: 10,
				},
			},
		},

		// Сайдбар (Drawer)
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: COLORS.paper,
					borderRight: `1px solid ${COLORS.border}`,
				},
			},
		},

		// Верхня панель (AppBar)
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				color: "transparent",
			},
			styleOverrides: {
				root: {
					backgroundColor: alpha(COLORS.background, 0.8),
					backdropFilter: "blur(12px)",
					borderBottom: `1px solid ${COLORS.border}`,
				},
			},
		},

		// Кнопки
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: "8px 18px",
					transition: "all 0.2s ease-in-out",
				},
				colorPrimary: {
					"backgroundColor": COLORS.primary,
					"&:hover": {
						backgroundColor: COLORS.primaryHover,
						boxShadow: `0 0 16px ${alpha(COLORS.primary, 0.4)}`,
					},
				},
				outlined: {
					"borderColor": COLORS.border,
					"color": COLORS.textPrimary,
					"&:hover": {
						borderColor: "rgba(255, 255, 255, 0.24)",
						backgroundColor: "rgba(255, 255, 255, 0.04)",
					},
				},
			},
		},

		// Поля вводу (Inputs & Selects)
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"backgroundColor": alpha(COLORS.background, 0.6),
					"borderRadius": 8,
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: COLORS.border,
						transition: "border-color 0.2s ease",
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: "rgba(255, 255, 255, 0.2)",
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: COLORS.primary,
						borderWidth: "1.5px",
					},
				},
				input: {
					fontSize: "0.875rem",
					padding: "11px 14px",
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					"fontSize": "0.875rem",
					"color": COLORS.textSecondary,
					"&.Mui-focused": {
						color: COLORS.primary,
					},
				},
			},
		},

		// Модальні вікна (Dialog)
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: COLORS.paper,
					border: `1px solid ${COLORS.border}`,
					borderRadius: 12,
					backgroundImage: "none",
					boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.7)",
				},
			},
		},
		MuiDialogTitle: {
			styleOverrides: {
				root: {
					padding: "20px 24px",
					fontSize: "1.125rem",
					fontWeight: 600,
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: "20px 24px",
					borderColor: COLORS.border,
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					padding: "16px 24px",
					borderTop: `1px solid ${COLORS.border}`,
				},
			},
		},

		// Чіпи статусів (Chip)
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					fontWeight: 600,
					fontSize: "0.75rem",
					height: 26,
				},
				colorDefault: {
					backgroundColor: "rgba(255, 255, 255, 0.06)",
					color: COLORS.textSecondary,
				},
			},
		},

		// Перемикачі (Switch)
		MuiSwitch: {
			styleOverrides: {
				root: {
					width: 44,
					height: 24,
					padding: 0,
				},
				switchBase: {
					"padding": 2,
					"&.Mui-checked": {
						"transform": "translateX(20px)",
						"color": "#fff",
						"& + .MuiSwitch-track": {
							backgroundColor: COLORS.secondary,
							opacity: 1,
						},
					},
				},
				thumb: {
					width: 20,
					height: 20,
				},
				track: {
					borderRadius: 12,
					backgroundColor: "rgba(255, 255, 255, 0.15)",
					opacity: 1,
				},
			},
		},

		// Таблиці та списки
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: COLORS.border,
					padding: "14px 18px",
					fontSize: "0.875rem",
				},
				head: {
					backgroundColor: alpha(COLORS.background, 0.4),
					color: COLORS.textSecondary,
					fontWeight: 600,
					textTransform: "uppercase",
					fontSize: "0.75rem",
					letterSpacing: "0.05em",
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: "rgba(255, 255, 255, 0.02) !important",
					},
				},
			},
		},
	},
});
