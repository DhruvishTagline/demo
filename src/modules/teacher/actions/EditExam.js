import React, { useEffect } from 'react'
import {useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import {  handleQuestions, setAnsIndex } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';
import useEditExam from '../../../hooks/useEditExam';


const EditExam = () => {
  const dispatch = useDispatch();

  const [searchParams,setSearchParams]=useSearchParams();
  const id = searchParams.get('id');
  const status =useSelector(state=>state.api.status)

  const {
    eData,
    createExamFields,
    currQuestion,
    validateExamData,
    validate,
    edited,
    examData,
    error,
    setCurrQuestion,
    handleEditExam,
    handleDeleteExam,
    handleCancel
  } = useEditExam(id);
 

  useEffect(()=>{
    const getExamDetails=async()=>{
      
      const config ={
        method:'get',
        url:'dashboard/Teachers/examDetail',
        headers:{"access-token":getCurrUserData().token},
        params:{id}
      }
      const res =await dispatch(fetchData(config));
      dispatch(handleQuestions(res?.payload?.data?.questions));
      dispatch(setAnsIndex(res?.payload?.data?.questions[currQuestion].answer,currQuestion))
    }
    getExamDetails();
  },[dispatch,id,currQuestion])

  return (
    <>
      
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
                subjectName={examData?.subjectName}   // subjectName = {subjectName}
                error={error}
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
      </div>
    </>
  )
}

export default EditExam;

