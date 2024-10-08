import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { handleAns, handleEdited, handleError, handleOptions, handleQuestion, handleSubject, initiateExam, initiateQuestions, loadViewExamData } from '../redux-toolkit/slices/teacher';
import { validateField } from '../Validation/validation';

import { fetchData } from '../redux-toolkit/slices/api';
import { TEACHER_DELETE_EXAM_END_POINT, TEACHER_EDIT_EXAM_END_POINT, VIEW_EXAM } from '../utils/constant';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../utils/currentUser';
import { checkForDuplicateQuestions } from '../utils/functions';


const useEditExam = (id,subjectName) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const examData= useSelector(state=>state.teacher.createExam);
    const Questions = useSelector(state => state.teacher.createExam.questions);
    const sameOptionError = useSelector(state => state.teacher.error);

    const [currQuestion,setCurrQuestion]=useState(0);
    const error =useSelector(state=>state.teacher.error);
    const edited =useSelector(state=>state.teacher.edited);

    const eData=useSelector(state=>state.teacher.createExam)
      const Options={
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
      }

      const validate = {
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

      const optionArr= examData?.questions?.[currQuestion]?.options;
     
      const createExamFields = [
      {
        type:'text',
        id:'subject',
        name:'subjectName',
        label:'Subject Name',
        data:examData?.subjectName,
        updateData:handleSubject,
        error:error,
        disable:true
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

      const validateExamData = {
        subjectName:examData?.subjectName,
        question:examData?.questions?.[currQuestion]?.question,
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
        answer:examData?.questions?.[currQuestion]?.answer?.trim(),
      }

      const handleEditExam = async()=>{
        // const checkForDuplicateQuestions = (questions) => {
        //   const questionTexts = questions.map(q => q.question);
        //   const duplicateQuestions = questionTexts.filter((item, index) => 
        //       questionTexts.indexOf(item) !== index
        //   );         
        //   return [...new Set(duplicateQuestions)]; 
        // };
        
        const duplicates = checkForDuplicateQuestions(Questions);
        if (duplicates.length > 0) {  
            toast.warn(`Duplicate Questions Detected Please Check`);
            return; 
        }
        const error = validateField(validateExamData,validate);
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        if(Object.values(sameOptionError).some(element => element !== '')) return;
        try{
          if(!edited){
            navigate(VIEW_EXAM);
            return;
          }
          const error =validateField(validateExamData,validate);
          if(Object.keys(error).length !== 0){           
            dispatch(handleError(error));
            return;
          }
          var data = {...examData}
          data.subjectName=subjectName;
          const config ={
            method:'put',
            url:TEACHER_EDIT_EXAM_END_POINT,
            data:data,
            params:{id}
          }
          dispatch(loadViewExamData([]));
          const res = await dispatch(fetchData(config));
          
          if(res?.payload?.statusCode !== 200){
            toast.error(res?.payload?.message);
            return;
          }
          toast.success(res?.payload?.message);
          
          dispatch(handleEdited());
          navigate(VIEW_EXAM);
        }catch(error){
          toast.error("error",error);
        }
      }

      const handleDeleteExam=()=>{
        try{
          const bool = window.confirm('Are you sure you want to delete exam ?');
          if(bool === false){
            return
          }
          const deleteExam =async()=>{
            const config={
              method:'delete',
              url:TEACHER_DELETE_EXAM_END_POINT,
              params:{id}
            }
            const res =await dispatch(fetchData(config));
            if(res?.payload?.statusCode !== 200){
              toast.error(res?.payload?.message);
              return;
            }
            toast.success(res?.payload?.message);
            navigate(VIEW_EXAM);
          }
          deleteExam();
        }
        catch(error){
          console.log("error",error);
        }
      }

      const handleCancel=()=>{
        const initiateConfig ={
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
        dispatch(initiateExam(initiateConfig));
        navigate(VIEW_EXAM);
      }
      
  return {
      eData,
      createExamFields,
      currQuestion,
      edited,
      validateExamData,
      validate,
      examData,
      error,
      Options,
      setCurrQuestion,
      handleEditExam,
      handleDeleteExam,
      handleCancel
  }
}

export default useEditExam