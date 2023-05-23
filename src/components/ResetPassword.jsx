import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../store";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function ResetPassword() {
  const navigate = useNavigate();
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [sendUpdate, { data, isLoading, isError, error }] =
      useResetPasswordMutation();
  //  const location = useLocation();

  //  const parts = location.pathname.split("/");
  //  const userId = parts[2];

   const handleSubmit = async (e) => {
      e.preventDefault();

      const updates = {
        //  id: userId,
         tempPassword: oldPassword,
         password: newPassword,
      };
      const result = await sendUpdate(updates);
      if (result.error) {
         console.log("error");
      }
      navigate("/login");
   };

   return (
      <>
         <Header>RAPID CARDS</Header>
         <div className="below-header container-fluid">
            <form onSubmit={handleSubmit} className="row pb-5">
               <div className="form-group justify-space-evenly mb-2">
                  <label className="form-label" htmlFor="old-password">
                     temp password
                     <input
                     id="old-password"
                     className="form-control"
                     value={oldPassword}
                     type="text"
                     onChange={(e) => setOldPassword(e.target.value)}
                  />
                  </label>
               </div>
               <div className="form-group justify-space-evenly mb-2">
                  <label className="form-label" htmlFor="new-password">
                     new password
                     <input
                     id="new-password"
                     className="form-control"
                     value={newPassword}
                     type="text"
                     onChange={(e) => setNewPassword(e.target.value)}
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
}

export default ResetPassword;
