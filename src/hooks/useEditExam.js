import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { handleAns, handleAnsIndexes, handleEdited, handleError, handleOptions, handleQuestion, handleQuestions, handleSubject, initiateExam, initiateQuestions, loadViewExamData } from '../redux-toolkit/slices/teacher';
import { validateField } from '../Validation/validation';
import { getCurrUserData } from '../Current User/currentUser';
import { fetchData } from '../redux-toolkit/slices/api';
import { VIEW_EXAM } from '../utils/constant';


const useEditExam = (id) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const examData= useSelector(state=>state.teacher.createExam);
    const sameQuestions = useSelector(state=>state.teacher.questions);
    const [currQuestion,setCurrQuestion]=useState(0);
    const error =useSelector(state=>state.teacher.error)
    const sameOptionError=useSelector(state=>state.teacher.error);
    const edited =useSelector(state=>state.teacher.edited);

    const eData=useSelector(state=>state.teacher.createExam)
      const Options={
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3],
      }

      const validate = {
        subjectName:[
          {
            required:true,
            message:'Please Enter Subject'
          }        
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

      const optionArr= examData?.questions?.[currQuestion]?.options;
      console.log("examData",examData);

      const createExamFields = [
      {
        type:'text',
        id:'subject',
        name:'subjectName',
        label:'Subject Name',
        data:examData?.subjectName,
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
        try{
          if(!edited){
            navigate(-1);
            return;
          }
          if((sameQuestions.includes(validateExamData.question) && 
            sameQuestions.length === currQuestion ) ||
            sameQuestions[currQuestion] !== validateExamData.question)
          {
            validateExamData.questions = sameQuestions;
          }

          const error =validateField(validateExamData,validate);
          if(Object.keys(error).length !== 0)
          {
            dispatch(handleError(error));
            return;
          }
          if(Object.keys(sameOptionError).length !== 0)
          {
            return;
          }

          const config ={
            method:'put',
            url:'dashboard/Teachers/editExam',
            data:examData,
            headers:{"access-token":getCurrUserData().token},
            params:{id}
          }
          dispatch(loadViewExamData([]));
          const res = await dispatch(fetchData(config));
          dispatch(initiateQuestions());
          dispatch(handleEdited());
          navigate(VIEW_EXAM)
        }catch(error){
          console.log("error",error);
        }
      }

      const handleDeleteExam=()=>{
        try{
          const bool =window.confirm('are you sure you want to delete exam ?');
          if(bool == false){
            return
          }
          const deleteExam =async()=>{
            const config={
              method:'delete',
              url:'dashboard/Teachers/deleteExam',
              headers:{"access-token":getCurrUserData().token},
              params:{id}
            }
            const res =await dispatch(fetchData(config));
            console.log('res :>> ', res);
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
          notes:['test notes']
        }
        dispatch(initiateQuestions());
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
      setCurrQuestion,
      handleEditExam,
      handleDeleteExam,
      handleCancel
  }
}

export default useEditExam