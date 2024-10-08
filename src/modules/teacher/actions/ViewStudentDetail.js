import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadCurrStudentDetail } from '../../../redux-toolkit/slices/teacher';
import CurrStudentDetail from '../../../shared/CurrStudentDetail';
import { ALL_STUDENT, TEACHER_VIEW_STUDENT_DETAIL_END_POINT } from '../../../utils/constant';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../../../utils/currentUser';

const ViewStudentDetail = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail);
    const status = useSelector(state => state.api.status);
    
    useEffect(() => {
        try{
            const fetchStudentDetail = async() => {
                const config = {
                    method:'get',
                    url:TEACHER_VIEW_STUDENT_DETAIL_END_POINT,
                    // headers: { "access-token":getCurrUserData().token },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                if(res?.payload?.statusCode === 401){
                    toast.error(res?.payload?.message);
                    removeItemLocal('userData');
                    setItemLocal('login',false);
                    navigate('/login')
                    return;
                }
                if(res?.payload?.statusCode === 500){
                    toast.error(res?.payload?.message);
                    navigate(ALL_STUDENT)
                    return;
                }
                if(res?.payload?.statusCode !== 200){
                    toast.error(res?.payload?.message);
                    navigate(ALL_STUDENT);
                    return;
                } 
                dispatch(loadCurrStudentDetail(res.payload.data[0]));
            }
            fetchStudentDetail();
        }catch(error){
            console.log('error', error)
        }
    },[dispatch,id,navigate])


  return (
    <div className='flex justify-center mt-[10px] text-black'>
        <div >
            {
                status === 'loading' ? 
                <div className='spinner mt-[20px]'></div> :
                <div>
                    <p className='text-center mb-4 text-4xl'>Student Detail</p>
                    <CurrStudentDetail currStudentDetail={currStudentDetail}/>                   
                </div>               
            }
        </div>
    </div>
  )
}

export default ViewStudentDetail