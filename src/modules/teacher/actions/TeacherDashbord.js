import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user'
import { useLocation } from 'react-router';
import { capitalizeFirstChar } from '../../../utils/functions';

const TeacherDashbord = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const accessRole = location.pathname.split('/')[1];

  useEffect(() => {
    // dispatch(handlePrevVisitedPage(1));
  },[dispatch])

  return (
    <div className='flex justify-center items-center text-4xl mt-[50px]'>{capitalizeFirstChar(accessRole)} Dashboard</div>
  )
}

export default TeacherDashbord