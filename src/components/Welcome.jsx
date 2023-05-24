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
            <div className="intro-text-1">
               <p className="text-paragraph">
                  Effortlessly create your own flashcards, tailor-made to suit
                  your unique learning needs. Whether it's vocabulary, math
                  equations, historical events, or scientific formulas,
                  RapidCards777 lets you design flashcards that reflect your
                  curriculum or personal study goals.
               </p>
               <p className="text-paragraph text-paragraph-hidden">
                  Visualize complex concepts and make learning a multisensory
                  experience. Harness the power of collaboration by sharing your
                  flashcards with classmates, friends, or study groups.
               </p>
            </div>
            <div className="intro-text-2">
               <p className="text-paragraph">
                  Sync across devices. Seamlessly access your flashcards
                  anytime, anywhere. Whether you're studying on your smartphone,
                  tablet, or computer, FlashMaster syncs your progress across
                  devices, ensuring you can pick up right where you left off.
               </p>
               <p className="text-paragraph text-paragraph-hidden">
                  Expand your knowledge through collective efforts and benefit
                  from a diverse range of perspectives. Together, you can
                  achieve more!
               </p>
            </div>
         </div>
      </>
   );
};

export default Welcome;
