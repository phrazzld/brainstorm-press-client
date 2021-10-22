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
import { loginUser } from "../utils/api";

const theme = createTheme();

export const LogIn = () => {
    const [nameInputValue, setNameInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("");

    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setAccessToken = useStore((state) => state.setAccessToken);
    const setLndToken = useStore((state) => state.setLndToken);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        const body = {
            name: nameInputValue,
            password: passwordInputValue,
        };
        const response = await loginUser(body);
        setUser(response.user);
        setAccessToken(response.accessToken);
        if (response.user.node) {
            setLndToken(response.user.node.token);
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
                        Log in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={nameInputValue}
                            onChange={(e) => setNameInputValue(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={passwordInputValue}
                            onChange={(e) =>
                                setPasswordInputValue(e.target.value)
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};