import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData, token } from '../../../Current User/currentUser';
import Pagination from '../../../shared/Pagination';
import {  loadVerifiedStudentData } from '../../../redux-toolkit/slices/teacher';
import { useNavigate } from 'react-router';

import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';

const VerifiedStudent = () => {
    console.log("verified Student");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);
   
    
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

    useEffect(() => {
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:'dashboard/Teachers/StudentForExam',
                headers: { "access-token":getCurrUserData()?.token }
            }
            const res = await dispatch(fetchData(config))
            if(res?.payload?.statusCode === 401){
                removeItemLocal('userData');
                setItemLocal('login',false);
                navigate('/login')
                return;
              }
            dispatch(loadVerifiedStudentData(res?.payload?.data));
        }
        if(verifiedStudentData.length === 0){
            fetchAllStudentData();
        }
    },[]);
  return (
   <>
    <div className='h-[100vh] flex items-center flex-col mt-[10px]'>
        <div>
            {
                status === 'loading' ? 
                <div className='spinner mt-[250px]'>
                </div> :
                <div>
                    <p className='text-center text-4xl mb-4'>Verified Students</p>
                    <Pagination data={verifiedStudentData} recodesPerPage={10} viewPath={`/teacher/view-student-detail`} lastVisitedPage={lastVisitedPage}/>
                </div>         
            }
        </div>
   </div>
   </>
  )
}

export default VerifiedStudent;
