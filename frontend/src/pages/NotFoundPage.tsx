import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<Box
			sx={{
				display: "grid",
				minHeight: "min(65vh, 560px)",
				placeItems: "center",
				textAlign: "center",
			}}
		>
			<Stack
				spacing={2}
				sx={{
					alignItems: "center",
				}}
			>
				<Typography
					variant="h1"
					color="primary.main"
					sx={{
						fontSize: { xs: "5rem", sm: "7rem" },
						fontWeight: 800,
						lineHeight: 1,
					}}
				>
					404
				</Typography>
				<Typography variant="h5">Not found page</Typography>
				<Typography
					variant="body1"
					color="text.secondary"
				>
					The address may have been entered incorrectly, or the page may have
					been moved.
				</Typography>
				<Button
					component={Link}
					to="/users"
					variant="contained"
					sx={{ mt: 1 }}
				>
					To the list of users
				</Button>
			</Stack>
		</Box>
	);
}
