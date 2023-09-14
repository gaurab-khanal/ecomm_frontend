import React, { useEffect, useContext, useState} from 'react'
import NavBar from "./module/common/NavBar/NavBar"
import Footer from './module/common/Footer/Footer'
import HomePage from './module/Home/HomePage'
import { Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { UserInfoContext } from './module/context/UserInfoContext'


const apiURL = import.meta.env.VITE_API_BACKEND;

const App = () => {

  const {UserInfo} = useContext(UserInfoContext)
  const [name, setName] = useState('');

  // useEffect(() => {
  //   // reauthenticate();
  // }, [])

  useEffect(() => {
    reauthenticate();
    
  },[])

  const reauthenticate = () => {
    let token = localStorage.getItem('token');
    if (token) {
      let decode = jwt_decode(token);
      console.log(decode);
      if(decode?.exp>Math.floor(Date.now()/1000)){
        //authenticate
        getUserDetailsApi(token)
      }else{
        localStorage.removeItem('token');
      }

    }
  }


  const getUserDetailsApi = (token)=>{
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': "application/json"
    }
    axios.get(`${apiURL}/userDashboard`, {headers}).then(res=>{
      console.log(res.data.user.name);
      UserInfo(res.data);

    }).catch(err=>{
      console.log(err);
    })
  }

    return (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    )
  
}
export default App