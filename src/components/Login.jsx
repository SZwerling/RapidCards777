import React from "react";
import { useLoginUserMutation } from "../store";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
   const [inputs, setInputs] = useState("");
   const [login, { data, isLoading, isError, error }] = useLoginUserMutation();
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
   };

   const handleAddUser = async (e) => {
      e.preventDefault();
      try {
         const { user, token } = await login(inputs).unwrap();
         const { name, email, _id } = user;

         localStorage.setItem("jwt", token);
         dispatch(setCredentials({ name, email, _id, token }));
         navigate("/home");
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {}, []);

   return (
      <>
         <Header>SOME STUFF IN THE HEADER</Header>
         <div className="below-header container-fluid">
            <form
               className="row pb-5"
               onSubmit={handleAddUser}
            >
               <div className="form-group justify-space-evenly mb-2">
                  <label htmlFor="emailInput">
                     Email
                     <input
                        className="form-control"
                        id="emailInput"
                        placeholder="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                     />
                  </label>
               </div>
               <div className="form-group justify-space-evenly mb-2">
                  <label htmlFor="passwordInput">
                     Password
                     <input
                        className="form-control"
                        id="passwordInput"
                        placeholder="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                     />
                  </label>
               </div>
               <div>
                  <button className="btn btn-primary">submit</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default Login;
