# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Exam-Demo








modules > teacher > actions > CreateExam.js

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initiateAnsIndex, initiateExam } from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useCreateExam } from '../teachetData/useCreateExam';
import { handlePrevVisitedPage } from '../../../redux-toolkit/slices/user';
import { IsGetItem } from '../../../utils/localStorageFunction';

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
    examData,
    setCurrQuestion,
    handleCreateExam,
    initiateConfig,
    handleCancel
} = useCreateExam();

useEffect(() => {
  const createExamData = IsGetItem('createExam')
  const ansIndex = IsGetItem('ansIndex');
  if(!createExamData){
    dispatch(initiateExam(initiateConfig));
    dispatch(initiateAnsIndex([]))
  }else{
    dispatch(initiateExam(createExamData))
    if(ansIndex !== null){
      dispatch(initiateAnsIndex(ansIndex))
    }
  }
  dispatch(handlePrevVisitedPage(1))

  // return () => {
  //   localStorage.removeItem('createExam');
  //   localStorage.removeItem('ansIndex')
    
  //   // dispatch(initiateAnsIndex([]));
  // }
},[]);

useEffect(() => {
  const handleStorageChange = () => {
    const createExamData = IsGetItem('createExam');
    const ansIndex = IsGetItem('ansIndex');

    if (!createExamData) {
      dispatch(initiateExam(initiateConfig));
      dispatch(initiateAnsIndex([]));
      setCurrQuestion(0);
    } else {
      dispatch(initiateExam(createExamData));
      if(ansIndex !== null){
        dispatch(initiateAnsIndex(ansIndex));
      }
    }
  };

  // Listen to 'storage' events
  window.addEventListener('storage', handleStorageChange);

  // Clean up event listener
  return () => {
    // localStorage.removeItem('createExam');
    // localStorage.removeItem('ansIndex')
    window.removeEventListener('storage', handleStorageChange);
  };
}, []); 


  return (
    <div className='flex items-center flex-col mt-[70px]'>

      <p className='text-center text-4xl mb-4'>Create Exam</p>

      <ShowExam 
      createExamFields={createExamFields} 
      error={error} 
      setCurrQuestion={setCurrQuestion} 
      currQuestion={currQuestion}
      validateExamData={validateExamData}
      validate={validate}
      Options={Options}/>

      <div className='pt-2'>
            <button 
            disabled={status === 'loading' || currQuestion !== 14}
            onClick={handleCreateExam}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${status === 'loading' || currQuestion !== 14 ? 'opacity-50 cursor-not-allowed':''}`}
            >
              {
                status === 'loading'? <span>Loading...</span> : <span>Create Exam</span>
              }
            </button> 
        <button
        onClick={handleCancel}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2`}
        >Clear</button>
      </div>
    </div>
  )
}

export default CreateExam









modules > teacher > actions > EditExam.js

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCurrUserData } from '../../../Current User/currentUser';
import { handleEdited, initiateAnsIndex, initiateExam, initiateQuestions} from '../../../redux-toolkit/slices/teacher';
import ShowExam from './ShowExam';
import { useEditExam } from '../teachetData/useEditExam';
import { IsRemoveItem, setItemLocal } from '../../../utils/localStorageFunction';
import { VIEW_EXAM } from '../../../utils/constant';


