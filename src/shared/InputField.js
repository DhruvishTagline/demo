
import { Box, TextField } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
import RadioBtn from './RadioBtn';

const InputField = ({fieldData,ansIndex,subjectName,er}) => {
  
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
        disabled={fieldData?.disable}
        variant="outlined"
        placeholder={fieldData?.label}
        InputLabelProps={{ shrink: true }}
       
        onChange={
          fieldData?.name ==='subjectName' ?(e)=>{
            const {name,value}=e.target;
            dispatch(handleSubject({name,value}))
          }:(e) => {
            const {name,value} = e.target;
            const data = { 
                name:name,
                value: value,
                queIndex:fieldData?.currQuestion,
                opIndex:fieldData?.opIndex,
                ans:fieldData?.data?.[fieldData.id],
                ansIndex:fieldData?.ansIndex
            }            
            console.log('fieldData.optionArr :>> ', fieldData.optionArr);
            console.log('fieldData?.optionArr?.includes(e?.target?.value :>> ', fieldData?.optionArr?.includes(e?.target?.value));
            if(fieldData?.optionArr?.includes(e?.target?.value)){
                console.log('include-con');
                // const error = {};
                // console.log('onChange error :>> ', error);
                // error[fieldData.name] = 'Option is Already Present';

                dispatch(fieldData.updateData(data));
                dispatch(handleError({[fieldData.name]:'option is already present'}));
                return;
            }     
            dispatch(handleError({[fieldData.name]:''}));       
            dispatch(fieldData.updateData(data))
          } 
        }
        />     
        {
            fieldData?.error ? <span className='text-red-500 text-sm'>{fieldData?.error?.[fieldData.name]}</span> : null
        }
    </div>
  )
}

export default InputField


