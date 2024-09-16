import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import Pagination from '../../../shared/Pagination';
import { loadAllExamData } from '../../../redux-toolkit/slices/student';
import { updateFilteredData } from '../../../redux-toolkit/slices/teacher';
import FilterFeild from '../../../shared/FilterFeild';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../../../utils/currentUser';
import { LOGIN_PAGE, STUDENT_STUDENT_EXAM_END_POINT } from '../../../utils/constant';

const AllExam = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allExamData = useSelector(state=>state.student.allExamData);
  const status = useSelector(state => state.api.status);
  const lastVisitedPage =useSelector(state=>state.user.prevVisitedPage);
  const filteredData = useSelector(state => state.teacher.filteredData);
  const searchQuery = useSelector(state => state.teacher.searchQuery);

  useEffect(()=>{
    const fetchAllExam = async()=>{
      const config ={
        method:'get',
        url:STUDENT_STUDENT_EXAM_END_POINT,
        // headers:{ 'access-token':getCurrUserData().token }
      }
      const res = await dispatch(fetchData(config));
      if(res?.payload?.statusCode !== 200){
        toast.error(res?.payload?.message)
        removeItemLocal('userData');
        setItemLocal('login',false);
        navigate(LOGIN_PAGE);
        return;
      }
      dispatch(loadAllExamData(res?.payload?.data))
    }
      fetchAllExam();
  },[navigate,dispatch]);


  useEffect(() => {
    const filtered = allExamData?.filter(exam =>
      exam.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    dispatch(updateFilteredData(filtered));
  }, [searchQuery, allExamData, dispatch]);

  // const btn = {
  //   giveExamBtn : '/student/give-exam',
  //   ShowResultBtn: '/student/show-result'
  // }
  const btn =['giveExam'];
    return (
      <div className='flex items-center flex-col mt-4'>
        <div className='w-full max-w-6xl max-h-[90%] p-6 bg-white rounded-lg'>
            {
              status === 'loading' ? 
              <div className='spinner mt-20 mx-auto'></div> :
              <div>
                <p className='text-center text-4xl mb-4'>All Exams</p>
                <FilterFeild searchQuery={searchQuery} placeholder='Search by subject-name...'/>
                <Pagination 
                  data={filteredData} 
                  studentBtn={btn}  
                  // lastVisitedPage={lastVisitedPage}
                  viewPath='All-Exam'
                />
              </div>                     
            }
        </div>
    </div>
  )
}

export default AllExam