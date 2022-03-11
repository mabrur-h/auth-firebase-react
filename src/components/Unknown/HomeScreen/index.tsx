import {
	Box,
	Typography,
	Toolbar,
	AppBar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Avatar,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import React from "react";
import { useUser } from "reactfire";
import firebase from "firebase";

const HomeScreen: React.FC = () => {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const { data: user } = useUser();

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = async () => {
		setAnchorElUser(null);
	};

	const generateAvatarName = (name: any) => {
		return name.match(/\b(\w)/g).join("");
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="static"
				style={{
					backgroundColor: "#e45257",
				}}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Voypost
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open Menu">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar>
									{generateAvatarName(!!user && user.email)}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								key="logout"
								onClick={() => firebase.auth().signOut()}
							>
								<Typography textAlign="center">
									Log Out
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default HomeScreen;
