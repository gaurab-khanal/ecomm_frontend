// need token/logged in to access this

import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { UserInfoContext } from '../context/UserInfoContext';

const AdminRoute = ({children}) => {
    const {user} = useContext(UserInfoContext);
    const token = !!localStorage.getItem('token');
    

  return (
    token && user?.role=='admin'? <>{children}</> : <Navigate to={'/'}/>
  )
}

export default AdminRoute