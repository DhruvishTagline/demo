import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getCurrUserData } from '../Current User/currentUser';
import { useDispatch } from 'react-redux';
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { handleLogin, handleMenu } from '../redux-toolkit/slices/user';
import { loadViewExamData } from '../redux-toolkit/slices/teacher';

import { cleatItemLocal, setItemLocal } from '../utils/localStorageFunction';
import { LOGIN_PAGE } from '../utils/constant';

const Navbar = ({ navItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const edit = location.pathname.split('/')[2]

  const currUserRole = getCurrUserData().role;

  const handleLogout = () => {
    cleatItemLocal()
    setItemLocal('login', false);
    dispatch(handleLogin(false))
    dispatch(loadViewExamData([]));
    navigate(LOGIN_PAGE, { replace: true });
  }

  return (
    <div className='w-full h-full bg-opacity-90 fixed' onClick={() => dispatch(handleMenu())}>
      <div className="w-60 h-full overflow-y-auto  bg-white dark:bg-gray-900 flex flex-col shadow-lg" onClick={(e) => e.stopPropagation()}>

        <ul className="space-y-3 font-medium mt-6">
          {
            navItems.map((item, i) => {
              return (
                <li key={i} onClick={() => dispatch(handleMenu())}>
                  <NavLink
                    to={item.path}
                    className={`flex gap-5 text-lg items-center p-3 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-gray-700 transition-all
                      ${(item.path === 'view-exam' && edit === 'edit-exam') || 
                        (item.path === 'allstudent' && edit === 'view-student-detail') || 
                        (item.path === 'all-exam' && (edit === 'give-exam' || edit === 'show-result')) ? 'bg-blue-400 dark:bg-gray-700' : ''}`}
                  >
                    {item.icon} {item.name}
                  </NavLink>
                </li>
              )
            })
          }
          <li onClick={() => dispatch(handleMenu())}>
            <NavLink
              to={`/${currUserRole}/reset-password`}
              className="flex gap-5 text-lg items-center p-3 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-gray-700 transition-all"
            >
              <RiLockPasswordFill style={{ fontSize: 25 }} />
              Reset
            </NavLink>
          </li>
          <li onClick={() => dispatch(handleMenu())}>
            <button
              onClick={handleLogout}
              className="flex gap-5 text-lg items-center p-3 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-gray-700 transition-all w-full"
            >
              <TbLogout style={{ fontSize: 25 }} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
