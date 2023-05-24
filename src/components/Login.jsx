import React, { useState, useEffect } from "react";
import { useLoginUserMutation, useRequestPasswordMutation } from "../store";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal1 from "./Modal1";
import Header from "./Header";
import studyImg from "../assets/study.jpg";

const Login = () => {
   const [inputs, setInputs] = useState("");
   const [login, { data, isLoading, isError, error }] = useLoginUserMutation();
   const [requestPassword] = useRequestPasswordMutation();
   const [email, setEmail] = useState("");
   const navigate = useNavigate();
   const [show, setShow] = useState(false);
   const [show2, setShow2] = useState(false);

   const handleClose = () => {
      setShow(false);
      setEmail("");
   };

   const handleClose2 = () => {
      setShow2(false);
   };

   const handleShow = () => setShow(true);

   const handleEmailSubmit = (e) => {
      e.preventDefault();
      if (email) {
         requestPassword(email);
         handleClose();
         navigate("/password-reset");
      } else {
         handleClose();
      }
   };

   const form = (
      <Form onSubmit={handleEmailSubmit}>
         <div className="form-group">
            <label htmlFor="email">
               <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
               />
            </label>
         </div>
      </Form>
   );

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
         const { name, email, _id, avatar } = user;

         localStorage.setItem("jwt", token);
         dispatch(setCredentials({ name, email, _id, avatar, token }));
         navigate("/home");
      } catch (error) {
         setShow2(true);
      }
   };

   return (
      <>
         <Header>
            <div className="d-flex p-2 bd-highlight w-100 justify-content-center">
               <div className="rapid-cards">RAPID CARDS</div>
            </div>
         </Header>
         <div className="below-header container-fluid addPerson-container">
            <div className="study-img-container">
               <img
                  className="study-img"
                  src={studyImg}
                  alt="people studying"
               />
            </div>
            <form className="row pb-5 add-person-form" onSubmit={handleAddUser}>
               <div className="form-group justify-space-evenly mb-2 mt-2"> 
                  <label htmlFor="emailInput">
                     Email
                     <input
                        autoFocus="autoFocus"
                        type="email"
                        className="form-control mb-2"
                        id="emailInput"
                        placeholder="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                     />
                  </label>
                  <div className="form-group justify-space-evenly mb-2 mt-2">
                     <label htmlFor="passwordInput">
                        Password
                        <input
                           type="password"
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
                     <button type="submit" className="btn btn-primary">
                        submit
                     </button>
                  </div>
                  <div className="mt-3">
                     <a style={{ fontSize: "1rem" }} onClick={handleShow}>
                        forgot password
                     </a>
                     <Modal1
                        body={<div>No such user found.</div>}
                        title={<h1>Whoops!</h1>}
                        show={show2}
                        handleClose={handleClose2}
                     />
                     <Modal1
                        body={
                           <div>
                              <h6>You may reset your password here.</h6>
                              {form}
                           </div>
                        }
                        title={<h2>What's My Password?</h2>}
                        show={show}
                        handleClose={handleClose}
                     />
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};

export default Login;
