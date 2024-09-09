
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadAllStudentData, updateSearchQuery, updateFilteredData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../shared/Pagination';
import { useNavigate } from 'react-router';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import FilterFeild from '../../../shared/FilterFeild';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../../../utils/currentUser';

const AllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.api.status);
  const allStudentData = useSelector(state => state.teacher.allStudentData);
  const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);
  const filteredData = useSelector(state => state.teacher.filteredData);
  const searchQuery = useSelector(state => state.teacher.searchQuery);

  useEffect(() => {
    dispatch(updateSearchQuery('')) 
    const fetchAllStudentData = async () => {
      const config = {
        method: 'get',  
        url: 'dashboard/Teachers',  
        headers: { "access-token": getCurrUserData().token }  
      }  
      
      const res = await dispatch(fetchData(config));  
      if (res?.payload?.statusCode !== 200) {  
        toast.error(res?.payload?.message);
        removeItemLocal('userData');  
        setItemLocal('login', false);  
        navigate('/login');  
        return;  
      }
      
      dispatch(loadAllStudentData(res?.payload?.data));
    }
      fetchAllStudentData();
  }, [ dispatch, navigate]);

  useEffect(() => {
    const filtered = allStudentData?.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch(updateFilteredData(filtered));
  }, [searchQuery, allStudentData, dispatch]);  

  return (
    <div className='flex items-center flex-col mt-4'>
      <div className='w-full max-w-4xl p-6 bg-white rounded-lg'>
        {
          status === 'loading' ? 
            <div className='spinner mt-20 mx-auto'></div> :
            <div>
              <p className='text-center text-4xl mb-4'>All Students</p>
              <FilterFeild searchQuery={searchQuery} placeholder='Search by email and name...'/>
              <Pagination
                data={filteredData}
                viewPath={`/teacher/view-student-detail`}
                lastVisitedPage={lastVisitedPage}
              />
            </div>
        }
      </div>
    </div>
  );
}

export default AllStudent;


