// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addNewQuestion, handleError} from '../redux-toolkit/slices/teacher';
// import InputField from './InputField';
// import { validateField } from '../Validation/validation';

// const ShowExam = ({
//   createExamFields,
//   error,
//   setCurrQuestion,
//   currQuestion,
//   validateExamData,
//   validate,
//   subjectName,
//   totalQue
// }) => {


//       const totalQuestion = totalQue ||  15;
//       const examData = useSelector(state => state.teacher.createExam);
//       const dispatch = useDispatch();
//       const status = useSelector(state => state.api.status);


//       console.log('error :>> ', error);
    
//       const handlePrevQuestion = () => {
//         dispatch(handleError({}));
//         setCurrQuestion(currQuestion -1)
//       }

//       const handleNextQuestion = () => {
        
        
//         const er = validateField(validateExamData,validate);
//         console.log('er :>> ', er);
//         dispatch(handleError(er));
//         console.log('error :>> ', error);

//         console.log(Object.keys(error).length !== 0);
//         console.log(Object.keys(er).length !== 0);
        
//         if(Object.keys(error).length !== 0 || Object.keys(er).length !== 0){

//           console.log('error-present');
//           console.log('er :>> ', er);
//           console.log('error :>> ', error);
//           return;
//         } 
//         if(currQuestion !== totalQuestion){
//           const question = {
//             question:'',
//             answer:'',
//             options:[
//               '',
//               '',
//               '',
//               ''
//             ]
//           }
//           if(examData.questions.length !== 15 ){
//             dispatch(addNewQuestion(question));
//           }
//           // else{
//           //   console.log("condition false")
//           // }               
//           setCurrQuestion(currQuestion+1);
//         }
//       }
  
//       return (
//         <div>
          
//           {status === 'loading' ? 
//             <div className='spinner mt-20 mx-auto'></div> :
          
//          <div>
//           <div>
//             {
//               createExamFields.map((field,i) => {
//                 return <InputField fieldData={field} subjectName={subjectName} er={error} key={i}/>
//               })
//             }
//           </div>
//           {
//             error?.answer !== undefined ? <span className='text-red-500 text-sm'>{error.answer}</span> : ''
//           }
//           {
//             error?.sameOption !== undefined ? <span className='text-red-500 text-sm'>{error.sameOption}</span> : ''
//           }

//           <div className='mt-2 ml-[28px]'>
              
//             <button 
//             onClick={ handlePrevQuestion }
//             disabled={currQuestion === 0}
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >Prev</button>

//             <button 
//             disabled={currQuestion === totalQuestion-1 }
//             onClick={ handleNextQuestion }
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === totalQuestion-1 ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >Next</button>

//           </div>
//          </div>
         
// }

//         </div>
//       )
// }

// export default ShowExam


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewQuestion, handleError } from '../redux-toolkit/slices/teacher';
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
    console.log('validationError :>> ', validationErrors);
    console.log('error :>> ', error);
    console.log('Object.values(error) :>> ', Object.values(error));

    const e = Object.values(error).some(element => element !== '');
    console.log('e :>> ', e);

    // const hasErrors =  Object.keys(error).length > 0 && Object.keys(validationErrors).length > 0;
    // const hasErrors =  Object.values(validationErrors).length > 0 || Object.values(error).length > 0;
    const hasErrors =  Object.values(validationErrors).length > 0 || e ;
    
    if (hasErrors) return;

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
      {status === 'loading' ? (
        <div className='spinner mt-20 mx-auto'></div>
      ) : (
        <div>
          <div>
            {
              createExamFields.map((field, i) => (
              <InputField fieldData={field} subjectName={subjectName} er={error} key={i} />
              ))
            }
          </div>
         
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
      )}
    </div>
  );
};

export default ShowExam;

