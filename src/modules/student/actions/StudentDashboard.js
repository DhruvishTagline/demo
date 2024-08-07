import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

const StudentDashboard = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(handlePrevVisitedPage(1));
  },[])
  return (
    <div className='flex justify-center items-center text-2xl mt-[10px]'>Student Dashboard</div>
  )
}

export default StudentDashboard