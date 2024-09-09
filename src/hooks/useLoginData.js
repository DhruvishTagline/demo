import { useDispatch, useSelector } from "react-redux";
import { handleError, handleLogin, handleLoginData, initiateLoginData } from "../redux-toolkit/slices/user";
import { fetchData } from "../redux-toolkit/slices/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { setItemLocal } from "../utils/localStorageFunction";
import { validateField } from "../Validation/validation";
import { toast } from "react-toastify";

export const useLoginData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginData = useSelector(state => state.user.loginData);
    const error = useSelector(state => state.user.error);
    const [disable,setDisable] = useState(false);

    const loginField = [
        {
          type:'email',
          id:'email',
          name:'email',
          label:`Enter Email`,
          data:loginData,
          error:error,
          updateData:handleLoginData
        },
        {
          type:'password',
          id:'password',
          name:'password',
          label:'Enter Password',
          data:loginData,
          error:error,
          updateData:handleLoginData
        }
      ]
    
    const validate = {
        email: [
          {
            required:true,
            message:'Please Enter Email'
          },
          {
            pattern:/^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,
            message:'Enter Valid Email'
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
          
        ],
    }

    const handleSubmit = async() => {        
        try{
          const error = validateField(loginData,validate);
          if(Object.keys(error).length !== 0){
            dispatch(handleError(error));
            return;
          }
          setDisable(true);
          const config = {
            method:'post',
            url:'users/Login',
            data:loginData 
          }
          const res = await dispatch(fetchData(config));
      
          if(res?.payload?.statusCode === 500){
            toast.error(res?.payload?.message)   
            setDisable(false); 
            return;    
          }    
          if(res?.payload?.statusCode === 400){    
            toast.error(res?.payload?.message);       
            return;    
          }
          toast.success(res?.payload?.message)
             
          if (res?.payload?.statusCode === 200) {
            setItemLocal('userData', res?.payload?.data);
          }
          res?.payload?.statusCode !== 200 ? setItemLocal('login',false)  :setItemLocal('login',true);
          dispatch(handleLogin(true));    
          dispatch(initiateLoginData());       

          navigate(`/${res.payload.data.role}/dashboard`,{replace:true});
        }catch(error){
          setDisable(false);
          console.log('error', error);
        }
    }

    return {
        loginField,
        disable,
        handleSubmit
    }
}






