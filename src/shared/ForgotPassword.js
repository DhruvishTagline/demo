import React, { useEffect } from 'react'


import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { handleError, handleForgetPassword, initiateForgetPassword } from '../redux-toolkit/slices/user';

import { validateField } from '../Validation/validation';
import { fetchData } from '../redux-toolkit/slices/api';
import { LOGIN_PAGE } from '../utils/constant';
import InputField from './InputField'
import { toast } from 'react-toastify';
import { getCurrUserData } from '../utils/currentUser';

const ForgotPassword = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
      dispatch(handleError);
      return ()=>{
        dispatch(initiateForgetPassword({}))
      }
    },[dispatch])

    const forgetPassword =useSelector(state =>state.user.forgetPassword)
    const error= useSelector(state => state.user.error);
    const login = JSON.parse(localStorage.getItem('login'));
    const role = getCurrUserData().role;
    const fieldData = {
      type:'email',
      id:'email',
      name:'email',
      label:'Email',
      data:forgetPassword,
      updateData:handleForgetPassword,
      error:error
    }

    const validate={
      email:[
        {
          required:true,
          message:'Please Enter Email'
        },
        {
          pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message:'enter Valid email.'
        }
      ]
    }

    const sendMail = async()=>{
      try{
        const error=validateField(forgetPassword,validate)
        if(Object.keys(error).length !== 0){
          dispatch(handleError(error));
          return;
        }
        const config={
          method:'post',
          url:'users/ForgotPassword',
          data:forgetPassword
        }
        const res =await dispatch(fetchData(config));
        if(res?.payload?.statusCode === 500){
          toast.error(res?.payload?.message);
          return;
        }
        if(res?.payload?.statusCode === 400){
          toast.error(res?.payload?.message);
          return;
        }
        if(res?.payload.statusCode !== 200){
          toast.error(res?.payload?.message);
          return;
        }

        toast.success(res?.payload?.message)
        navigate(LOGIN_PAGE);
        dispatch(initiateForgetPassword({}));
      }
      catch(error){
        console.log("error",error);
      }
    }
    if(login){
      return <Navigate to={`/${role}/dashboard`}/>
    }

  return (
    <>
        {
          !login && 
          <div className='flex items-center flex-col mt-[70px]'>
              <p className='text-center mb-4 text-4xl'>Forget Password </p>
              <InputField fieldData={fieldData}/>
              <button 
                onClick={sendMail}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2`}
              >Submit
              </button>
          </div>
        }
    </>
  )
}

export default ForgotPassword