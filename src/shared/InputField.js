
import {  TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RadioBtn from './RadioBtn';

const InputField = ({ fieldData, ansIndex, subjectName, er }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
    console.log('showPassword :>> ', showPassword);
  }

  const inputType = fieldData?.type === 'password' && showPassword ? 'text' : fieldData?.type;
  console.log('inputType :>> ', inputType);
  
  if(fieldData?.type === 'radio'){
    return <RadioBtn ansIndex={ansIndex} fieldData={fieldData} />
  }

  return (
    <div className='flex flex-col gap-2 mt-[10px]'>
      <TextField
        label={fieldData?.label}
        type={inputType}
        id={fieldData?.id}
        name={fieldData?.name}
        value={fieldData?.name === 'subjectName' ? subjectName : fieldData?.data?.[fieldData?.name]}
        disabled={fieldData?.disable}
        variant="outlined"
        placeholder={fieldData?.label}
        InputLabelProps={{ shrink: true }}
        required
        onChange={
          fieldData?.name === 'subjectName' ? (e) => {
            const { name, value } = e.target;
            dispatch(handleSubject({ name, value }));
          } : (e) => {
            const { name, value } = e.target;
            const data = {
              name: name,
              value: value,
              queIndex: fieldData?.currQuestion,
              opIndex: fieldData?.opIndex,
              ans: fieldData?.data?.[fieldData.id],
              ansIndex: fieldData?.ansIndex
            };

            if(fieldData?.optionArr?.includes(e?.target?.value)) {
              dispatch(fieldData.updateData(data));
              dispatch(handleError({ [fieldData.name]: 'Option is already present' }));
              return;
            }
            dispatch(handleError({ [fieldData.name]: '' }));
            dispatch(fieldData.updateData(data));
          }
        }
        InputProps={{
          endAdornment: fieldData?.type === 'password' && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )
        }}
      />
      {fieldData?.error ? <span className='text-red-500 text-sm'>{fieldData?.error?.[fieldData?.name]}</span> : null}
    </div>
  );
}

export default InputField;
