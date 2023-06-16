import { ThemeProvider } from '@emotion/react'
import { Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme();

const UpdatePassword = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const handleClose = async () => {
        if (password === cpassword) {

            const url = `http://localhost:6001/api/updatePassword/${id}`

            let response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Allow-Control-Cross-Origin": '*',

                },
                body: JSON.stringify({

                    password: password

                }),
            });

            if (response.status === 200) {
                navigate("/");
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Grid>
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        type='password'
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cpassword"
                        type='password'
                        label="Confirm Password"
                        name="cpassword"
                        autoComplete="cpassword"
                        autoFocus
                        onChange={(e) => setCPassword(e.target.value)}
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

export default UpdatePassword