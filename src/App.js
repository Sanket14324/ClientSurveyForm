import React from 'react'
import {Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Choice from './components/Choice';
import Home from './components/Home';
import Card_radio from './components/Card_radio';
import History from './components/History';
import Landing_page from './components/Landing_page';
import Logout from './components/Logout';
import CreatedForm from './components/CreatedForm';
import Responses from './components/Responses';

const Routing=()=>{

  return(
    <Routes>

     <Route path="/" element={<Landing_page/>} />


     <Route path="/login" element={<Login/>} />

     <Route path="/register" element={<Register/>} />

     <Route path="/choice" element={<Choice/>} />

     <Route path="/home" element={<Home/>} />

     <Route path="/test" element={<Card_radio/>} />

     

     <Route path="/logout" element={<Logout/>} /> 
     <Route path="/history" element={<History/>} />
     <Route path="/response" element={<Responses/>}/>
     <Route path="/form" element={<CreatedForm/>}/>   

       
    </Routes>
  )
   
}




const App = () =>{
  return (
    <>
      <Routing />
    </>
  )
}

export default App;
