import React from 'react'
import Navbar from '../../shared/Navbar'
import {  Outlet, useLocation } from 'react-router-dom'
import { RiDashboardHorizontalFill } from "react-icons/ri"
import { useSelector } from 'react-redux';
import { ALL_EXAM, STUDENT_DASHBOARD, STUDENT_PROFILE } from '../../utils/constant';
import { PiExamFill } from 'react-icons/pi';
import { CgProfile } from "react-icons/cg";
import Dashboard from '../../shared/Dashboard';


const Student = () => {

  const location = useLocation();
  const menu =useSelector(state=>state.user.menu)
  
  const studentRoutes = [
    {
      path:STUDENT_DASHBOARD,
      name:'Dashboard',
      icon:<RiDashboardHorizontalFill style={{fontSize:25}}/>
    },
    {
      path:ALL_EXAM,
      name:'Exam',
      icon:<PiExamFill style={{fontSize:25}}/>
    },
    {
      path:STUDENT_PROFILE,
      name:'Profile',
      icon:<CgProfile style={{fontSize:25}} />
    }
  ]

  return (
    <div className='flex h-[100%] w-[100vw]'>
      <div className={`w-[100%] z-10 fixed h-[100%] ${menu ? 'show-menu' :'hide-menu'}`}>
        <Navbar navItems={studentRoutes}/>
      </div>
      <div className='w-full mb-[20px]'>
        {
          location.pathname === '/student' || location.pathname === '/student/' ? <Dashboard/> : <Outlet />
        }
      </div>
    </div>
  )
}

export default Student