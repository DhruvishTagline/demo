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
import { checkForDuplicateQuestions } from "../utils/functions";

export const useCreateExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData = useSelector(state => state.teacher.createExam);
    const [currQuestion,setCurrQuestion] = useState(0);
    const error = useSelector(state => state.teacher.error);
    const examQuestions = useSelector(state => state.teacher.createExam.questions);
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
    
    const createExamFields = [
      {
        type:'text',
        id:'subject',
        name:'subjectName',
        label:'Subject Name',
        data:examData,
        updateData:handleSubject,
        error:error,
        required:true
      },
      {
        type:'text',
        id:'question',
        name:'question',
        label:`Question ${currQuestion+1}`,
        data:examData?.questions?.[currQuestion],
        updateData:handleQuestion,
        currQuestion:currQuestion,
        error:error,
        required:true
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
        error:error,
      },
      {
        type:'text',
        id:'op1',
        name:'op1',
        label:'Option 1',
        data:Options,
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:0,
        error:error,
        required:true
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
        currQuestion:currQuestion,
        opIndex:1,
        error:error,
        required:true
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
        error:error,
        
      },
      {
        type:'text',
        id:'op3',
        name:'op3',
        label:'Option 3',
        data:Options,       
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
        updateData:handleAns,
        currQuestion:currQuestion,
        ans:examData?.questions?.[currQuestion]?.answer,
        opIndex:3,
        error:error,
       
      },
      {
        type:'text',
        id:'op4',
        name:'op4',
        label:'Option 4',
        data:Options,      
        updateData:handleOptions,
        currQuestion:currQuestion,
        opIndex:3,
        error:error,
        required:true
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

        const duplicates = checkForDuplicateQuestions(examQuestions);
        if (duplicates.length > 0) {  
            toast.warn(`Duplicate Questions Detected Please Check`);
            return;
        }
  
        const error = validateField(validateExamData,validate);
        
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          toast.error('Please Check all Options and Select Right Answer');
          return;
        }
        if(Object.values(sameOptionError).some(element => element !== ''))
        {
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
            const res = await dispatch(fetchData(config));
          
            setCurrQuestion(0);
 
            if(res?.payload?.statusCode !== 200){
              toast.error(res?.payload?.message)
              navigate(VIEW_EXAM);  
            }
            toast.success(res?.payload?.message);
            navigate(VIEW_EXAM);
          }catch(err){
            console.log('error', err);
          }
        }
        createExam();
    }

    const handleCancel = () => {
        dispatch(initiateExam(initiateConfig));
        dispatch(initiateAnsIndex([]));
        removeItemLocal('ansIndex')
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



