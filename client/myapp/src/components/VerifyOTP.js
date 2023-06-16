import { ThemeProvider } from '@emotion/react'
import { Button, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const VerifyOTP = () => {

  const navigate = useNavigate();
  const [otp, setOTP] = useState("")

  const handleClose = async () => {
    const token = localStorage.getItem('token')
    const url = 'http://localhost:6001/api/verifyotp'

    const response = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Allow-Control-Cross-Origin": '*',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        otp: otp
      }),
    });

    if (response.status === 200) {
      navigate("/home");
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid>
          <Typography component="h1" variant="h5">
            OTP Verification
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            autoComplete="otp"
            autoFocus
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button
            type="button"
            onClick={handleClose}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default VerifyOTP;