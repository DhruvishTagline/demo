
import { useDispatch, useSelector } from "react-redux"
import { handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateAnsIndex, initiateExam, initiateQuestions } from "../redux-toolkit/slices/teacher";
import { useState } from "react";
import { fetchData } from "../redux-toolkit/slices/api";

import { useNavigate } from "react-router";
import { validateField } from "../Validation/validation";
import { removeItemLocal } from "../utils/localStorageFunction";
import { VIEW_EXAM } from "../utils/constant";
import { toast } from "react-toastify";
import { getCurrUserData } from "../utils/currentUser";


export const useCreateExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.teacher.createExam);
    // console.log('examData :>> ', examData);
    const [currQuestion,setCurrQuestion] = useState(0);
    const error = useSelector(state => state.teacher.error);
    // const sameQuestions = useSelector(state => state.teacher.createExam.questions);
    const sameQuestions=[
      {question: 'q1', options: Array(4), answer: 'a'},
      {question: 'q1', options: Array(4), answer: 'a'},
      {question: 'q2', options: Array(4), answer: 'a'},
      {question: 'q3', options: Array(4), answer: 'a'},
      {question: 'q4', options: Array(4), answer: 'a'},
    ]
    
    console.log('sameQuestions :>> ', sameQuestions);
    // const totalQuestion = 14;
    const sameOptionError = useSelector(state => state.teacher.error);
    

    const validateExamData = {
        subjectName:examData?.subjectName,
        question:examData?.questions?.[currQuestion]?.question,
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
        answer:examData?.questions?.[currQuestion]?.answer,
    }
    
    const validate = {
        subjectName:[
          {
            required:true,
            message:'Please Enter Subject'
          },
          
        ],
        question:[
          {
            required:true,
            message:'Please Enter Question'
          },
          
        ],
        op1:[
          {
            required:true,
            message:'Option Required please'
          },
          
        ],
        op2:[
          {
            required:true,
            message:'Option Required please'
          },
          
        ],
        op3:[
          {
            required:true,
            message:'Option Required please'
          },
          
        ],
        op4:[
          {
            required:true,
            message:'Option Required please'
          },
          
        ],
        answer:[
          {
            required:true,
            message:'Answer Required please'
          }
        ]
    }
    
    const Options = {
        op1:examData?.questions?.[currQuestion]?.options?.[0],
        op2:examData?.questions?.[currQuestion]?.options?.[1],
        op3:examData?.questions?.[currQuestion]?.options?.[2],
        op4:examData?.questions?.[currQuestion]?.options?.[3],
    }

    const optionArr = examData?.questions?.[currQuestion]?.options;
    
    const createExamFields = [
      {
        type:'text',
        id:'subject',
        name:'subjectName',
        label:'Subject Name',
        data:examData,
        updateData:handleSubject,
        error:error
      },
      {
        type:'text',
        id:'question',
        name:'question',
        label:`Question ${currQuestion+1}`,
        data:examData?.questions?.[currQuestion],
        updateData:handleQuestion,
        currQuestion:currQuestion,
        error:error
      },
      {
        type:'radio',
        name:'ans',
        id:'op1',
        data:Options,
        examData:examData,
        updateData:handleAns,
        currQuestion:currQuestion,
        ans:examData?.questions?.[currQuestion]?.answer,
        opIndex:0,
        error:error
      },
      {
        type:'text',
        id:'op1',
        name:'op1',
        label:'Option 1',
        data:Options,
        optionArr:optionArr,
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:0,
        error:error
      },
      {
        type:'radio',
        name:'ans',
        id:'op2',
        data:Options,
        examData:examData,
        updateData:handleAns,
        currQuestion:currQuestion,
        ans:examData?.questions?.[currQuestion]?.answer,
        opIndex:1,
        error:error
      },
      {
        type:'text',
        id:'op2',
        name:'op2',
        label:'Option 2',
        data:Options,
        optionArr:optionArr,
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:1,
        error:error
      },
      {
        type:'radio',
        name:'ans',
        id:'op3',
        data:Options,
        examData:examData,
        updateData:handleAns,
        currQuestion:currQuestion,
        ans:examData?.questions?.[currQuestion]?.answer,
        opIndex:2,
        error:error
      },
      {
        type:'text',
        id:'op3',
        name:'op3',
        label:'Option 3',
        data:Options,
        optionArr:optionArr,
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:2,
        error:error
      },
      {
        type:'radio',
        name:'ans',
        id:'op4',
        data:Options,
        examData:examData,
        updateData:handleAns,
        currQuestion:currQuestion,
        ans:examData?.questions?.[currQuestion]?.answer,
        opIndex:3,
        error:error
      },
      {
        type:'text',
        id:'op4',
        name:'op4',
        label:'Option 4',
        data:Options,
        optionArr:optionArr,
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:3,
        error:error
      }
    ]

    const initiateConfig = {
      subjectName:'',
      questions:[
          {
              question:'',
              options:[
                  '',
                  '',
                  '',
                  ''
              ]
          }
      ],
      notes:['test note'],
    }

    const handleCreateExam = () => {

        const checkForDuplicateQuestions = (questions) => {
            const questionTexts = questions.map(q => q.question);
            const duplicateQuestions = questionTexts.filter((item, index) => 
                questionTexts.indexOf(item) !== index
            );
            return [...new Set(duplicateQuestions)]; 
        };

        const duplicates = checkForDuplicateQuestions(sameQuestions);
        if (duplicates.length > 0) {  
            toast.warn(`Duplicate Questions Detected Please Check`);
            return; 
        }

        const error = validateField(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.values(sameOptionError).some(element => element !== ''))
        {
          console.log('sameOptionError :>> ', sameOptionError);
          console.log('same option error');
            return;
        }
          
        const createExam = async() => {
          console.log('createExam');
          try{
            const config = {  
              method:'post',  
              url:'dashboard/Teachers/Exam',
              data:examData,
              headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config));
           
            setCurrQuestion(0);
            dispatch(initiateQuestions());
            
            if(res?.payload?.statusCode !== 200){
              toast.error(res?.payload?.message)
              navigate(VIEW_EXAM);  
            }
            toast.success(res?.payload?.message);

          }catch(err){
            console.log('error', err);
          }
        }
        createExam();
    }

  //   const handleCreateExam = () => {
      
  //     const currentQuestionText = validateExamData.question;
  
      
  //     const hasDuplicateQuestion = sameQuestions.some(q => q === currentQuestionText);
  
  //     if (hasDuplicateQuestion) {
          
  //         toast.warn('Duplicate question detected. Please make sure each question is unique.');
  //         return; 
  //     }
  
  //     // Validate form data
  //     const validationErrors = validateField(validateExamData, validate);
  //     if (Object.keys(validationErrors).length !== 0) {
  //         // Dispatch errors if validation fails
  //         dispatch(handleError(validationErrors));
  //         return;
  //     }
  
    
  //     if (Object.values(sameOptionError).some(error => error !== '')) {
  //         console.log('Option errors:', sameOptionError);
  //         return;
  //     }
  
    
  //     const createExam = async () => {
  //         console.log('Creating exam...');
  //         try {
  //             const config = {
  //                 method: 'post',
  //                 url: 'dashboard/Teachers/Exam',
  //                 data: examData,
  //                 headers: { "access-token": getCurrUserData().token }
  //             };
  
             
  //             const response = await dispatch(fetchData(config));
  
            
  //             setCurrQuestion(0);
  //             dispatch(initiateQuestions());
  
  //             if (response?.payload?.statusCode !== 200) {
  //                 toast.error(response?.payload?.message);
  //                 navigate(VIEW_EXAM);
  //             } else {
  //                 toast.success(response?.payload?.message);
  //             }
  //         } catch (error) {
  //             console.error('Error creating exam:', error);
  //         }
  //     };
  
     
  //     createExam();
  // };
  
    
    const handleCancel = () => {
        dispatch(initiateExam(initiateConfig));
        // dispatch(handleSubject(""))
        // dispatch(initiateQuestions());
        dispatch(initiateAnsIndex([]));
        removeItemLocal('ansIndex')
        // removeItemLocal('createExam')
        setCurrQuestion(0);
    }

    return {
        createExamFields,
        validateExamData,
        validate,
        error,
        currQuestion,
        Options,
        examData,
        initiateConfig,
        
        setCurrQuestion,
        handleCreateExam,
        handleCancel
    }
}




