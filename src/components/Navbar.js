import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import '../App.css';
import { fontFamily } from "@mui/system";

const userId = localStorage.getItem("UserId")
const navBar = {
  justifyContent: 'flex-end',
}

const Navbar = () => {
  const [username, setUsername] = useState("")

  const userNavName = async () => {
    try {
      const res = await fetch("/api/user/getusername/" + userId, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
      const data = await res.text();

      setUsername({ ...username, name: data })

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    userNavName();
  }, [])



  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "red !important" }}>

        <div className="navbar-brand" style={{ fontFamily: "Josefin Sans', sans-serif" }}>{username.name}</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse menu-nav" id="navbarSupportedContent" style={navBar}>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/choice">Choice </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink className="nav-link" to="/history">History </NavLink>
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