import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItemLocal, setItemLocal } from '../utils/localStorageFunction';
import {  handleStudentError, loadStudentProfile, updateProfile } from '../redux-toolkit/slices/student';
import { validateField } from '../Validation/validation';
import { fetchData } from '../redux-toolkit/slices/api';
import { toast } from 'react-toastify';
import { getCurrUserData } from '../utils/currentUser';
import { STUDENT_STUDENT_PROFILE_END_POINT } from '../utils/constant';

const useStudentProfile = () => {
  
    const dispatch =useDispatch();

    const [disable,setDisable]=useState(true);
    const studentProfile = useSelector(state=>state.student.studentProfile);
    const error = useSelector(state=>state.student.error);

    const createStudentFields = [
        {
          type:'text',
          id:'name',
          name:'name',
          label:'Name',
          data:studentProfile,
          updateData:updateProfile,
          disable:disable,
          error:error,
          required:true
        },
        {
          type:'text',
          id:'email',
          name:'email',
          label:'Email',
          data:studentProfile,
          updateData:updateProfile,
          disable:true,
          error:error
        }
      ];

      const validate={
        name:[
            {
                required:true,
                message:'Please Enter Name'
            },
            {
                length:3,
                message:'Username must be more than 3 character'
            }
        ]
      }

      const updatedData={
        name:studentProfile.name
      }

      const saveProfile = async()=>{
        try {
            const student =getItemLocal('student');
            if(student.name === studentProfile.name){
                setDisable(true);
                dispatch(loadStudentProfile(student));
                return
            }
            const error =validateField(studentProfile,validate);
            if(Object.keys(error).length !== 0){
                dispatch(handleStudentError(error));
                return;
            }
            const config = {
                method:'put',
                url:STUDENT_STUDENT_PROFILE_END_POINT,
                data:updatedData,
                //  headers: { "access-token":getCurrUserData().token }
            }

            const res= await dispatch(fetchData(config));
            setItemLocal('student',res.payload.data);
            if(res?.payload.statusCode !== 200){
              toast.error(res?.payload?.message);
              return;
            }
            toast.success(res?.payload?.message);
            
        setDisable(true);
        } catch (error) {
            toast.error("error",error);
        }
      }

    return {
        createStudentFields,
        saveProfile,
        disable,
        setDisable
    }
}

export default useStudentProfile