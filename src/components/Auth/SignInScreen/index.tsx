import React, { useContext } from "react";
import {
	FormControl,
	InputLabel,
	FilledInput,
	InputAdornment,
	TextField,
	IconButton,
	Box,
	Button,
	Grid,
	Container,
	CssBaseline,
	Paper,
	Typography,
	Avatar,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	PhoneLockedOutlined,
} from "@mui/icons-material";
import { UIContext } from "../../Unknown/UIContext";
import firebase from "firebase";

interface State {
	password: string;
	email: string;
	showPassword: boolean;
	emailNotValid: boolean;
	passwordNotValid: boolean;
}

const SignInScreen: React.FC = () => {
	const { setAlert } = useContext(UIContext);
	/* eslint-disable */
	const emailRegEx =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	// Minimum six characters, at least one big letter:
	const passwordRegEx = /^[A-Za-z]\w{6,18}$/;
	/* eslint-enable */

	const [values, setValues] = React.useState<State>({
		password: "",
		email: "",
		showPassword: false,
		emailNotValid: false,
		passwordNotValid: false,
	});

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			console.log(event.target.value, prop);

			setValues({
				...values,
				[prop]: event.target.value,
			});

			console.log(values);
		};

	const handleInputOnBlur = (event: any) => {
		switch (event.target.id) {
			case "email":
				if (!event.target.value.match(emailRegEx)) {
					values.emailNotValid = true;
				} else {
					values.emailNotValid = false;
				}
				break;
			case "password":
				if (!event.target.value.match(passwordRegEx)) {
					console.log("not");
					values.passwordNotValid = true;
				} else {
					values.passwordNotValid = false;
				}
				break;
			default:
				break;
		}
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleSignIn = async () => {
		try {
			console.log(values);
			if (
				!values.emailNotValid &&
				!values.passwordNotValid &&
				values.email.length &&
				values.password.length
			) {
				let user = await firebase
					.auth()
					.createUserWithEmailAndPassword(
						values.email,
						values.password
					);
			}
		} catch (e) {
			console.log(e);
		}

		setAlert({
			show: true,
			severity: "info",
			message: "Sign in button was clicked.",
		});
	};

	return (
		<>
			<Grid
				item
				container
				component="main"
				sx={{ height: "100vh" }}
				xs={12}
			>
				<CssBaseline />
				<Grid
					item
					xs={6}
					sx={{
						backgroundImage: "url(./login_bg.jpg)",
						backgroundRepeat: "no-repeat",
						/* eslint-disable */
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						/* eslint-enable */
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid item xs={6} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 10,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							component="img"
							sx={{
								height: 40,
								width: 175,
								mb: 8,
							}}
							alt="The house from the offer."
							src="./logo.png"
						/>
						<Typography
							component="h1"
							variant="h4"
							fontWeight="bold"
						>
							Login
						</Typography>
						<Box
							component="form"
							noValidate
							sx={{ mt: 8, width: "50%" }}
						>
							<FormControl fullWidth sx={{ m: 1, my: 3 }}>
								<TextField
									error={values.emailNotValid}
									onBlur={(e: any) => handleInputOnBlur(e)}
									id="email"
									label="Email"
									defaultValue={values.email}
									onChange={handleChange("email")}
									variant="filled"
									fullWidth
								/>
							</FormControl>
							<FormControl
								fullWidth
								sx={{ m: 1, my: 3 }}
								variant="filled"
							>
								<TextField
									error={values.passwordNotValid}
									onBlur={(e: any) => handleInputOnBlur(e)}
									label="password"
									id="password"
									type={
										values.showPassword
											? "text"
											: "password"
									}
									defaultValue={values.password}
									onChange={handleChange("password")}
									variant="filled"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={
														handleClickShowPassword
													}
													onMouseDown={
														handleMouseDownPassword
													}
													edge="end"
												>
													{
														/* eslint-disable */
														values.showPassword ? (
															<VisibilityOff />
														) : (
															<Visibility />
														)
														/* eslint-enable */
													}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</FormControl>
							<FormControl fullWidth sx={{ m: 1, my: 3 }}>
								<Button
									variant="contained"
									onClick={handleSignIn}
									style={{
										backgroundColor: "#e45257",
									}}
								>
									<Box sx={{ py: 1 }}>Login</Box>
								</Button>
							</FormControl>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default SignInScreen;
