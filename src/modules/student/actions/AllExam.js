import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';

import Pagination from '../../../shared/Pagination';
import { loadAllExamData } from '../../../redux-toolkit/slices/student';

const AllExam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allExamData = useSelector(state=>state.student.allExamData)
  console.log('allExamData :>> ', allExamData);
  const lastVisitedPage =useSelector(state=>state.user.prevVisitedPage);
  
  useEffect(()=>{
    const fetchAllExam = async()=>{
      const config ={
        method:'get',
        url:'student/studentExam',
        headers:{ 'access-token':getCurrUserData().token }
      }
      const res =await dispatch(fetchData(config));
      if(res?.payload?.statusCode === 401){
        removeItemLocal('userData');
        setItemLocal('login',false);
        navigate('/login');
        return;
      }
      dispatch(loadAllExamData(res?.payload?.data))
    }
    if(allExamData.length === 0){
      dispatch(handlePrevVisitedPage(1));
      fetchAllExam();
    }
  },[]);

  const keys =['subjectName','email'];
  const btn ={
    giveExamBtn : '/student/give-exam',
    ShowResultBtn: '/student/show-result'
  }
    return (
      <div className='flex items-center flex-col mt-[10px]  all-exam'>
      
        <div className='max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[590px]:w-[550px] max-[550px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px] all-exam'>
            {
              <div className=''>
                <p className='text-center text-4xl mb-4'>All Exams</p>
                <Pagination data={allExamData} keys={keys} btn={btn} searchKey={['subjectName','email']}  lastVisitedPage={lastVisitedPage}/>
              </div>                     
            }
        </div>
    </div>
  )
}

export default AllExam