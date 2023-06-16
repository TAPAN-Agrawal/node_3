import { ThemeProvider } from '@emotion/react';
import { Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


const GetEmail = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleClose = async () => {
        const url = 'http://localhost:6001/api/forgotPassword'

        let response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Allow-Control-Cross-Origin": '*',
            },
            body: JSON.stringify({
                email: email
            }),
        });

        if (response.status === 200) {
            navigate("/");
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid>
                    <Typography component="h1" variant="h5">
                        Get Link
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="button"
                        onClick={handleClose}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Get Link
                    </Button>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default GetEmail