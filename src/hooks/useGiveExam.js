import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { cancelExam, handleStudentAns, loadAllExamData } from '../redux-toolkit/slices/student';
import { fetchData } from '../redux-toolkit/slices/api';
import { ALL_EXAM, STUDENT_GIVE_EXAM_END_POINT } from '../utils/constant';
import { initiateAnsIndex } from '../redux-toolkit/slices/teacher';
import { removeItemLocal } from '../utils/localStorageFunction';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../utils/currentUser';

export const useGiveExam = (id) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currQuestion,setCurrQuestion]= useState(0);
    const examData = useSelector(state=>state.student.examPaper);
    const error = useSelector(state=>state.student.error);
    
    const Options = {
        op1:examData?.questions?.[currQuestion]?.options[0],
        op2:examData?.questions?.[currQuestion]?.options[1],
        op3:examData?.questions?.[currQuestion]?.options[2],
        op4:examData?.questions?.[currQuestion]?.options[3]
    }
    
    const validate = { 
        answer:[
            {
                required:true,
                message:'Answer required please'
            }
        ]
    }

    const validateExamData = {
        answer: examData?.questions?.[currQuestion]?.answer?.trim()
    }

    const createExamFields = [
        {
          type:'text',
          id:'subject',
          name:'subjectName',
          label:'Subject Name',
          data:examData,
          disable:true,
          error:error,
          required:true
        },
        {
          type:'text',
          id:'question',
          name:'question',
          label:`Question ${currQuestion+1}`,
          data:examData?.questions?.[currQuestion],
          disable:true,
          currQuestion:currQuestion,
          error:error,
          required:true
        },
        {
          type:'radio',
          name:'ans',
          id:'op1',
          data:Options,
          examData:examData,
          updateData:handleStudentAns,
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
          disable:true,
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
          examData:examData,
          updateData:handleStudentAns,
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
          disable:true,
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
          examData:examData,
          updateData:handleStudentAns,
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
          disable:true,
          currQuestion:currQuestion,
          opIndex:2,
          error:error,
          required:true
        },
        {
          type:'radio',
          name:'ans',
          id:'op4',
          data:Options,
          examData:examData,
          updateData:handleStudentAns,
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
          disable:true,
          currQuestion:currQuestion,
          opIndex:3,
          error:error,
          required:true
        }
      ]

    const ansArr =examData?.questions?.reduce((acc,curr)=>{
        const obj ={
            question:curr._id,
            answer:curr.answer
        }
        if(curr.answer !== undefined){
            acc.push(obj)
        }
        return acc;
    },[])
      
      const handleSubmitExam =()=>{
        if(ansArr.length === 7){
            const submitExam = async ()=>{
                try{
                    const config = {
                        method:'post',
                        url:STUDENT_GIVE_EXAM_END_POINT,
                        data:ansArr,
                        // headers: { 'access-token':getCurrUserData().token},
                        params:{id}
                    }
                    dispatch(loadAllExamData([]));
                    const res = await dispatch(fetchData(config));
                    if(res?.payload?.statusCode!==200){
                      toast.error(res?.payload?.message);
                      return;
                    }
                    toast.success(res?.payload?.message)
                    removeItemLocal('ansIndex');
                    navigate(ALL_EXAM);
                }catch(error){
                    console.log("error",error);
                }
            }
            submitExam();
        }
        else{
            toast.warning('please answer all question');
        }
      }

      const handleCancel =()=>{
          dispatch(cancelExam());
          dispatch(initiateAnsIndex([]));
          removeItemLocal('ansIndex');
          removeItemLocal('examPaper');
          navigate(ALL_EXAM)
      }

      return {
        createExamFields,
        currQuestion,
        setCurrQuestion,
        validateExamData,
        validate,
        handleSubmitExam,
        handleCancel,
        error     
    }
}

