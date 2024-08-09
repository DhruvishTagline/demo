import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData, token } from '../../../Current User/currentUser';
import Pagination from '../../../shared/Pagination';
import {  loadVerifiedStudentData, updateFilteredData, updateSearchQuery } from '../../../redux-toolkit/slices/teacher';
import { useNavigate } from 'react-router';

import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import FilterFeild from '../../../shared/FilterFeild';




const VerifiedStudent = () => {
    console.log("verified Student");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);
    const filteredData = useSelector(state => state.teacher.filteredData);
    const searchQuery = useSelector(state => state.teacher.searchQuery);
  
    
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

    useEffect(()=>{
        const filtered = verifiedStudentData.filter(student=>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        dispatch(updateFilteredData(filtered))
    },[searchQuery,verifiedStudentData,dispatch])


  return (
   <>
    <div className='h-[100vh] flex items-center flex-col mt-[10px]'>
        
            {
                status === 'loading' ? 
                <div className='spinner mt-[250px]'>
                </div> :
                <div className='min-w-[70%]'>
                    <p className='text-center text-4xl mb-4'>Verified Students</p>
                    {/* <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded mb-6"
                    /> */}
                    <FilterFeild searchQuery={searchQuery}/>
                    
                    <Pagination 
                        data={filteredData} 
                        recodesPerPage={10} 
                        viewPath={`/teacher/view-student-detail`} 
                        lastVisitedPage={lastVisitedPage}
                    />
                </div>         
            }
        
   </div>
   </>
  )
}

export default VerifiedStudent;
