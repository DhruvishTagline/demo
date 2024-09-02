import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getCurrUserData } from '../utils/currentUser';


const Auth = ({role}) => {
  const location = useLocation();
  const accessRole = location.pathname.split('/')[1];
  console.log('accessRole :>> ', accessRole);
  const currUserRole = getCurrUserData().role;
  if(!getCurrUserData().token){
    return <Navigate to={'/login'}/>
  }
  if(accessRole !== currUserRole){
    return <Navigate to={`${currUserRole}/dashboard`}/>
  }
  return (
    <div>
      {
        role.includes(currUserRole) && <Outlet/>
      }
    </div> 
  )
}

export default Auth