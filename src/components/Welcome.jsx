import React from 'react'
import { Link } from "react-router-dom"
import Header from './Header'

const Welcome = () => {
  return (
      <Header>
      <div>Welcome</div>
        <Link to="/addperson">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </Header>
  )
}

export default Welcome;