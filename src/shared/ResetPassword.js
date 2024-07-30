import React, { useState } from 'react'
import InputField from './InputField'

const ResetPassword = () => {

    const [resetPassword,setResetPassword] = useState("");

  return (
    <>
        <InputField 
            label="ResetPassword"
            type="text"
            id="reset-password"
            name="resetPassword"
            value={resetPassword}
            variant="outlined"
            placeholder=""

        />
    </>
  )
}

export default ResetPassword