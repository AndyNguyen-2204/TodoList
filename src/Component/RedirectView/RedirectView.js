import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function RedirectView() {
  const isLoggedIn = useSelector((state) => state.Login.login);
 
    if (isLoggedIn) {
      return <Navigate to="/home" />;
    } else {
      // Navigate to login page or handle not logged in state
      return <Navigate to="/login" />;
    }
  return (
   <></>
  )
}
