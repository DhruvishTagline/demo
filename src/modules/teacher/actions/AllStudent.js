import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getCurrUserData } from '../../../Current User/currentUser';
import { loadAllStudentData } from '../../../redux-toolkit/slices/teacher';
import Pagination from '../../../shared/Pagination';
import { useNavigate } from 'react-router';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';

const AllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(state => state.api.status);
  const allStudentData = useSelector(state => state.teacher.allStudentData);
  const lastVisitedPage = useSelector(state => state.user.prevVisitedPage);

  useEffect(() => {
    const fetchAllStudentData = async () => {
      const config = {
        method: 'get',
        url: 'dashboard/Teachers',
        headers: { "access-token": getCurrUserData().token }
      }
      const res = await dispatch(fetchData(config))
      if (res?.payload?.statusCode === 401) {
        removeItemLocal('userData');
        setItemLocal('login', false);
        navigate('/login')
        return;
      }
      dispatch(loadAllStudentData(res?.payload?.data));
    }
    if (allStudentData.length === 0) {
      dispatch(handlePrevVisitedPage(1));
      fetchAllStudentData();
    }
  }, []);

  const keys = ['name', 'email', 'status'];

  return (
    <div className='flex items-center flex-col mt-4'>
      <div className='w-full max-w-4xl p-6 bg-white shadow-md rounded-lg'>
        {
          status === 'loading' ?
            <div className='spinner mt-20 mx-auto'></div> :
            <div>
              <p className='text-center text-4xl mb-4'>All Students</p>
              <Pagination
                data={allStudentData}
                recodesPerPage={10}
                keys={keys}
                viewPath={`/teacher/view-student-detail`}
                searchKey={['name', 'email', 'status']}
                lastVisitedPage={lastVisitedPage}
              />
            </div>
        }
      </div>
    </div>
  )
}

export default AllStudent
