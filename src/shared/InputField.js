
import { Box, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
import RadioBtn from './RadioBtn';



const InputField = ({fieldData,ansIndex,subjectName}) => {
  

    
    const dispatch = useDispatch();
   
    if(fieldData?.type === 'radio'){
      return <RadioBtn ansIndex={ansIndex} fieldData={fieldData} />
    }
    
  return (
    <div className='flex flex-col gap-2 mt-[10px]'>
      <TextField 
        label={fieldData?.label}
        type={fieldData?.type}
        id={fieldData?.id}
        name={fieldData?.name}
        value= { fieldData?.name ==='subjectName' ? subjectName : fieldData?.data?.[fieldData.name] }  
        disabled={ fieldData?.disable}
        variant="outlined"
        placeholder={fieldData?.label}
        InputLabelProps={{ shrink: true }}
       
        onChange={
          fieldData?.name ==='subjectName' ?(e)=>{
            const {name,value}=e.target;
            
            dispatch(handleSubject({name,value}))
          }:
          
          (e) => {
            const {name,value} = e.target;
            let data = { 
                name:name,
                value: value,
                queIndex:fieldData?.currQuestion,
                opIndex:fieldData?.opIndex,
                ans:fieldData?.data?.[fieldData.id],
                ansIndex:fieldData?.ansIndex
            }            
            if(fieldData?.optionArr?.includes(e?.target?.value)){
                const error = {};
                error[fieldData.name] = 'Option is Already Present';
                
                dispatch(fieldData.updateData(data))
                dispatch(handleError(error));
                return;
            }            
            dispatch(fieldData.updateData(data))
          } 
        }
        />      
        {
            fieldData?.error?.[fieldData.name] ? <span className='text-red-500 text-sm'>{fieldData?.error?.[fieldData.name]}</span> : null
        }
    </div>
  )
}

export default InputField


