import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "react-bootstrap/Nav";
import VideoSnipp from "../assets/video.mp4";

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
         <div className="welcome-page">
            <div className="video-container">
               <h1>accelerate your learning</h1>
               <video autoPlay loop muted>
                  <source src={VideoSnipp} type="video/mp4" />
               </video>
            </div>
            <div className="welcome-page-text">
               <div className="intro-text-1">
                  <h4 className="h4">Create and Customize Your Flashcards</h4>
                  <p className="text-paragraph">
                     Whether it's vocabulary, math equations, historical events,
                     or scientific formulas, RapidCards777 lets you design
                     flashcards that reflect your curriculum or personal study
                     goals.
                  </p>
               </div>
               <div className="intro-text-2">
                  <h4 className="h4">Collaborative Learning</h4>
                  <p className="text-paragraph">
                     Expand your knowledge through collective efforts and
                     benefit from a diverse range of perspectives. Together, you
                     can achieve more!
                  </p>
               </div>
               <div className="intro-text-3">
                  <h4 className="h4">Sync across devices</h4>
                  <p className="text-paragraph">
                     Seamlessly access your flashcards anytime, anywhere.
                     Whether you're studying on your smartphone, tablet, or
                     computer, RapidCards777 syncs your progress across devices,
                     ensuring you can pick up right where you left off.
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Welcome;
