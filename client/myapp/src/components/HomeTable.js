import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
    TextField,
    Modal,
    Box,
    Typography,
} from "@mui/material";

const HomeTable = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false)
    const [myid, setId] = useState("")
    const [apiData, setApiData] = useState([]);
    console.log(myid);
    const getAllCustomers = async () => {
        try {
            const response = await fetch('http://localhost:6001/api/getAllCustomers');
            const data = await response.json();
            // Add an `id` field to each row using the index
            const rows = data.users.map((row, index) => ({ id: index + 1, ...row }));
            setApiData(rows);
            console.log(data); // This will log the data to the console
        } catch (error) {
            console.error(error);
        }
    }

    const role = localStorage.getItem("role");

    useEffect(() => {
        // if (!localStorage.getItem("token")) { navigate("/") }
        getAllCustomers()
    }, [])

    const handleDelete = async (id) => {
        console.log("FR ID", id);
        try {
            const response = await fetch(`http://localhost:6001/api/deleteCustomer/${id}`, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',

                },
            });
            if (response.status === 200) {
                getAllCustomers()
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleEdit = async (id) => {
        setOpen(true)
        try {
            const response = await fetch(`http://localhost:6001/api/getCustomer/${id}`, {
                header: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Allow-Control-Cross-Origin": '*'
                },
            });
            const res = await response.json();
            if (response.status === 200) {
                setName(res.users.names)
                setEmail(res.users.email)
                setPhone(res.users.phoneNumber)
                setId(res.users._id)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateCustomer = async () => {
        console.log(myid);
        try {
            const response = await fetch(`http://localhost:6001/api/updateCustomer/${myid}`, {
                method: 'POST',
                body: ({
                    names: name,
                    email: email,
                    phone: parseInt(phone)
                }),
                header: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                getAllCustomers()
                onClose()
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onClose = () => {
        setOpen(false)
    }

    const MyModal = () => {
        return (
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Update Customer
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                        marginTop={2}
                    >
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={updateCustomer} variant="contained" color="primary">
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        );
    };

    return (
        <div>
            {role === "user" && <div>You have logged in as :</div>}
            {role === "admin" &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr.no</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {apiData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.names}
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.phoneNumber}</TableCell>
                                    <TableCell>  <Stack direction="row" spacing={2}>

                                        <Button variant="contained" color="success" onClick={() => handleEdit(row._id)}>
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(row._id)}>Delete</Button>
                                    </Stack></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <MyModal />
        </div>
    )
}

export default HomeTable;
