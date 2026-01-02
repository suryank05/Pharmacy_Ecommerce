import Login from "./Authenticate/login";
import SignupPharmacy from "./Authenticate/SignupPharmacy";
import SignupUser from "./Authenticate/SignupUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import './App.css'
import PharmacyList from "./Components/PharmacyList";
import RegisterPharmacy from "./Components/RegisterPharmacy";
import AddMedicine from "./Components/AddMedicine";
import PharmacyDashboard from "./Components/PharmacyDashboard";
import PharmacyLogin from "./Components/PharmacyLogin";
import UserTypeSelector from "./Components/UserTypeSelector";
import SimplePharmacyDashboard from "./Components/SimplePharmacyDashboard";
import ResetPassword from "./Components/ResetPassword";
import OrderHistory from "./Components/OrderHistory";
import Checkout from "./Components/Checkout";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/signup" element={<UserTypeSelector />} />
        <Route path="/user/signup" element={<SignupUser />} />
        <Route path="/pharmacy/register" element={<RegisterPharmacy />} />
        <Route path="/pharmacy/login" element={<PharmacyLogin />} />
        <Route path="/pharmacy/dashboard" element={<SimplePharmacyDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pharmacies" element={<PharmacyList ></PharmacyList>} ></Route>
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/pharmacy/:pharmacyId" element={<PharmacyDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
  );
}

export default App
