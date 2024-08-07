import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGiveExam } from '../studentdata/useGiveExam';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getItemLocal, removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { ALL_EXAM, LOGIN_PAGE } from '../../../utils/constant';
import { initiateExamPaper, loadExamPaper } from '../../../redux-toolkit/slices/student';
import { initiateAnsIndex, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';

const GiveExam = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const subject = searchParams.get('subject');

  const { 
    createExamFields,
    currQuestion,
    setCurrQuestion,
    validateExamData,
    validate,
    handleSubmitExam,
    handleCancel,
    error
  } = useGiveExam(id);

  const navigate =useNavigate();
  const dispatch = useDispatch();
  const examData = useSelector(state=>state.student.examPaper);
  const ansIndex=useSelector(state=>state.teacher.ansIndex);

  useEffect(()=>{
    const fetchExamPaper = async()=>{
      const config={
        method:'get',
        url:'student/examPaper',
        headers:{'access-token':getCurrUserData().token },
        params:{id}
      }
      const res = await dispatch(fetchData(config));
      if(res?.payload?.statusCode===401){
        removeItemLocal('userData');
        setItemLocal('login',false);
        navigate(LOGIN_PAGE);
        return;
      }
      if(res?.payload?.statusCode===500){
        navigate(ALL_EXAM);
        return;
      }
      const examPaper ={
        subjectName:subject,
        notes:['test'],
      }

      examPaper.questions=res.payload.data;
      console.log('examPaper set :>>:>>:>>:>> ');
      dispatch(loadExamPaper(examPaper))
    }
    const examPaper=getItemLocal('examPaper');
    if(examPaper){
      dispatch(loadExamPaper(getItemLocal('examPaper')))
          console.log('set ansIndx')
          const ansIndexLocal = getItemLocal('ansIndex')
          console.log('ansIndexLocal :>> ', ansIndexLocal);
          console.log('ansIndexLocal', JSON.parse(ansIndexLocal))
            dispatch(initiateAnsIndex(JSON.parse(ansIndexLocal)))
    }
    else{
      fetchExamPaper();
    }  
  },[])


  useEffect(()=>{
    const handleStorageChange = ()=>{
      const examPaper = getItemLocal('examPaper');
      if(examPaper){
        dispatch(loadExamPaper(getItemLocal('examPaper')));
        const ansIndexLocal =getItemLocal(ansIndex);
        console.log('ansIndexLocal :>> ', ansIndexLocal);
        if(ansIndexLocal && ansIndex.length === 0){
          dispatch(initiateAnsIndex(ansIndexLocal))
        }
        else{
          dispatch(initiateExamPaper({}));
          dispatch(initiateAnsIndex(ansIndex))
          navigate(ALL_EXAM);
        }
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  },[])


  return (
    <div className='flex justify-center mt-[70px] '>
        {
          
                <div>
                  <p className='text-center text-4xl mb-6'>Give Exam</p>
                  <ShowExam
                  createExamFields={createExamFields} 
                  setCurrQuestion={setCurrQuestion} 
                  currQuestion={currQuestion}
                  validateExamData={validateExamData}
                  totalQue={examData?.questions?.length - 1}
                  validate={validate}
                  error={error}
                  role={'student'}
                  />

                  <div className='flex justify-center mt-2'>
                    <button 
                    onClick={handleSubmitExam}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >Submit</button>
                    <button
                    onClick={handleCancel}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline"
                    >Cancel</button>
                  </div>
                </div>
        }

    </div>
  )
}

export default GiveExam