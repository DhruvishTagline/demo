import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    // dispatch(handlePrevVisitedPage(1));
  },[dispatch])
  return (
    <div className='flex justify-center items-center text-4xl mt-[50px]'>Student Dashboard</div>
  )
}

export default StudentDashboard