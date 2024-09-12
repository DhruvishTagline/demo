import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../../redux-toolkit/slices/api';
import Pagination from '../../../shared/Pagination';
import {  loadVerifiedStudentData, updateFilteredData, updateSearchQuery } from '../../../redux-toolkit/slices/teacher';
import { useNavigate } from 'react-router';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import FilterFeild from '../../../shared/FilterFeild';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../../../utils/currentUser';
import { TEACHER_VERIFIED_STUDENT_END_POINT } from '../../../utils/constant';

const VerifiedStudent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const status = useSelector(state => state.api.status);
    const verifiedStudentData = useSelector(state => state.teacher.verifiedStudentData);
    const filteredData = useSelector(state => state.teacher.filteredData);
    const searchQuery = useSelector(state => state.teacher.searchQuery);
    const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

    useEffect(() => {
        dispatch(updateSearchQuery('')) 
        const fetchAllStudentData = async() => {
            const config = {
                method:'get',
                url:TEACHER_VERIFIED_STUDENT_END_POINT,
                // headers: { "access-token":getCurrUserData()?.token }
            }
            const res = await dispatch(fetchData(config));
            if(res?.payload?.statusCode === 401){
                toast(res?.payload?.message);
                removeItemLocal('userData');
                setItemLocal('login',false);
                navigate('/login')
                return;
            }
            if(res?.payload?.statusCode !== 200){
                toast(res?.payload?.message);
                return;
            }
            dispatch(loadVerifiedStudentData(res?.payload?.data));
        }
            fetchAllStudentData();
    },[dispatch,navigate]);

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
                    <FilterFeild searchQuery={searchQuery} placeholder='Search by email and name...'/>
                    <Pagination 
                        data={filteredData} 
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
