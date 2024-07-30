import React, { useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

const NewPassword = () => {

    
    let [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get("token");
    console.log(token);

    const [password,setPassword]=useState();
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }   

    const [confirmPassword,setConfirmPassword]=useState();
    const handleConfirmPassword=(e)=>{
        setConfirmPassword(e.target.value);
    } 

    const setNewPassword =()=>{
        const res =axios.post('')
    }
    
  return (
    <>
        <div style={{marginTop:'5rem'}}></div>
        <label>Password :</label>
        <input type='text' value={password} name="email" onChange={handlePassword} style={{border:'solid black 1px'}}/>
        <label>Confirm Password :</label>
        <input type='text' value={confirmPassword} name="email" onChange={handleConfirmPassword} style={{border:'solid black 1px'}}/>
        <button 
          style={{width:'9rem'}}
          onClick={setNewPassword}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
         Set New Password 
        </button>
    </>
  )
}

export default NewPassword