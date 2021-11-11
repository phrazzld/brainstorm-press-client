import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStore } from "../store/zstore";
import { createUser } from "../utils/api";
import { Colors } from "../utils/Colors";
import { isValidEmail } from "../utils/validation";

const theme = createTheme();

export const SignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [invalidUsername, setInvalidUsername] = useState<string>("");
    const [invalidEmail, setInvalidEmail] = useState<string>("");
    const [invalidPassword, setInvalidPassword] = useState<string>("");
    const [formError, setFormError] = useState<string>("");

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);

    const clearErrors = (): void => {
        setInvalidUsername("");
        setInvalidEmail("");
        setInvalidPassword("");
        setFormError("");
    };

    const handleUsernameChange = (e: any): void => {
        setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/gi, ""));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        if (isValidEmail(email)) {
            const body = {
                username: username,
                email: email,
                password: password,
                blog: `${username}'s Blog`,
            };
            const response = await createUser(body);
            if ("error" in response) {
                switch (response.error) {
                    case "Invalid username.":
                        setInvalidUsername(
                            "Invalid username. Usernames may only contain letters, numbers, hyphens, and underscores."
                        );
                        break;
                    case "Username taken.":
                        setInvalidUsername("Username not available.");
                        break;
                    case "Email taken.":
                        setInvalidEmail("Email already in use. Please log in.");
                        break;
                    default:
                        setFormError(response.error);
                }
            } else {
                clearErrors();
                setUser(response.user);
                setAccessToken(response.accessToken);
            }
        } else {
            setInvalidEmail("Please enter a valid email address.");
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    error={!!invalidUsername || !!formError}
                                    helperText={invalidUsername}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!invalidEmail || !!formError}
                                    helperText={invalidEmail}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    error={!!invalidPassword || !!formError}
                                    helperText={invalidPassword}
                                    inputProps={{ "data-testid": "password" }}
                                />
                            </Grid>
                            {formError && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        style={{ color: Colors.errorRed }}
                                        gutterBottom
                                    >
                                        {formError}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
