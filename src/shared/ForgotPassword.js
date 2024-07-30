import React, { useEffect, useState } from 'react'

import axios from 'axios';

const ForgotPassword = () => {

    const [email,setEmail] =useState("");
    const handleChange=(e)=>{
        console.log("handlechange",e.target.value);
        setEmail(e.target.value)
    }
    const postEmail =async()=>{ 
        const res = await axios.post('https://examination.onrender.com/users/ForgotPassword',
            {
                email:email
            }
        );
        console.log("res",res);
    }  

    useEffect(()=>{
         
       
    },[])


    // const feildData= {
    //     type:'email',
    //     id:'email',
    //     name:'email',
    //     label:`Enter Email`,
    //     data:email,
    //     updateData:handleChange
    //   }
  return (
    <>
        <div style={{marginTop:'5rem'}}></div>
        <label>Email :</label>
        <input type='text' value={email} name="email" onChange={handleChange} style={{border:'solid black 1px'}}/>
        <button
          onClick={postEmail}
          style={{width:'9rem'}}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Send Email
        </button>
    </>
  )
}

export default ForgotPassword