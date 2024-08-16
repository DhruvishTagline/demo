import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handlePrevVisitedPage, handleResetPassword, initiateResetPassword } from '../redux-toolkit/slices/user';
import InputField from './InputField';
import { getCurrUserData } from '../Current User/currentUser';
import { fetchData } from '../redux-toolkit/slices/api';
import { validateField } from '../Validation/validation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPassword = useSelector(state => state.user.resetPassword);
    const error = useSelector(state => state.user.error);
    const status = useSelector(state => state.api.status);
    const {token,role} = getCurrUserData()

    useEffect(() => {
        dispatch(initiateResetPassword({}))
        dispatch(handlePrevVisitedPage(1))

        return () => {
            dispatch(initiateResetPassword({}))
        }
    },[dispatch])

    const ResetPasswordFields = [
        {
            type:'password',
            id:'oldPassword',
            name:'oldPassword',
            label:'Old Password',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
        {
            type:'password',
            id:'Password',
            name:'Password',
            label:'Password',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
        {
            type:'password',
            id:'ConfirmPassword',
            name:'ConfirmPassword',
            label:'Confirm Password',
            data:resetPassword,
            updateData:handleResetPassword,
            error:error
        },
    ]

    const validate = {
        oldPassword:[
            {
                required:true,
                message:'Please Enter Old Password'
            },
            {
                length:6,
                message:'Password Must be 6 char'
            },
            {
                pattern:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:'Enter Valid Password'
            }
        ],
        Password:[
            {
                required:true,
                message:'Please Enter Password'
            },
            {
                length:6,
                message:'Password Must be 6 char'
            },
            {
                pattern:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:'Enter Valid Password'
            }
        ],
        ConfirmPassword:[
            {
                required:true,
                message:'Please Enter Confirm Password'
            },
            {
                length:6,
                message:'Password Must be 6 char'
            },
            {
                match:true,
                comKey:resetPassword?.Password,
                message:'Password Do not Match'
            }
        ],
      }

    const handleReset = async() => {

        try{
            const error = validateField(resetPassword,validate)
            if(Object.keys(error).length !== 0){
                dispatch(handleError(error));
                return;
            }
            const config = {
                method:'post',
                url:'users/ResetPassword',
                data:resetPassword,
                headers: { "access-token":`${token}` }
            }
            const res = await dispatch(fetchData(config));
            if(res.payload.statusCode !== 200){
                toast(res?.payload?.message)
                return;
            }
            toast(res?.payload?.message)
            dispatch(initiateResetPassword());
            navigate(`/${role}/dashboard`);
        }catch(error){
            console.log('error', error)
        }
    }

    const handleCancel = () => {
        dispatch(initiateResetPassword({
            oldPassword:'',
            Password:'',
            ConfirmPassword:''
        }));
        
    }


  return (
    <div className='flex items-center flex-col mt-[70px]'>
        <p className='text-center mb-4 text-4xl'>Reset Password</p>
        {
            ResetPasswordFields.map((field,i) => <InputField fieldData={field} key={i}/>)
        }
        <div>
            <button 
            onClick={handleReset}
            disabled={status === 'loading'}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {
                    status === 'loading'? <span>Loading...</span> : <span>Reset</span>
                }
            </button>
            <button
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 ml-2"
            >Clear</button>
        </div>
    </div>
  )
}

export default ResetPassword