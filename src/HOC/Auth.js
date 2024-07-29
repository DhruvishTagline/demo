import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
import { getCurrUserData } from '../Current User/currentUser';

const Auth = ({role}) => {
  const location = useLocation();
  const accessRole = location.pathname.split('/')[1];
  const currUserRole = getCurrUserData().role;
  if(!getCurrUserData().token){
    return <Navigate to={'/login'}/>
  }
  if(accessRole !== currUserRole){
    return <Navigate to={`${currUserRole}/dashboard`}/>
  }
  return (
    <div>
        

        <div>
            {
              role.includes(currUserRole) && <Outlet/>
            }
        </div>
    </div>
  )
}

export default Auth