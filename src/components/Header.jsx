import React from "react";
import Navbar from 'react-bootstrap/Navbar';

function Header({ children }) {
   return (
      <Navbar style={{backgroundColor:"#0077CC", minHeight:"7.9rem"}} expand="lg" >
         {children}
      </Navbar>
   );
}

export default Header;

// <div className=''>{children}</div>
