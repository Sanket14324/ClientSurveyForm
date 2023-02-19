import React from 'react'
import { Route, Routes } from 'react-router-dom';
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
import Render_Form from './components/Render_Form';
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Thank from './components/Thank';
const Routing = () => {

  return (
    <Routes>

      <Route path="/" element={<Landing_page />} />


      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/choice" element={
        <PrivateRoute>
          <Choice />
        </PrivateRoute>
      } />


      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />


      <Route path="/test" element={
        <PrivateRoute>
          <Card_radio />
        </PrivateRoute>
      } />

      <Route path="/render" element={
        <PrivateRoute>
          <Render_Form />
        </PrivateRoute>
      } />

      <Route path="/logout" element={
        <PrivateRoute>
          <Logout />
        </PrivateRoute>
      } />
      <Route path="/history" element={
        <PrivateRoute>
          <History />
        </PrivateRoute>
      } />
      <Route path="/form/response" element={
        <PrivateRoute>
          <Responses />
        </PrivateRoute>
      } />
      <Route path="/form" element={
        <PrivateRoute>
          <CreatedForm />
        </PrivateRoute>
      } />

      <Route path="/thanks" element={<Thank/>}></Route>

    </Routes>
  )

}




const App = () => {
  return (
    <>
      <Routing />
    </>
  )
}

export default App;