const EditExam = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

    const {
      createExamFields,
      currQuestion,
      validateExamData,
      validate,
      edited,
      examData,
      setCurrQuestion,
      handleEditExam,
      handleDeleteExam,
      handleCancel
  } = useEditExam(id);

    const dispatch = useDispatch();
    const status = useSelector(state => state.api.status);
    const error = useSelector(state => state.teacher.error);
    const navigate = useNavigate();
    const subjectName = searchParams.get('subject');
    let editData = {};

    useEffect(() => {
        try{
            const fetchEditExamData = async() => {
                const config = {
                    method:'get',
                    url:'dashboard/Teachers/examDetail',
                    headers: { "access-token":getCurrUserData().token },
                    params:{id}
                }
                const res = await dispatch(fetchData(config));
                if(res?.payload?.statusCode === 401){
                  IsRemoveItem('userData');
                  setItemLocal('login',false);
                  navigate('/login')
                  return;
                }
                if(res?.payload?.statusCode === 500){
                  navigate(VIEW_EXAM)
                  return
                }
                editData.subjectName = subjectName;
                editData.notes = ['hello'];
                editData.questions = res.payload?.data?.questions;
                dispatch(initiateExam(editData));
                console.log('editData', editData)
                const ansArr = editData.questions.reduce((acc,curr) => {
                  const ansIndex = curr.options.findIndex(option => option === curr.answer)
                  acc.push(ansIndex)
                  return acc;
                },[])
  
                // localStorage.setItem('ansIndex',JSON.stringify(ansArr));
                dispatch(initiateAnsIndex(ansArr))
                dispatch(handleEdited())
                dispatch(initiateQuestions([]))
            }
              fetchEditExamData();
              // console.log('reach ansArr')
              // const ansArr = examData.questions.reduce((acc,curr) => {
              //   const ansIndex = curr.options.findIndex(option => option === curr.answer)
              //   acc.push(ansIndex)
              //   return acc;
              // },[])

              // localStorage.setItem('ansIndex',JSON.stringify(ansArr));
              // dispatch(initiateAnsIndex(ansArr))

              // if(!JSON.parse(localStorage.getItem('ansIndex'))){
              //   dispatch(initiateAnsIndex(ansArr))
              // }else{
              //   dispatch(initiateAnsIndex(JSON.parse(localStorage.getItem('ansIndex'))))
              // }
          
              // console.log('ansArr', ansArr)

        }catch(error){
           console.log('error', error) 
        }

        return () => {
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
            notes:['gffgdg']
        }
        dispatch(initiateExam(initiateConfig))
        dispatch(initiateAnsIndex([]));
        dispatch(initiateQuestions([]));
        dispatch(handleEdited());
        IsRemoveItem('createExam');
        IsRemoveItem('ansIndex');
        }
    },[])

  return (
    <div className='flex flex-col items-center mt-[70px] overflow-hidden'>

      {
        status === 'loading' ?
          <div className='spinner'></div> :
            <>
            <p className='text-center mb-4 text-4xl'>Edit Exam</p>
              <ShowExam 
              createExamFields={createExamFields} 
              error={error} 
              setCurrQuestion={setCurrQuestion} 
              currQuestion={currQuestion}
              validateExamData={validateExamData}
              validate={validate}
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
  )
}

export default EditExam;







modules > teacher > actions > ShowExam.js

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../shared/InputField';
import { addNewQuestion, handleError, handleSameQuestions, initiateAnsIndex, initiateCreateExam, initiateQuestions} from '../../../redux-toolkit/slices/teacher';
import { validateFeild } from '../../../Validation/validation';
import { handleStudentError } from '../../../redux-toolkit/slices/student';
import { useLocation } from 'react-router';
import { EDIT_EXAM } from '../../../utils/constant';


