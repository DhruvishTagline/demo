import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSignupData, initiateSignupData } from "../redux-toolkit/slices/user";
import { validateField } from "../Validation/validation";
import { fetchData } from "../redux-toolkit/slices/api";
import { useNavigate } from "react-router";

import { LOGIN_PAGE } from "../utils/constant";




export const useSignupData = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signupData = useSelector(state => state.user.signupData);
    const error = useSelector(state => state.user.error);
    const [disable,setDisable] = useState(false);


    const signupField = [
        {
          type:'text',
          id:'name',
          name:'name',
          label:'Enter Name',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'email',
          id:'email',
          name:'email',
          label:'Enter Email',
          data:signupData,
          error:error,
          updateData:handleSignupData
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password',
          data:signupData,
          error:error,
          updateData:handleSignupData
        }
      ]
    
    const validate = {
        name:[
          {
            required:true,
            message:'Please Enter Name'
          },
          {
            pattern:/^([a-zA-Z0-9]+\s?)*\S$/,
            message:'Plaese, Enter Valid Name'
          }
        ],
        email: [
          {
            required:true,
            message:'Please Enter Email'
          },
          {
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message:'Please, Enter Valid Email'
          }
        ],
        password:[
          {
            required:true,
            message:'Please Enter Password'
          },
          {
            length:6,
            message:'Password Must be 6 char'
          },
          {
            pattern:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,25}$/,
            message:'Enter Valid Password'
          }
        ],
        role:[
          {
            required:true,
            message:'Please Select Your Role'
          }
        ]
    }

    const handleSignup = async() => {
        try{
          const error = validateField(signupData,validate);
          if(Object.keys(error).length !== 0){
            dispatch(handleError(error));
            return;
          }
          setDisable(!disable);

          const config = {
            method:'post',
            url:'users/SignUp',
            data:signupData
          }
          
          const res = await dispatch(fetchData(config))
          if(res.payload.statusCode === 400){
            console.log('check once more something wrong');
            return;
          }
          if(res?.payload?.statusCode !== 200){
            console.log('Email Already Exist Please Login');
            return;
          }
          dispatch(initiateSignupData());
          console.log('Signup Successful');
          navigate(LOGIN_PAGE,{replace:true});
        }catch(error){
          setDisable(false);
          console.log('error', error)
        }
      }

    return {
        signupField,
        disable,
        handleSignup
    }
}