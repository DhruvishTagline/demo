import React, { useEffect } from 'react'
import {useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../../redux-toolkit/slices/api';
import {  handleQuestions, setAnsIndex } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';
import useEditExam from '../../../hooks/useEditExam';
import { toast } from 'react-toastify';
import { TEACHER_GET_EXAM_DETAIL, VIEW_EXAM } from '../../../utils/constant';
import { getCurrUserData } from '../../../utils/currentUser';


const EditExam = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { id,subjectName } = useParams();
  const status =useSelector(state=>state.api.status);

  const {
    eData,
    createExamFields,
    currQuestion,
    validateExamData,
    validate,
    edited,
    examData,
    error,
    Options,
    setCurrQuestion,
    handleEditExam,
    handleDeleteExam,
    handleCancel
  } = useEditExam(id,subjectName);
 
  useEffect(()=>{
    const getExamDetails=async()=>{
      
      const config ={
        method:'get',
        url:TEACHER_GET_EXAM_DETAIL,
        // headers:{"access-token":getCurrUserData().token},
        params:{id}
      }
      const res =await dispatch(fetchData(config));

      if(res?.payload?.statusCode!==200)
      {
        toast.error('No Such an Exam found');
        navigate(VIEW_EXAM)
      }

      dispatch(handleQuestions(res?.payload?.data?.questions));
      console.log('res.payload :>> ', res?.payload);
      console.log('res?.payload?.data?.questions[currQuestion].answer,currQuestion :>> ', res?.payload?.data?.questions[currQuestion].answer,currQuestion);
      dispatch(setAnsIndex(res?.payload?.data?.questions[currQuestion].answer,currQuestion))
    }
    getExamDetails();
  },[dispatch,id])

  return (
    <>
      { status === 'loading' ? 
       <div className='spinner mt-20 mx-auto'></div> :
      <div className='flex flex-col items-center mt-[10px] '>
        {
              <>
              <p className='text-center mb-4 text-4xl'>Edit Exam</p>
                <ShowExam 
                  createExamFields={createExamFields} 
                  setCurrQuestion={setCurrQuestion} 
                  currQuestion={currQuestion}
                  validateExamData={validateExamData}
                  validate={validate}   
                  eData={eData} 
                  subjectName = {subjectName} 
                  error={error}
                  Options={Options}
                />
                
                <div>
                  <button 
                  disabled={!edited}
                  onClick={handleEditExam}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!edited ? 'opacity-50 cursor-not-allowed':''}`}
                  >Submit</button>
                  <button 
                  onClick={handleDeleteExam}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded focus:outline-none focus:shadow-outline"
                  >Delete</button>
                  <button
                  onClick={handleCancel}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded focus:outline-none focus:shadow-outline"
                  >Cancel</button>
                </div>
              </>
        }
      </div>}
    </>
  )
}

export default EditExam;






