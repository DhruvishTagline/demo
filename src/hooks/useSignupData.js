import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSignupData, initiateSignupData } from "../redux-toolkit/slices/user";
import { validateField } from "../Validation/validation";
import { fetchData } from "../redux-toolkit/slices/api";
import { useNavigate } from "react-router";
import { EMAIL_REGEX, LOGIN_PAGE, NAME_REGEX, PASSWORD_REGEX, USERS_SIGN_UP_END_POINT } from "../utils/constant";
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
            pattern:NAME_REGEX,
            message:'Plaese, Enter Valid Name'
          }
        ],
        email: [
          {
            required:true,
            message:'Please Enter Email'
          },
          {
            pattern:EMAIL_REGEX,
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
            message:'Password Must be contain atleast 6 char'
          },
          {
            pattern:PASSWORD_REGEX,
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
            url:USERS_SIGN_UP_END_POINT,
            data:signupData
          }
          setDisable(true);
          const res = await dispatch(fetchData(config));
          if(res.payload.statusCode === 400){
            toast.error('check once more something went wrong');
            return;
          }
          if(res?.payload?.statusCode !== 200){
            toast.error('Email Already Exist Please Login');
            return;
          }
          toast.success(res?.payload?.message);
          toast('Please Verify Your Email');
          dispatch(initiateSignupData());
          navigate(LOGIN_PAGE,{replace:true});
       
        }catch(error){
          console.log('error', error)
        } finally {
          setDisable(false);
        }
      }
      
      
    return {
        signupField,
        disable,
        handleSignup
    }
}