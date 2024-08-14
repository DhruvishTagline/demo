import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getCurrUserData } from '../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { handleMenu } from '../redux-toolkit/slices/user';
import { getItemLocal } from '../utils/localStorageFunction';
import { LOGIN_PAGE, SIGNUP_PAGE } from '../utils/constant';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

const Header = () => {
    const dispatch = useDispatch();
    const Login = getItemLocal('login');
    const location = useLocation();
    const role = getCurrUserData().role;
  
    return (
        <div className='h-16 text-gray-100 flex justify-between items-center bg-blue-700 shadow-lg'>
            <div className='ml-4 gap-4 flex items-center'>
                {   
                    Login && location.pathname !== '/' &&
                        <button 
                        className='menu-btn p-2 rounded-md hover:bg-blue-300 transition'
                        onClick={() => dispatch(handleMenu())}
                        >
                        <ViewSidebarIcon style={{fontSize: 28}} />
                        </button>
                }
                <p className='text-3xl font-semibold'>Exam-Demo</p>
            </div>

            {
                !Login ?
                <div className='mr-8 flex items-center gap-4'>
                    {
                        location.pathname !== '/login' &&
                            <NavLink 
                                to={LOGIN_PAGE} 
                                className='border border-gray-200 rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-500 transition'
                            >
                                Login
                            </NavLink>
                    }
                    {
                        location.pathname !== '/signup' &&
                            <NavLink 
                                to={SIGNUP_PAGE} 
                                className='border border-gray-200 rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-500 transition'
                            >
                                Sign Up
                            </NavLink>
                    }
                </div> : 
                <div className='mr-16 flex items-center'>
                    {
                        location.pathname === '/'  && Login &&
                            <NavLink 
                                to={`${role}/dashboard`} 
                                className='ml-4 border border-gray-200 rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-500 transition'
                            >
                                DashBoard
                            </NavLink>
                    }
                </div>
            }
        </div>
    )
}

export default Header;
