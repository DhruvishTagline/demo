import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSignupData, initiateSignupData } from "../redux-toolkit/slices/user";
import { validateField } from "../Validation/validation";
import { fetchData } from "../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { LOGIN_PAGE } from "../utils/constant";
import { toast } from "react-toastify";

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
          updateData:handleSignupData,
          disable:disable
        },
        {
          type:'email',
          id:'email',
          name:'email',
          label:'Enter Email',
          data:signupData,
          error:error,
          updateData:handleSignupData,
          disable:disable
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password',
          data:signupData,
          error:error,
          updateData:handleSignupData,
          disable:disable
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
            message:'Please, Enter Password'
          },
          {
            length:6,
            message:'Password Must be contain atleast 6 char'
          },
          {
            pattern:/[a-zA-Z0-9]{6,30}/,
            message:'Password contains only UpperCase,lowerCase and Digit'
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
          
          const config = {
            method:'post',
            url:'users/SignUp',
            data:signupData
          }
          
          const res = await dispatch(fetchData(config));
        
          if(res.payload.statusCode === 400){
            toast.error('check once more something went wrong');
            setDisable(false);
            return;
          }
          if(res?.payload?.statusCode !== 200){
            toast.error('Email Already Exist Please Login');
            setDisable(false);
            return;
          }
          setImmediate(true);
          toast.success(res?.payload?.message);
          
          toast('Please Verify Your Email');
          dispatch(initiateSignupData());
         
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