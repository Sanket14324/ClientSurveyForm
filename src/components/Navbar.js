import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import '../App.css';

const navBar = {
  justifyContent: 'flex-end',
}

const Navbar=()=>{
    return(
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "red !important"}}>
  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

  <div className="collapse navbar-collapse menu-nav" id="navbarSupportedContent" style={navBar}>

    <ul className="navbar-nav ml-auto">
      {/* <li className="nav-item active mx-3">
      <NavLink className="nav-link" to="/register">SignUP </NavLink>
      </li> */}
      <li className="nav-item mx-3">
      <NavLink className="nav-link" to="/home">Home</NavLink>
      </li>
      <li className="nav-item mx-3">
      <NavLink className="nav-link" to="/choice">Choice </NavLink>
      </li>
      <li className="nav-item mx-3">
      <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li> 
    </ul>
    
  </div>
</nav>
        </>
    )
}

export default Navbar