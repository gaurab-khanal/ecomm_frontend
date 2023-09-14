import React, { useState } from 'react'
import { UserInfoContext } from './UserInfoContext';

export const UserInfoProvider = ({children}) => {

    const [user, setUser] = useState({name:"", email:""});

    const UserInfo= (userInfo)=>{
        setUser({...user, name: userInfo.user.name, email: userInfo.user.email})
    }

    const updatedValues = {
        user,
        UserInfo
    }

  return (
   <UserInfoContext.Provider value={updatedValues}>
    {children}
   </UserInfoContext.Provider>
  )
}

export default UserInfoProvider