import { TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RadioBtn from './RadioBtn';

const InputField = ({ fieldData, ansIndex, subjectName, Options,flag }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  let opts = [];

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const inputType = fieldData?.type === 'password' && showPassword ? 'text' : fieldData?.type;

  if (fieldData?.type === 'radio') {
    return <RadioBtn ansIndex={ansIndex} fieldData={fieldData} />;
  }

  return (
    <div className='flex flex-col gap-2 mt-[10px]'>
      <TextField
        label={fieldData?.label}
        type={flag ?'text':inputType}
        id={fieldData?.id}
        name={fieldData?.name}
        value={fieldData?.name === 'subjectName' ? subjectName : fieldData?.data?.[fieldData?.name]}
        disabled={fieldData?.disable}
        variant={flag?"standard":"outlined"}
        placeholder={fieldData?.label}
        InputLabelProps={{ shrink: true }}
        style={{ width: '20rem', fontSize: '1.3rem' }} 
        required={fieldData?.required}
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
            dispatch(fieldData.updateData(data));

            let errorObj = {};
            const inputValue = e?.target?.value;

            if (Options) {
              opts = Object.values(Options);
            }

            const index = /\d$/g.exec(fieldData.name)?.[0];
            const updateOpt = opts?.map((opt, i) => i === index - 1 ? inputValue : opt);

            updateOpt.forEach((opt, i, arr) => {
              let isDuplicate = false;
              arr.forEach((val, ind) => {
                if (ind === i) {
                  return;
                } else if (val !== "" && opt === val) {
                  isDuplicate = true;
                }
              });

              if (isDuplicate) {
                errorObj[`op${i + 1}`] = `Option is already present`;
              } else {
                errorObj[`op${i + 1}`] = ``;
              }
            });

            dispatch(handleError(errorObj));
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
};

export default InputField;
