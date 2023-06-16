import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import GetEmail from "./components/GetEmail";
import UpdatePassword from "./components/UpdatePassword";
import VerifyOTP from "./components/VerifyOTP";
import HomeTable from "./components/HomeTable";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/getEmail" element={<GetEmail />} />
      <Route path="/api/updatePassword/:id" element={<UpdatePassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/home" element={<HomeTable />} />
    </Routes>
  );
}

export default App;
