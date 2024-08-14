import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewQuestion, handleError} from '../redux-toolkit/slices/teacher';
import InputField from './InputField';
import { validateField } from '../Validation/validation';

const ShowExam = ({
  createExamFields,
  error,
  setCurrQuestion,
  currQuestion,
  validateExamData,
  validate,
  subjectName,
  totalQue
}) => {

      const totalQuestion = totalQue ||  15;
      const examData = useSelector(state => state.teacher.createExam);
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
        if(currQuestion !== totalQuestion){
          const question = {
            question:'',
            answer:'',
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
          // else{
          //   console.log("condition false")
          // }               
          setCurrQuestion(currQuestion+1);
        }
      }
  
      return (
        <div>
          <div>
            {
              createExamFields.map((field,i) => {
                return <InputField fieldData={field} subjectName={subjectName} er={error} key={i}/>
              })
            }
          </div>
          {
            error?.answer !== undefined ? <span className='text-red-500 text-sm'>{error.answer}</span> : ''
          }
          {
            error?.sameOption !== undefined ? <span className='text-red-500 text-sm'>{error.sameOption}</span> : ''
          }

          <div className='mt-2 ml-[28px]'>
              
            <button 
            onClick={ handlePrevQuestion }
            disabled={currQuestion === 0}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >Prev</button>

            <button 
            disabled={currQuestion === totalQuestion-1 }
            onClick={ handleNextQuestion }
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === totalQuestion-1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >Next</button>

          </div>
        </div>
      )
}

export default ShowExam


