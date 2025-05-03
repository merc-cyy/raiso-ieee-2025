import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 

function ProtectedRoute(){
    const authToken = localStorage.getItem('userAuthData');
    const isAuthenticated = !!authToken

    return isAuthenticated ? <Outlet /> : <Navigate to='/' replace/>


}

export default ProtectedRoute;