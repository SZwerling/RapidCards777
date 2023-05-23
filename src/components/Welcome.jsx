import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "react-bootstrap/Nav";
import VideoSnipp from "../assets/video.mp4"

const Welcome = () => {
   return (
      <>
         <Header>
          <div className="container-fluid d-flex justify-content-around">
            <Nav.Item>
               <div className="rapid-cards">RAPID CARDS</div>
            </Nav.Item>
            <Nav.Item>
               <Link className="welcome-link" to="/addperson">
                  Sign Up
               </Link>
            </Nav.Item>

            <Nav.Item>
               <Link className="welcome-link" to="/login">
                  Log In
               </Link>
            </Nav.Item>
            </div>
         </Header>
         <div className="below-header container-fluid">
            <div className="video-container">
               <video  autoPlay loop muted >
                  <source src={VideoSnipp} type="video/mp4"/>
               </video>
            </div>
         </div>
      </>
   );
};

export default Welcome;
