import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
// import useEditExam from '../../../hooks/useEditExam';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserData } from '../../../Current User/currentUser';
import { fetchData } from '../../../redux-toolkit/slices/api';
import { removeItemLocal, setItemLocal } from '../../../utils/localStorageFunction';
import { VIEW_EXAM } from '../../../utils/constant';
import { handleEdited, initiateAnsIndex, initiateExam, initiateQuestions } from '../../../redux-toolkit/slices/teacher';
import ShowExam from '../../../shared/ShowExam';
import useEditExam from '../../../hooks/useEditExam';



const EditExam = () => {
  const dispatch = useDispatch();

  // const examData= useSelector(state=>state.teacher.createExam);
  // console.log("examDataaaaaa",examData);

  const [searchParams,setSearchParams]=useSearchParams();
  const id = searchParams.get('id');
  console.log("id",id);
  

  const [fetchedExamData,setFetchedExamData]=useState([]);
    
  const getExamDetails=async()=>{
    console.log("getExamDetails called");
    const config ={
      method:'get',
      url:'dashboard/Teachers/examDetail',
     
      headers:{"access-token":getCurrUserData().token},
      params:{id}
    }

    console.log("getExamDetails called");
    const res =await dispatch(fetchData(config));
    console.log("getExamDetails called");
    console.log("ressssssss",res.payload.data);
    setFetchedExamData(res.payload.data);
    console.log("fetchExamData",fetchedExamData);
  }
  getExamDetails();
  
  const {
    createExamFields,
    currQuestion,
    validateExamData,
    validate,
    edited,
    // examData,
    setCurrQuestion,
    handleEditExam,
    handleDeleteExam,
    handleCancel
  } = useEditExam(id);

  console.log("examData",examData);

  
 
  const error = useSelector(state=>state.teacher.error);
  const status = useSelector(state => state.api.status);
  const navigate=useNavigate();
  const subjectName = searchParams.get('subject');
  const editData={};

  useEffect(()=>{
    try{
      const fetchEditExamData=async()=>{
        const config={
          method:'get',
          url:'dashboard/Teachers/examDetails',
          headers:{'access-token':getCurrUserData().token},
          params:{id}
        }
        const res = await dispatch(fetchData(config));
        if(res?.payload?.statusCode === 401){ 
          removeItemLocal('userData');
          setItemLocal('login,false');
          navigate('/login');
          return;
        }
        if(res?.payload?.statusCode === 500){
          navigate(VIEW_EXAM);
          return
        }
        editData.subjectName = subjectName;
        editData.notes =['test notes'];
        editData.questions= res.payload?.data?.questions;
        dispatch(initiateExam(editData));
        console.log("editData",editData); 
        const ansArr = editData.questions.reduce((acc,curr)=>{
          const ansIndex =curr.options.findIndex(option=>option===curr.answer);
          acc.push(ansIndex);
          return acc;
        },[])
        dispatch(initiateAnsIndex(ansArr));
        dispatch(handleEdited())
        dispatch(initiateQuestions([]))
      }
      fetchEditExamData();
    }catch(error){
      console.log("error",error);
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
    removeItemLocal('createExam');
    removeItemLocal('ansIndex');
    }

  
  },[]);

  return (
    <>
    <h1>EditExam</h1>
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
              fetchedExamData={fetchedExamData}
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
    </>
  )
}

export default EditExam;