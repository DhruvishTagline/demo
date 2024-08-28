import React, { useEffect } from 'react'
import useStudentProfile from '../../../hooks/useStudentProfile'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getItemLocal, removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { loadStudentProfile } from '../../../redux-toolkit/slices/student';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import InputField from '../../../shared/InputField';
import { LOGIN_PAGE } from '../../../utils/constant';
import { toast } from 'react-toastify';

const StudentProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(state => state.api.status);

  const {
    createStudentFields,
    saveProfile,
    disable,
    setDisable
} = useStudentProfile();

  useEffect(() => {
    const fetchStudentDetail = async() => {
      try{
        const config = {
          method:'get',
          url:'student/getStudentDetail',
          headers: { "access-token":getCurrUserData().token }
        }
        const res = await dispatch(fetchData(config));
        if(res?.payload?.statusCode !== 200){
          toast.error(res?.payload?.message);
          removeItemLocal('userData');
          setItemLocal('login',false);
          navigate(LOGIN_PAGE)
          return;
        }
        dispatch(loadStudentProfile(res.payload.data));
        setItemLocal('student',res.payload.data)
      }catch(error){
       toast.error('error', error)
      }
    }
    const student = getItemLocal('student')
    if(!student){
      fetchStudentDetail();
    }else{
      dispatch(loadStudentProfile(student))
    }
    dispatch(handlePrevVisitedPage(1));
  },[dispatch,navigate]);

   const handleCancel = () => {
    setDisable(true);
    dispatch(loadStudentProfile(getItemLocal('student')));
  }
  
  return (
    status === 'loading' ?
    <div className='spinner mt-20 mx-auto'></div> :  
    <div className='flex justify-center mt-[70px] overflow-hidden'>
      <div>
        {
          <div>
          <p className='text-center text-4xl mb-4'>Your Profile</p>
          {
            createStudentFields.map((field,i) => <InputField fieldData={field} key={i}/>)
          }
          <div className='flex justify-center mt-2'>
            {
              disable ? 
                <button 
                onClick={() => setDisable(!disable)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >Edit</button> :
                  <div>
                    <button 
                    onClick={saveProfile}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >Save</button>
                    <button 
                    onClick={handleCancel}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >Cancel</button>
                  </div>
            }
          </div>
        </div>              
        }
      </div>
    </div>
  )
}

export default StudentProfile