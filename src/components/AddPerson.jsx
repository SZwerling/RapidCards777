import { useAddUserMutation } from "../store";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import studyImg from "../assets/study.jpg"
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
         <Header>
            <div className="d-flex p-2 bd-highlight w-100 justify-content-center">
               <div className="rapid-cards">RAPID CARDS</div>
            </div>
         </Header>
         <div className="below-header container-fluid addPerson-container">
            <div className="study-img-container">
               <img className="study-img" src={studyImg} alt="people studying" />
            </div>
            <form className="row pb-5 add-person-form" onSubmit={handleAddUser}>
               <div className="form-group justify-space-evenly mb-2 mt-2">
                  <label htmlFor="name">
                     Name:
                     <input
                        className="form-control mb-2"
                        id="name"
                        placeholder="name"
                        autoFocus="autoFocus"
                        name="name"
                        onChange={handleChange}
                        value={inputs.name || ""}
                        type="text"
                     />
                  </label>
                  <div className="form-group justify-space-evenly mb-2 mt-2">
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
                     <button type="submit" className="btn btn-primary">submit</button>
                  </div>
               </div>
            </form>
         </div>
      </>
   );
}

export default AddPerson;