const ShowExam = ({createExamFields,error,setCurrQuestion,currQuestion,validateExamData,totalQue,validate,role,Options}) => {

    const location = useLocation(); 
    const totalQuestion = totalQue || 14;
    const sameOptionError = useSelector(state => state.teacher.error);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const examData = useSelector(state => state.teacher.createExam);
    const examPaper = useSelector(state => state.student.examPaper)
    const optionArr = examData?.questions?.[currQuestion]?.options;
    const [lastQueVisited,setLastQueVisited] = useState(false);

    const dispatch = useDispatch();
    
    const handlePrevQuestion = () => {
      if(location.pathname === EDIT_EXAM){
      console.log('validateExamData.questions', validateExamData.question);
      if(!sameQuestions.includes(validateExamData.question) || sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
        validateExamData.sameQueMsg = 'Question already exists'
      }
      if(currQuestion === 14 && !lastQueVisited){
        setLastQueVisited(true);
        validateExamData.questions = sameQuestions;
        validateExamData.sameQueMsg = 'Question already exists'
        const error = validateFeild(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
      }
      const error = validateFeild(validateExamData,validate);
      if(Object.keys(error).length !== 0){
        dispatch(handleError(error));
        return;
      }
      dispatch(handleSameQuestions({
        question:validateExamData.question,
        queIndex:currQuestion
      }));
      if(currQuestion === 1){
        dispatch(initiateQuestions());
      }
    }
          dispatch(handleError({}));
          setCurrQuestion(currQuestion -1)
      }

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    
    const handleNextQuestion = () => {
      if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
        sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
        validateExamData.sameQueMsg = 'Question already Exists'
      }
        const error = validateFeild(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.keys(sameOptionError).length !== 0){
          return;
        }
        if(hasDuplicates(optionArr)){
          const error = {};
          error.sameOption = 'Two Options are Same Please Check';
          // dispatch(fieldData.updateData(data))
          dispatch(handleError(error));
          return;
      }
        dispatch(handleSameQuestions({
          question:validateExamData.question,
          queIndex:currQuestion
        }));
        if(currQuestion === totalQuestion){
          setCurrQuestion(0)
        }else{
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
          if(examData.questions.length !== 15 && examData.questions.length < currQuestion+2){
            dispatch(addNewQuestion(question));
          }
            
          setCurrQuestion(currQuestion+1);
        }
    }

    const handlePrev = () => {
        console.log('Enter in to prev if block');
        dispatch(handleStudentError({}));
        
        setCurrQuestion(currQuestion-1);
    }

    const handleNext = () => {
          

          const error = validateFeild(validateExamData,validate);
            if(Object.keys(error).length !== 0){
                dispatch(handleStudentError(error));
                return;
              }

         

          setCurrQuestion(currQuestion+1);
    }

  return (
    <div>
        <div>
        {
          createExamFields.map((field,i) => <InputField fieldData={field} key={i}/>)
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
        onClick={role === 'student'? handlePrev : handlePrevQuestion}
        disabled={currQuestion === 0}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${currQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Prev</button>
        <button 
        disabled={currQuestion === 14 || (role === 'student' && currQuestion === 6)}
        onClick={role === 'student'? handleNext : handleNextQuestion}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline ${currQuestion === 14 || (role === 'student' && currQuestion === 6)? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>
      </div>
    </div>
  )
}

export default ShowExam





modules  >  teacher  >  teacherData  >  useCreateExam.js

import { useDispatch, useSelector } from "react-redux"
import { handleAns, handleError, handleOptions, handleQuestion, handleSubject, initiateAnsIndex, initiateExam, initiateQuestions } from "../../../redux-toolkit/slices/teacher";
import { useState } from "react";
import { validateFeild } from "../../../Validation/validation";
import { getCurrUserData } from "../../../Current User/currentUser";
import { fetchData } from "../../../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/constant";
import { toastSuccess } from "../../../utils/toastFunction";
import { IsRemoveItem } from "../../../utils/localStorageFunction";




export const useCreateExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.teacher.createExam)
    const [currQuestion,setCurrQuestion] = useState(0);
    const error = useSelector(state => state.teacher.error);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const totalQuestion = 14;
    const sameOptionError = useSelector(state => state.teacher.error);

    const validateExamData = {
        subjectName:examData?.subjectName,
        question:examData?.questions?.[currQuestion]?.question,
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
        answer:examData?.questions?.[currQuestion]?.answer?.trim(),
    }
    
    const validate = {
        subjectName:[{required:true,message:'Please Enter Subject'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Subject'}],
        question:[{required:true,message:'Please Enter Question'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Question'}],
        op1:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
        op2:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
        op3:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
        op4:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
        answer:[{required:true,message:'Answer Required'}]
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
        notes:['gffgdg']
    }

    const handleCreateExam = () => {

        if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
          sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }

        const error = validateFeild(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.keys(sameOptionError).length !== 0){
          return;
        }
        const createExam = async() => {
          try{
            const config = {
              method:'post',
              url:'dashboard/Teachers/Exam',
              data:examData,
              headers: { "access-token":getCurrUserData().token }
            }
            const res = await dispatch(fetchData(config))
            toastSuccess('Exam Created Successfully');
            setCurrQuestion(0);
            dispatch(initiateQuestions());
            // dispatch(initiateExam(initiateConfig));
            navigate(VIEW_EXAM);
          }catch(e){
            console.log('e', e)
          }
        }
        createExam();
    }

    const handleCancel = () => {
        dispatch(initiateExam(initiateConfig));
        dispatch(initiateQuestions());
        dispatch(initiateAnsIndex([]));
        IsRemoveItem('ansIndex')
        IsRemoveItem('createExam')
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




modules  >  teacher  >  teacherData  >  useEditExam.js


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAns, handleEdited, handleError, handleOptions, handleQuestion, handleSubject, initiateAnsIndex, initiateExam, initiateQuestions, loadViewExamData } from "../../../redux-toolkit/slices/teacher";
import { validateFeild } from "../../../Validation/validation";
import { getCurrUserData } from "../../../Current User/currentUser";
import { fetchData } from "../../../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { VIEW_EXAM } from "../../../utils/constant";
import { toastSuccess } from "../../../utils/toastFunction";



export const useEditExam = (id) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.teacher.createExam);
    const sameQuestions = useSelector(state => state.teacher.questions);
    const [currQuestion,setCurrQuestion] = useState(0);
    const error = useSelector(state => state.teacher.error);
    const sameOptionError = useSelector(state => state.teacher.error);
    const edited = useSelector(state => state.teacher.edited);
    const {role} = getCurrUserData();

    const Options = {
      op1:examData?.questions?.[currQuestion]?.options[0],
      op2:examData?.questions?.[currQuestion]?.options[1],
      op3:examData?.questions?.[currQuestion]?.options[2],
      op4:examData?.questions?.[currQuestion]?.options[3],
    }

    const validate = {
      subjectName:[{required:true,message:'Please Enter Subject'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Subject'}],
      question:[{required:true,message:'Please Enter Question'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Question'}],
      op1:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
      op2:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
      op3:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
      op4:[{required:true,message:'Option Required'},{pattern:/^([a-zA-Z0-9]+\s?)*\S$/,message:'Enter Valid Option'}],
      answer:[{required:true,message:'Answer Required'}]
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
          data:examData.questions[currQuestion],
          updateData:handleQuestion,
          currQuestion:currQuestion,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op1',
          data:Options,
          updateData:handleAns,
          currQuestion:currQuestion,
          ans:examData?.questions?.[currQuestion]?.answer,
          opIndex:0,
          ansIndex:0,
          error:error
        },
        {
          type:'text',
          id:'op1',
          name:'op1',
          label:'Option 1',
          data:Options,
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:0,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op2',
          data:Options,
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
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:1,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op3',
          data:Options,
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
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:2,
          error:error
        },
        {
          type:'radio',
          name:'ans',
          id:'op4',
          data:Options,
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
          updateData:handleOptions,
          optionArr:optionArr,
          currQuestion:currQuestion,
          opIndex:3,
          error:error
        }
      ]

    const validateExamData = {
        subjectName:examData?.subjectName,
        question:examData?.questions?.[currQuestion]?.question,
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
        answer:examData?.questions?.[currQuestion]?.answer?.trim(),
    }

    const handleEditExam = async() => {
        try{
          if(!edited){
            navigate(-1);
            return
          }
          if((sameQuestions.includes(validateExamData.question) && 
        sameQuestions.length === currQuestion ) ||
          sameQuestions[currQuestion] !== validateExamData.question){
        validateExamData.questions = sameQuestions;
      }


          const error = validateFeild(validateExamData,validate);
          if(Object.keys(error).length !== 0){
              dispatch(handleError(error));
              return;
            }
  
            if(Object.keys(sameOptionError).length !== 0){
              return;
            }
          const config = {
            method:'put',
            url:'dashboard/Teachers/editExam',
            data:examData,
            headers: { "access-token":getCurrUserData().token },
            params:{id}
          }
          dispatch(loadViewExamData([]));
          const res = await dispatch(fetchData(config));
          dispatch(initiateQuestions());
          dispatch(handleEdited());
          toastSuccess("Exam Edited Successfully");
          navigate(VIEW_EXAM);
        }catch(error){
          console.log('error', error)
        }
      }

    const handleDeleteExam = () => {
        try{
          const bool = window.confirm('are you sure?')
          if(bool === false){
            return
          }
           const deleteExam = async() => {
            const config = {
              method:'delete',
              url:'dashboard/Teachers/deleteExam',
              headers: { "access-token":getCurrUserData().token },
              params:{id}
            }
            const res = await dispatch(fetchData(config));
            toastSuccess("exam deleted successfully");
            navigate(VIEW_EXAM);
          }
          deleteExam();
          
        }catch(error){
          console.log('error', error)
        }
    }

    const handleCancel = () => {
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
        notes:['gffgdg']
    }
        dispatch(initiateQuestions());
        dispatch(initiateExam(initiateConfig))
        navigate(VIEW_EXAM);
    }

    return {
        createExamFields,
        currQuestion,
        edited,
        validateExamData,
        validate,
        examData,
        setCurrQuestion,
        handleEditExam,
        handleDeleteExam,
        handleCancel
    }
}









shared > RadioBtn.js

import { convertLength } from '@mui/material/styles/cssUtils';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleAnsIndexes } from '../redux-toolkit/slices/teacher';

const RadioBtn = ({fieldData}) => {

    const dispatch = useDispatch()

    const ansIndex = useSelector(state => state.teacher.ansIndex)

  return (
    <div>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        checked={fieldData?.data?.[fieldData.id] === fieldData?.ans && ansIndex?.[fieldData.currQuestion] === fieldData?.opIndex }
        onChange={(e) => {
            dispatch(handleAnsIndexes({
                currQuestion:fieldData.currQuestion,
                ansIndex:fieldData.opIndex
            }))
            let data = {
                name:e?.target?.name,
                value:e?.target?.value,
                queIndex:fieldData.currQuestion,
                opIndex:fieldData.opIndex,
                ans:fieldData.data[fieldData.id],
                ansIndex:fieldData.ansIndex
            }
            // if(fieldData.examData?.questions[fieldData.currQuestion].options[fieldData.opIndex] === ''){
            //     return;
            // }
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border'
        />
    </div>
  )
}

export default memo(RadioBtn)




slices  >  student.js 

import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    allExamData:[],
    examPaper:{},
    studentProfile:{},
    searchField:{subjectName:''},
    error:{}
}

export const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        loadAllExamData:(state,action) => {
            state.allExamData = action.payload;
        },
        loadExamPaper:(state,action) => {
            state.examPaper = action.payload;
        },
        handleStudentAns:(state,action) => {
            const {queIndex,ans} = action.payload;
            state.error = {};
            state.examPaper.questions[queIndex].answer = ans;
            localStorage.setItem('examPaper',JSON.stringify(state.examPaper))
        },
        handleStudentError:(state,action) => {
            state.error = action.payload;
        },
        loadStudentProfile:(state,action) => {
            state.studentProfile = action.payload;
        },
        updateProfile:(state,action) => {
            const {name,value} = action.payload;
            state.error = {}
            state.studentProfile[name] = value;
        },
        cancelExam:(state,action) => {
            state.examPaper = {};
        },
        handleSearchField:(state,action) => {
            state.searchField.subjectName = action.payload.value
        },
        initiateExamPaper:(state,action) => {
            state.examPaper = action.payload
        }
    }
})

export const 
    {
        loadAllExamData,
        loadExamPaper,
        handleStudentAns,
        handleStudentError,
        loadStudentProfile,
        updateProfile,
        cancelExam,
        handleSearchField,
        initiateExamPaper
    } = studentSlice.actions;

export default studentSlice.reducer;