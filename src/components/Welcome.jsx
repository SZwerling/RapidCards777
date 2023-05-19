import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Nav from "react-bootstrap/Nav";
import Container from 'react-bootstrap/Container';

const Welcome = () => {
   return (
      <>
         <Header>
          <Container className="pl-1 pr-1">
            <Nav.Item>
               <div>RAPID CARDS</div>
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
            </Container>
         </Header>
         <div className="below-header container-fluid"></div>
      </>
   );
};

export default Welcome;
