import React, { useEffect } from 'react'
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import {  loadViewExamData, updateFilteredData, updateSearchQuery } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../shared/Pagination';
import { useNavigate } from 'react-router';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { LOGIN_PAGE } from '../../../utils/constant';
import FilterFeild from '../../../shared/FilterFeild';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../../../utils/currentUser';

const ViewExam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.api.status);
  const viewExam = useSelector(state => state.teacher.viewExam);
  const filteredData = useSelector(state => state.teacher.filteredData);
  const searchQuery = useSelector(state => state.teacher.searchQuery);

  const btn = {
    editBtn:'/teacher/edit-exam',
  }

  useEffect(() => {
    dispatch(updateSearchQuery(''))  
    const fetchViewExamData = async() => {
      try{
        const config = {
          method:'get',
          url:'dashboard/Teachers/viewExam',
          headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        if(res?.payload?.statusCode !== 200){
          toast.error(res?.payload?.message);
          removeItemLocal('userData');
          setItemLocal('login',false);
          navigate(LOGIN_PAGE);
          return;
        }     
        dispatch(loadViewExamData(res.payload.data));
      }catch(error){
        toast('error', error)
      }
    }
    if(viewExam.length === 0){
      fetchViewExamData();
    }
    dispatch(handlePrevVisitedPage(1));
  },[dispatch,navigate]);

  useEffect(()=>{
    const filtered = viewExam.filter(exam=>
      exam.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(updateFilteredData(filtered));
  },[searchQuery,viewExam,dispatch]);

  return (
    <div className='flex justify-center mt-[10px]'>
        <div className=' max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] h-[100%] min-w-[70%] mb-[40px]'>
            {
              status === 'loading' ? 
              <div className='spinner mt-[20px] mx-auto'></div> :
              <div>
                  <p className='text-center text-4xl mb-4'>View Exams</p>
                  <FilterFeild searchQuery={searchQuery} placeholder='Search by Subject-name...'/>
                  <Pagination 
                    data={filteredData}  
                    btn={btn}
                    viewPath={`/teacher/view-exam`}
                  />
              </div> 
            }
        </div>
    </div>
  )
}

export default ViewExam