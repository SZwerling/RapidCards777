import { useAddUserMutation } from "../store";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function AddPerson() {
   const [inputs, setInputs] = useState("");
   const [addProfile, { data, isLoading, isError, error }] =
      useAddUserMutation();
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
   };

   const handleAddUser = async (e) => {
      e.preventDefault();
      //addUser(inputs)
      try {
         const { user, token } = await addProfile(inputs).unwrap();
         const { name, email, _id } = user;
         console.log(name, email, _id, token);
         localStorage.setItem("jwt", token);
         dispatch(setCredentials({ name, email, _id, token }));
         //reset inputs
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
            <form className="row pb-5" onSubmit={handleAddUser}>
               <div className="form-group justify-space-evenly mb-2">
                  <label>
                     Name:
                     <input
                        className="form-control"
                        id="nameInput"
                        placeholder="name"
                        name="name"
                        onChange={handleChange}
                        value={inputs.name || ""}
                        type="text"
                     />
                  </label>
                  <div className="form-group justify-space-evenly mb-2">
                     <label>
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
                     <label>
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
               </div>
            </form>
         </div>
      </>
   );
}

export default AddPerson;
