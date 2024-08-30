


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewQuestion, handleError } from '../redux-toolkit/slices/teacher';
import InputField from './InputField';
import { validateField } from '../Validation/validation';
import { toast } from 'react-toastify';

const ShowExam = ({
  createExamFields,
  error,
  setCurrQuestion,
  currQuestion,
  validateExamData,
  validate,
  subjectName,
  totalQue,
  Options
}) => {


  const totalQuestion = totalQue || 15;
  const examData = useSelector((state) => state.teacher.createExam);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.api.status);
 

  const handlePrevQuestion = () => {
    dispatch(handleError({}));
    setCurrQuestion(currQuestion - 1);
  };

  const handleNextQuestion = () => {
  
    const validationErrors = validateField(validateExamData, validate);
  
    dispatch(handleError(validationErrors));
  

    const e = Object.values(error).some(element => element !== '');
    

    // const hasErrors =  Object.keys(error).length > 0 && Object.keys(validationErrors).length > 0;
    // const hasErrors =  Object.values(validationErrors).length > 0 || Object.values(error).length > 0;
    const hasErrors =  Object.values(validationErrors).length > 0 || e ;
    
    if (hasErrors) {
      dispatch(handleError(validationErrors));
      toast.error('Answer Required Please ')
      return
    };

    if (currQuestion < totalQuestion - 1) { 

      const newQuestion = {
        question: '',
        answer: '',
        options: ['', '', '', '']
      };
       
      if (examData.questions.length < totalQuestion) {
        dispatch(addNewQuestion(newQuestion));
      }
      setCurrQuestion(currQuestion + 1);
    } 
  };

  return (

    <div>     
      {
        <div>     
          {
            createExamFields.map((field, i) => (
              <InputField fieldData={field} subjectName={subjectName} er={error} key={i} Options={Options} currQuestion={currQuestion}/>
            ))
          }
          {error?.answer && <span className='text-red-500 text-sm'>{error.answer}</span>}
          {error?.sameOption && <span className='text-red-500 text-sm'>{error.sameOption}</span>}

          <div className='mt-2 ml-[28px]'>
            
            <button
              onClick={handlePrevQuestion}
              disabled={currQuestion === 0}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Prev
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currQuestion === totalQuestion - 1}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === totalQuestion - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div> 
      }
    </div>
  );
};

export default ShowExam;

