
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewQuestion, handleError, handleSameQuestions, initiateAnsIndex, initiateCreateExam, initiateQuestions} from '../redux-toolkit/slices/teacher';
import { useLocation } from 'react-router';
import { hasDuplicates } from '../utils/functions';
import InputField from './InputField';
import { validateField } from '../Validation/validation';



const ShowExam = ({
  createExamFields,
  error,
  setCurrQuestion,
  currQuestion,
  validateExamData,
  validate,
  eData
}) => {
    console.log(" SHOW EXAM eData ",eData);
    

    
  

   
    const totalQuestion =  14;
    const examData = useSelector(state => state.teacher.createExam);
   
    const optionArr = examData?.questions?.[currQuestion]?.options;
    const dispatch = useDispatch();
    
    const handlePrevQuestion = () => {
        dispatch(handleError({}));
        setCurrQuestion(currQuestion -1)
    }

    const handleNextQuestion = () => {
      
        const error = validateField(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        } 
        
        if(hasDuplicates(optionArr)){
          console.log("called")
          const error = {};
          error.repeatedOption = ' Options are repeated Check it once ';
          dispatch(handleError(error));
          return;
        }

        if(currQuestion !== totalQuestion){
           
            const question = {
                question:'',
                answer:' ',
                options:[
                    '',
                    '',
                    '',
                    ''
                ]
            }
            if(examData.questions.length !== 15 ){
                dispatch(addNewQuestion(question));
            }
            else{
                console.log("condition false")
            }               
            setCurrQuestion(currQuestion+1);
        }
    }

  return (
    <div>
      <div>
        {
          createExamFields.map((field,i) => {
           
            return <InputField fieldData={field}  key={i}/>
          })
        }
      </div>
      {
        error?.answer !== undefined ? <span className='text-red-500 text-sm'>{error.answer}</span> : ''
      }
      {
        error?.sameOption !== undefined ? <span className='text-red-500 text-sm'>{error.sameOption}</span> : ''
      }

      <div className='mt-2 ml-[50px]'>
        
        <button 
        onClick={ handlePrevQuestion}
        disabled={currQuestion === 0}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Prev</button>

        <button 
        disabled={currQuestion === 14 }
        onClick={ handleNextQuestion}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === 14 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>

      </div>
    </div>
  )
}

export default ShowExam













