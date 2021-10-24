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

const theme = createTheme();

export const SignUp = () => {
    const [usernameInputValue, setUsernameInputValue] = useState<string>("");
    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        const body = {
            username: usernameInputValue,
            email: emailInputValue,
            password: passwordInputValue,
            blog: `${usernameInputValue}'s Blog`,
        };
        const response = await createUser(body);
        setUser(response.user);
        setAccessToken(response.accessToken);
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
                                    value={usernameInputValue}
                                    onChange={(e) =>
                                        setUsernameInputValue(e.target.value)
                                    }
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
                                    value={emailInputValue}
                                    onChange={(e) =>
                                        setEmailInputValue(e.target.value)
                                    }
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
                                    value={passwordInputValue}
                                    onChange={(e) =>
                                        setPasswordInputValue(e.target.value)
                                    }
                                />
                            </Grid>
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
