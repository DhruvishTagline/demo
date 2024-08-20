import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initiateAnsIndex, initiateExam } from '../../../redux-toolkit/slices/teacher';
import { getItemLocal } from '../../../utils/localStorageFunction';
import ShowExam from '../../../shared/ShowExam';
import { useCreateExam } from '../../../hooks/useCreateExam';

const CreateExam = () => {

  const dispatch = useDispatch();
  const status = useSelector(state => state.api.status);
  const ansIndex = useSelector(state => state.teacher.ansIndex);

  const {
    createExamFields,
    validateExamData,
    validate, 
    error,
    currQuestion,
    Options,
    setCurrQuestion,
    handleCreateExam,
    initiateConfig,
    handleCancel
} = useCreateExam();

useEffect(() => {
  const createExamData = getItemLocal('createExam');
  handleCancel();

  if(!createExamData){
    dispatch(initiateExam(initiateConfig));
    dispatch(initiateAnsIndex([]));
  }else{  
    
    dispatch(initiateExam(createExamData))
    if(ansIndex !== null){
      dispatch(initiateAnsIndex(ansIndex))
    }
  }
},[]);

  return (
    <div className='flex items-center flex-col mt-[10px]'>
      <p className='text-center text-3xl mb-5'>Create Exam</p>
      <ShowExam 
        createExamFields={createExamFields} 
        error={error} 
        setCurrQuestion={setCurrQuestion} 
        currQuestion={currQuestion}
        validateExamData={validateExamData}
        validate={validate}
        Options={Options} 
      />

      <div className='pt-2'>
        <button 
          disabled={status === 'loading' || currQuestion !== 14}
          onClick={handleCreateExam}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${status === 'loading' || currQuestion !== 14 ? 'opacity-50 cursor-not-allowed':''}`}
        >
        {
          status === 'loading' ? <span>Loading...</span> : <span>Create Exam</span>
        }
        </button> 
        <button
        onClick={handleCancel}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2`}
        >Clear Question</button>
      </div>
    </div>
  )
}

export default CreateExam




