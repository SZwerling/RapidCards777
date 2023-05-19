import GetProfile from "./components/GetProfile";
import AddPerson from "./components/AddPerson";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
   return (
      <Routes>
         {/* <Route path="/" element={<Layout />} /> */}
         {/* public routes */}
         <Route index element={<Welcome />} />
         <Route path="welcome" element={<Welcome />} />
         <Route path="addperson" element={<AddPerson />} />
         <Route path="login" element={<Login />} />
         <Route path="password-reset" element={<ResetPassword />} />
         {/* private routes */}
         <Route path="home" element={<Home />} />
         <Route path="profile" element={<Profile />} />
         <Route />
      </Routes>
   );
}

export default App;
