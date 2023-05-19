import React, { useState, useEffect } from "react";
import { useLoginUserMutation, useRequestPasswordMutation } from "../store";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";

const Login = () => {
   const [inputs, setInputs] = useState("");
   const [login, { data, isLoading, isError, error }] = useLoginUserMutation();
   const [requestPassword] = useRequestPasswordMutation();
   const [email, setEmail] = useState("");
   const navigate = useNavigate();
   const [show, setShow] = useState(false);

   const handleClose = () => {
      setShow(false);
      setEmail("");
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
         console.log(error);
      }
   };

   

   return (
      <>
         <Header>
            <div className="navbar-brand">RAPID CARDS</div>
         </Header>
         <div className="below-header container-fluid">
            <form className="row pb-3" onSubmit={handleAddUser}>
               <div className="form-group justify-space-evenly mb-2">
                  <label htmlFor="emailInput">
                     Email
                     <input
                        type="email"
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
                  <Modal centered show={show} onHide={handleClose}>
                     <Modal.Header closeButton>
                        <Modal.Title>
                           enter email to be sent a temporary password
                        </Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
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
                     </Modal.Body>
                     <Modal.Footer></Modal.Footer>
                  </Modal>
               </div>
            </form>
         </div>
      </>
   );
};

export default Login;
