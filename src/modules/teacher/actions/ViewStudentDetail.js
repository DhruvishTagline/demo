import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getCurrUserData} from '../../../Current User/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { loadCurrStudentDetail } from '../../../redux-toolkit/slices/teacher';
import CurrStudentDetail from '../../../shared/CurrStudentDetail';
import { ALL_STUDENT } from '../../../utils/constant';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';

const ViewStudentDetail = () => {

     
    const location=useLocation();
    console.log("location",location.search.slice(4))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currStudentDetail = useSelector(state => state.teacher.currStudentDetail);
    const status = useSelector(state => state.api.status);
    const id = location.search.slice(4);

    useEffect(() => {
        try{
            const fetchStudentDetail = async() => {
                const config = {
                    method:'get',
                    url:`dashboard/Teachers/viewStudentDetail`,
                    headers: { "access-token":getCurrUserData().token },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                if(res?.payload?.statusCode === 401){
                    removeItemLocal('userData');
                    setItemLocal('login',false);
                    navigate('/login')
                    return;
                  }
                if(res?.payload?.statusCode === 500){
                    navigate(ALL_STUDENT)
                    return;
                 }
                  console.log('Student Detail', res.payload.data[0])
                dispatch(loadCurrStudentDetail(res.payload.data[0]));
            }
            fetchStudentDetail();
        }catch(error){
            console.log('error', error)
        }
    },[])

    const goBack = () => {
        navigate('/teacher/allstudent');
    }

  return (
    <div className='flex justify-center mt-[70px] text-black'>
        <div className=''>
            {
                status === 'loading' ? 
                    <div className='spinner mt-[20px]'></div> 
                        :
                            <div>
                                <p className='text-center mb-4 text-4xl'>Student Detail</p>
                                <CurrStudentDetail currStudentDetail={currStudentDetail}/>
                                <button
                                onClick={goBack}
                                className='mt-[30px] ml-[45%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                >Back</button>
                            </div>
            }
            
        </div>
    </div>
  )
}

export default ViewStudentDetail