import React from "react";
import Navbar from 'react-bootstrap/Navbar';

function Header({ children }) {
   return (
      <Navbar className="navbar" expand="md" >
         {children}
      </Navbar>
   );
}

export default Header;


