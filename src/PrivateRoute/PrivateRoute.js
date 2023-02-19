import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const PrivateRoute = ({children}) =>{
    const cookieValue = Cookies.get('token');
    return cookieValue ? children : <Navigate to="/login" />

}

export default PrivateRoute;