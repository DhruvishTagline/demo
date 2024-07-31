import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { handleAnsIndexes, handleEdited, handleError, handleQuestion, handleSubject, initiateExam, initiateQuestions, loadViewExamData } from '../redux-toolkit/slices/teacher';
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

      const optionArr= examData?.questions?.[currQuestion]?.options;

      const createExamFields=[
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
          currQuestion:currQuestion
        },
        {

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
          console.log("Exam Edited sucess");
          navigate(VIEW_EXAM)

        }catch(error){
          console.log("error",error);
        }
      }

      const handleDeleteExam=()=>{
        try{
          const bool =window.confirm('are you sure you want tot delete exam ?');
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
            console.log("exam deleted sucessfully");
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