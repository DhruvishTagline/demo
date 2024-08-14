import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getItemLocal, removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { ALL_EXAM, LOGIN_PAGE } from '../../../utils/constant';
import { initiateExamPaper, loadExamPaper } from '../../../redux-toolkit/slices/student';
import { initiateAnsIndex } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';
import { useGiveExam } from '../../../hooks/useGiveExam';

const GiveExam = () => {
  
  const [searchParams,setSearchParams] = useSearchParams();
  const id = searchParams.get('id');
  const subjectName = searchParams.get('subjectName');
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const examData = useSelector(state => state.student.examPaper);
  const ansIndex=useSelector(state => state.teacher.ansIndex);
  const status = useSelector(state => state.api.status);


  const { 
    createExamFields,
    currQuestion,
    validateExamData,
    validate,
    error,
    setCurrQuestion,
    handleSubmitExam,
    handleCancel
  } = useGiveExam(id);

  useEffect(()=>{
    const fetchExamPaper = async()=>{
      
      const config = {
        method:'get',
        url:'student/examPaper',
        headers:{ 'access-token':getCurrUserData().token },
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
        subjectName:subjectName,
        notes:['test'],
      }

      examPaper.questions=res.payload.data;
      dispatch(loadExamPaper(examPaper))
    }
    const examPaper=getItemLocal('examPaper');
    if(examPaper){
      dispatch(loadExamPaper(getItemLocal('examPaper')));
      const ansIndexLocal = getItemLocal('ansIndex');
      dispatch(initiateAnsIndex(JSON.parse(ansIndexLocal)));
    }
    else{
      fetchExamPaper();
    }  
  },[dispatch,id,navigate])

  useEffect(()=>{
    const handleStorageChange = ()=>{
      const examPaper = getItemLocal('examPaper');
      if(examPaper){
        dispatch(loadExamPaper(getItemLocal('examPaper')));
        const ansIndexLocal =getItemLocal(ansIndex);
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
    handleStorageChange();
    return () => {
    
    }
  },[dispatch,navigate])

  

  return (
    <div className='flex justify-center mt-[70px] '>
        {         
          status === 'loading' ?
          <div className='spinner mt-20 mx-auto'></div> :            
          <div>
            <p className='text-center text-4xl mb-6'>Give Exam</p>
            <ShowExam
            createExamFields={createExamFields} 
            setCurrQuestion={setCurrQuestion} 
            currQuestion={currQuestion}
            validateExamData={validateExamData}
            totalQue={examData?.questions?.length }
            validate={validate}
            error={error}
            role={'student'}
            subjectName={subjectName}
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