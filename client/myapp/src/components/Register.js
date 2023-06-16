import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Agrawal Tapan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {

    const [names, setNames] = useState("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_Password] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const[role,setRole]=useState("")

    const RegisterHandler = async () => {
        const url = 'http://localhost:6001/api/register'

        let response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Allow-Control-Cross-Origin": '*'
            },
            body: JSON.stringify({
                names: names,
                email: email,
                password: password,
                confirmPassword: confirm_password,
                phoneNumber: phoneNumber,
                role:role
            }),
        });

        const res = await response.json();
if(res.message === "User Created Woooooooooooooo"){

}
console.log(res);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        console.log('hello');
        RegisterHandler()
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={(e) => setNames(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="role"
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone No."
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dob"
                                    // label="abc"
                                    type='date'
                                    name="dob"
                                    autoComplete="dob"

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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirmPassword"
                                    onChange={(e) => setConfirm_Password(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    id="country"
                                    label="Country"
                                    name="country"
                                    autoComplete="country">
                                    <MenuItem value="USA">USA</MenuItem>
                                    <MenuItem value="india">India</MenuItem>
                                    <MenuItem value="Japan">Japan</MenuItem>

                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={5}
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="country">
                                </TextField>
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
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}