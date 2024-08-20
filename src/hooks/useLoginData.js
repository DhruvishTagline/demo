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
          const res = await dispatch(fetchData(config))
          
          if(res.payload.statusCode === 500){
            toast(res?.payload?.message)
            console.log(res?.payload?.message);    
            setDisable(false);    
            return;    
          }    
          if(res.payload.statusCode === 400){    
            toast(res?.payload?.message);    
            console.log(res?.payload?.message);    
            return;    
          }    
          toast('LogIn Successfully')
             
          setItemLocal('userData',res.payload.data);    
          setItemLocal('login',true)    
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







// import { useDispatch, useSelector } from "react-redux";
// import { handleError, handleLogin, initiateLoginData } from "../redux-toolkit/slices/user";
// import { fetchData } from "../redux-toolkit/slices/api";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { setItemLocal } from "../utils/localStorageFunction";
// import { validateField } from "../Validation/validation";
// import { toast } from "react-toastify";

// export const useLoginData = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [loginData, setLoginData] = useState({ email: '', password: '' });
//     const error = useSelector(state => state.user.error);
//     const [disable, setDisable] = useState(false);

//     const loginField = [
//         {
//             type: 'email',
//             id: 'email',
//             name: 'email',
//             label: 'Enter Email',
//             value: loginData.email,
//             error: error.email,
//             updateData: (e) => setLoginData(prev => ({ ...prev, email: e.target.value }))
//         },
//         {
//             type: 'password',
//             id: 'password',
//             name: 'password',
//             label: 'Enter Password',
//             value: loginData.password,
//             error: error.password,
//             updateData: (e) => setLoginData(prev => ({ ...prev, password: e.target.value }))
//         }
//     ];

//     const validate = {
//         email: [
//             { required: true, message: 'Please Enter Email' },
//             { pattern: /^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/, message: 'Enter Valid Email' }
//         ],
//         password: [
//             { required: true, message: 'Please Enter Password' }
//         ],
//     };

//     const handleSubmit = async () => {
//         try {
//             const errors = validateField(loginData, validate);
//             if (Object.keys(errors).length !== 0) {
//                 dispatch(handleError(errors));
//                 return;
//             }
//             setDisable(true);
//             const config = {
//                 method: 'post',
//                 url: 'users/Login',
//                 data: loginData
//             };
//             const res = await dispatch(fetchData(config));

//             if (res.payload.statusCode === 500 || res.payload.statusCode === 400) {
//                 toast(res.payload.message);
//                 setDisable(false);
//                 return;
//             }

//             toast('Login Successfully');
//             setItemLocal('userData', res.payload.data);
//             setItemLocal('login', true);
//             dispatch(handleLogin(true));
//             // dispatch(initiateLoginData());

//             navigate(`/${res.payload.data.role}/dashboard`, { replace: true });
//         } catch (error) {
//             setDisable(false);
//             console.log('error', error);
//         }
//     };

//     return {
//         loginField,
//         disable,
//         handleSubmit
//     };
// };


