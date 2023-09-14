import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const HandleSignUpLogin = ({children}) => {

    const token = !!localStorage.getItem('token');

  return (
    !token? <>{children}</>: <Navigate to={'/'}/>
  )
}

export default HandleSignUpLogin