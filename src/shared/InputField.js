import { Box, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { handleError } from '../redux-toolkit/slices/teacher';
import { fetchData } from '../redux-toolkit/slices/api';




const InputField = ({fieldData}) => {

    console.log("feildData",fieldData.updateData);
    const dispatch = useDispatch();

    
  return (
    <div className='flex flex-col gap-2 mt-[10px]'>
        
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
      >
        {
          fieldData.type==='text' ?
          <TextField 
        label={fieldData?.label}
        type={fieldData?.type}
        id={fieldData?.id}
        name={fieldData?.name}
        value={fieldData?.data?.[fieldData.name]}
        disabled={fieldData?.disable}
        variant="outlined"
        placeholder={fieldData?.label}
        InputLabelProps={{ shrink: true }}
        style={{
          width: fieldData.type !== 'radio'? '282px': 'auto',
          borderWidth: fieldData.type !== 'radio' ? '1px':'0px'
        } }
        
        onChange={(e) => {
            const {name,value} = e.target;
            
            let data = {
                name:name,
                value: value,
            }
            // if(fieldData?.optionArr?.includes(e?.target?.value)){
            //     const error = {};
            //     error[fieldData.name] = 'Option is Already Present';
            //     dispatch(fieldData.updateData(data))
            //     dispatch(handleError(error));
            //     return;
            // }
            dispatch(fieldData.updateData(fieldData.pa))
        }}
        /> :
          <input type='radio'/>
        }
      
      
    </Box>
        {
            fieldData?.error?.[fieldData.name] ? <span className='text-red-500 text-sm'>{fieldData?.error?.[fieldData.name]}</span> : null
        }
    </div>
  )
}

export default InputField