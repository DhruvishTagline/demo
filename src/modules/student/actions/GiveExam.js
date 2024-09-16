import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData } from '../../../utils/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { getItemLocal, removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { EXAM_RESTRICTION_PAGE, LOGIN_PAGE, STUDENT_EXAM_PAPER_END_POINT } from '../../../utils/constant';
import { loadExamPaper } from '../../../redux-toolkit/slices/student';
import { initiateAnsIndex } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';
import { useGiveExam } from '../../../hooks/useGiveExam';
import { toast } from 'react-toastify';

const GiveExam = () => {

  const {id,subjectName}=useParams();
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
    removeItemLocal('examPaper');
    removeItemLocal('ansIndex');
    
    const fetchExamPaper = async()=>{
      
      const config = {
        method:'get',
        url:STUDENT_EXAM_PAPER_END_POINT,
        // headers:{ 'access-token':getCurrUserData().token },
        params:{id}
      }
      
      const res = await dispatch(fetchData(config));
      if(res?.payload?.statusCode===401){
        removeItemLocal('userData');
        setItemLocal('login',false);
        toast.error(res?.payload?.message);
        navigate(LOGIN_PAGE);
        return;
      }

      if (res?.payload?.statusCode === 500) {
        const message = res?.payload?.message;
        navigate(EXAM_RESTRICTION_PAGE, { state: { message } });
        return;
      }
      if(res?.payload?.statusCode !== 200){
        removeItemLocal('userData');
        setItemLocal('login',false);
        toast.error(res?.payload?.message);
        navigate(LOGIN_PAGE);
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
      if(ansIndexLocal && ansIndex.length === 0){
        dispatch(initiateAnsIndex([]))
      }
      dispatch(initiateAnsIndex(JSON.parse(ansIndexLocal)));
    }
    else{
      fetchExamPaper();
    }  

    return () => {
    
    }
  },[]);

  // useEffect(()=>{

  //   const handleStorageChange = ()=>{
  //     const examPaper = getItemLocal('examPaper');
  //     console.log('examPaper :>> ', examPaper);
  //     if(examPaper){
        
  //       dispatch(loadExamPaper(examPaper));
  //       const ansIndexLocal =getItemLocal(ansIndex);
  //       if(ansIndexLocal && ansIndex.length === 0){
  //         dispatch(initiateAnsIndex([]))
  //       }
  //     }
  //   }
  //   handleStorageChange();
  //   return () => {
    
  //   }
  // },[])

  
  return (
    <div className='flex justify-center mt-[10px] '>
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