const sameQuestions=[
  {question: 'q1', options: Array(4), answer: 'a'},
  {question: 'q1', options: Array(4), answer: 'a'},
  {question: 'q2', options: Array(4), answer: 'a'},
  {question: 'q3', options: Array(4), answer: 'a'},
  {question: 'q4', options: Array(4), answer: 'a'},
]




// const handleCreateExam = () => {
//   // Extract question text of the current question
//   const currentQuestionText = validateExamData.question;

//   // Function to check for duplicate questions
//   const checkForDuplicateQuestions = (questions) => {
//       const questionTexts = questions.map(q => q.question);
//       const duplicateQuestions = questionTexts.filter((item, index) => 
//           questionTexts.indexOf(item) !== index
//       );
//       return [...new Set(duplicateQuestions)]; // Return unique duplicates
//   };

//   // Check for duplicate questions
//   const duplicates = checkForDuplicateQuestions(sameQuestions);

//   if (duplicates.length > 0) {
//       // Show a toast message if duplicates are found
//       toast.warn(`Duplicate questions detected: ${duplicates.join(', ')}`);
//       return; // Exit the function to prevent further execution
//   }

//   // Validate form data
//   const validationErrors = validateField(validateExamData, validate);
//   if (Object.keys(validationErrors).length > 0) {
//       // Dispatch errors if validation fails
//       dispatch(handleError(validationErrors));
//       return; // Exit if there are validation errors
//   }

//   // Check for errors in options
//   if (Object.values(sameOptionError).some(error => error !== '')) {
//       console.log('Option errors:', sameOptionError);
//       return; // Exit if there are errors in options
//   }

//   // Function to create the exam
//   const createExam = async () => {
//       console.log('Creating exam...');
//       try {
//           const config = {
//               method: 'post',
//               url: 'dashboard/Teachers/Exam',
//               data: examData,
//               headers: { "access-token": getCurrUserData().token }
//           };

//           // Dispatch API request
//           const response = await dispatch(fetchData(config));

//           // Reset state and handle API response
//           setCurrQuestion(0);
//           dispatch(initiateQuestions());

//           if (response?.payload?.statusCode !== 200) {
//               toast.error(response?.payload?.message);
//               navigate(VIEW_EXAM);
//           } else {
//               toast.success(response?.payload?.message);
//           }
//       } catch (error) {
//           console.error('Error creating exam:', error);
//       }
//   };

//   // Call the function to create the exam
//   createExam();
// };