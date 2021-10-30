import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { resetPassword } from "../utils/api";
import { Colors } from "../utils/Colors";

const theme = createTheme();

type ResetPasswordParams = {
    userId: string;
    token: string;
};

export const ResetPassword = () => {
    const { userId, token } = useParams<ResetPasswordParams>();
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>(
        ""
    );

    const [redirect, setRedirect] = useState<string>("");
    const [formError, setFormError] = useState<string>("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setFormError("Passwords do not match.");
        } else {
            const body = {
                password: password,
            };
            await resetPassword(body, userId, token);
            setFormError("");
            setRedirect("/login");
        }
    };

    if (redirect) {
        return <Redirect to={redirect} />;
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
                        Choose a new password
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
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!formError}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirmation"
                            label="Confirm Password"
                            type="password"
                            id="password-confirmation"
                            value={passwordConfirmation}
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
                            error={!!formError}
                        />

                        {formError && (
                            <Typography
                                variant="subtitle1"
                                component="div"
                                style={{ color: Colors.errorRed }}
                                gutterBottom
                            >
                                {formError}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
