import AddPerson from "./components/AddPerson";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { useState } from "react";



function App() {
   const [img, setImg] = useState('');
   return (
      <Routes>
         <Route index element={<Welcome />} />
         <Route path="welcome" element={<Welcome />} />
         <Route path="addperson" element={<AddPerson />} />
         <Route path="login" element={<Login />} />
         <Route path="password-reset" element={<ResetPassword />} />
         {/* private routes */}
         <Route path="home" element={<Home img={img} />} />
         <Route path="profile" element={<Profile img={img} setImg={setImg}/>} />
         <Route />
      </Routes>
   );
}

export default App;
