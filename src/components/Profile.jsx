import React, { useState, useEffect, useCallback } from "react";
import {
   useEditUserMutation,
   useAddAvatarMutation,
   useLogoutUserMutation,
   useLogoutUserAllMutation,
   useDeleteAccountMutation,
} from "../store";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Header from "./Header";
import emptyAvatar from "../assets/empty-avatar.jpg";
import Modal from "react-bootstrap/Modal";
import studyImg from "../assets/study.jpg";

function Profile({ img, setImg }) {
   const navigate = useNavigate();
   const [editUser, { data, isLoading, isError, error }] =
      useEditUserMutation();
   const [addAvatar, {}] = useAddAvatarMutation();
   const [logout] = useLogoutUserMutation();
   const [logoutAll] = useLogoutUserAllMutation();
   const [deleteAccount] = useDeleteAccountMutation();

   const [inputs, setInputs] = useState("");
   const [file, setFile] = useState(null);
   //const [preview, setPreview] = useState();
   const [showModal, setShowModal] = useState(false);

   const location = useLocation();
   let id = location.state?._id;

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
   };

   const handleFileChange = (e) => {
      if (e.target.files) {
         setFile(e.target.files[0]);
      }
   };

   const fetchImage = useCallback(async () => {
      const res = await fetch(`http://localhost:3000/users/${id}/avatar`);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
   }, []);

   useEffect(() => {
      fetchImage();
   }, [fetchImage]);

   const handleSubmit = async (event) => {
      event.preventDefault(event);

      if (file?.size > 1000000) {
         return alert("image must be less then one megabyte");
      }

      // if (file) {
      //    setPreview(URL.createObjectURL(file));
      // }
      if (inputs) {
         editUser(inputs);
      }

      if (file) {
         addAvatar(file);
         id = id;
         setImg(URL.createObjectURL(file));
      }
      setInputs(
         (inputs.name = ""),
         (inputs.email = ""),
         (inputs.password = "")
      );
   };

   const handleThisDeviceLogout = () => {
      const result = logout();
      localStorage.removeItem("jwt");
      navigate("/welcome");
   };

   const handleAllDevicesLogout = () => {
      logoutAll();
      localStorage.removeItem("jwt");
      navigate("/welcome");
   };

   const handleDeleteAccount = () => {
      deleteAccount();
      localStorage.removeItem("jwt");
      navigate("/welcome");
   };

   const onImageError = (e) => {
      e.target.src = emptyAvatar;
   };

   return (
      <>
         <Header>
            <div className="container-fluid d-flex justify-content-between profile-header">
               <Navbar.Brand className="m-0">
                  <Link className="link" to="/home">
                     <img
                        src={img}
                        className="rounded-circle d-inline-block align-top avatar"
                        alt="Avatar"
                        onError={onImageError}
                     />
                  </Link>
               </Navbar.Brand>
               <Nav.Item className="profile-nav__item">
                  <Link className="link" to="/home">
                     Home
                  </Link>
               </Nav.Item>
               <Nav.Item className="profile-nav__item">
                  <DropdownButton
                     className="link"
                     id="dropdown-basic-button-2"
                     title="Logout"
                  >
                     <Dropdown.Item onClick={handleThisDeviceLogout}>
                        This Device
                     </Dropdown.Item>
                     <Dropdown.Item onClick={handleAllDevicesLogout}>
                        All Devices
                     </Dropdown.Item>
                  </DropdownButton>
               </Nav.Item>
               <Nav.Item className="profile-nav__item link">
                  <div onClick={() => setShowModal(!showModal)}>
                     Delete Account
                  </div>
               </Nav.Item>
            </div>
         </Header>

         <Modal show={showModal} fullscreen onHide={() => setShowModal(false)}>
            <Modal.Header className="delete-title">
               <Modal.Title>DELETE ACCOUNT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</p>
               <button
                  onClick={handleDeleteAccount}
                  className="delete-account-button"
               >
                  Yes, please delete my account.
               </button>
            </Modal.Body>
            <Modal.Footer>
               No, don't delete my account.
               <button
                  className="btn btn-primary"
                  onClick={() => {
                     setShowModal(false);
                  }}
               >
                  Close
               </button>
            </Modal.Footer>
         </Modal>

         <div className="below-header container-fluid addPerson-container">
            <div className="study-img-container">
               <img
                  className="study-img"
                  src={studyImg}
                  alt="people studying"
               />
            </div>
            <form
               onSubmit={handleSubmit}
               encType="multipart/form-data"
               className="row pb-5 add-person-form"
            >
               <div className="form-group justify-space-evenly mb-2">
                  <label htmlFor="avatar">
                     Upload Image
                     <input
                        className="form-control"
                        type="file"
                        name="avatar"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                     />
                  </label>

                  <div className="form-group justify-space-evenly mb-2">
                     <label htmlFor="name">
                        Update Name
                        <input
                           id="name"
                           type="name"
                           className="form-control"
                           onChange={handleChange}
                           name="name"
                           value={inputs.name || ""}
                        />
                     </label>
                  </div>
                  <div className="form-group justify-space-evenly mb-2">
                     <label htmlFor="email">
                        Update Email
                        <input
                           type="email"
                           id="email"
                           className="form-control"
                           onChange={handleChange}
                           name="email"
                           value={inputs.email || ""}
                        />
                     </label>
                  </div>
                  <div className="form-group justify-space-evenly mb-2">
                     <label htmlFor="password">
                        Update Password
                        <input
                           type="password"
                           id="password"
                           className="form-control"
                           onChange={handleChange}
                           name="password"
                           value={inputs.password || ""}
                        />
                     </label>
                  </div>
                  <div>
                     <button className="btn btn-primary" type="submit">
                        Submit
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}

export default Profile;
