
// import {  TextField, IconButton } from '@mui/material';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import RadioBtn from './RadioBtn';

// const InputField = ({ fieldData, ansIndex, subjectName,Options, er }) => {

//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
  
// const opts =Object.values(Options);


//   const handleClickShowPassword = () => {
//     setShowPassword(prev => !prev);
//     console.log('showPassword :>> ', showPassword);
//   }

//   const inputType = fieldData?.type === 'password' && showPassword ? 'text' : fieldData?.type;

//   if(fieldData?.type === 'radio'){
//     return <RadioBtn ansIndex={ansIndex} fieldData={fieldData} />
//   }


//   return (
//     <div className='flex flex-col gap-2 mt-[10px]'>
//       <TextField
//         label={fieldData?.label}
//         type={inputType}
//         id={fieldData?.id}
//         name={fieldData?.name}
//         value={fieldData?.name === 'subjectName' ? subjectName  : fieldData?.data?.[fieldData?.name]}
//         disabled={fieldData?.disable}
//         variant="outlined"
//         placeholder={fieldData?.label}
//         InputLabelProps={{ shrink: true }}
//         required
//         onChange={
//           fieldData?.name === 'subjectName' ? (e) => {
//             const { name, value } = e.target;
//             dispatch(handleSubject({ name, value }));
//           } : (e) => {
//             const { name, value } = e.target;
//             const data = {
//               name: name,
//               value: value,
//               queIndex: fieldData?.currQuestion,
//               opIndex: fieldData?.opIndex,
//               ans: fieldData?.data?.[fieldData.id],
//               ansIndex: fieldData?.ansIndex
//             };
//             // console.log('fieldData :>> ', fieldData);
//             // console.log('fieldData?.optionArr:>> ', fieldData?.optionArr);
          

//             const errorObj = {};

//             const inputValue = e?.target?.value;
//             dispatch(fieldData.updateData(data));
            
            
//             if (opts.includes(inputValue)) {

//                 const ke=fieldData.name;  
//                 errorObj[ke]='Option is already Present';

//                 dispatch(fieldData.updateData(data));
//                 opts.forEach((opt, i) => {
//                   if (opt === inputValue) {
//                     errorObj[`op${i + 1}`] = 'Option is already present';
//                     console.log('errorObj :>> ', errorObj);
//                     dispatch(handleError({ ...errorObj })); 
//                   } else {
//                     errorObj[`op${i + 1}`] = '';
//                     dispatch(fieldData.updateData(data));
//                   }
//                 });
//             } 
//             else{
//                 errorObj[fieldData.name]='';
//                 console.log('errorObj :>> ', errorObj);
//                 dispatch(handleError({ ...errorObj }));
//                 // if(!fieldData?.optionArr.includes(inputValue)) {
//                 //   errorObj['op1']=''
//                 //   errorObj['op2']=''
//                 //   errorObj['op3']=''
//                 //   errorObj['op4']=''
//                 // }
//                 // console.log('errorObj :>> ', errorObj);
//                 // dispatch(handleError({ ...errorObj }));
//             }
            
//             // dispatch(handleError({ ...errorObj }));
            
            
            
            

//             // if(fieldData?.optionArr?.includes(e?.target?.value)) {
//             //   console.log('true');
//             //   dispatch(fieldData.updateData(data));
//             //   dispatch(handleError({ [fieldData.name]: 'Option is already present' }));
//             // }else{
//             //   console.log('false');
//             //   dispatch(fieldData.updateData(data));
//             //   console.log('fieldData?.optionArr :>> ', fieldData?.optionArr);
//             //   console.log('fieldData.name :>> ', fieldData.name);
//             //   dispatch(handleError({ [fieldData.name]: '' }));
//             // }
//             // dispatch(fieldData.updateData(data));
//           }
//         }
//         InputProps={{
//           endAdornment: fieldData?.type === 'password' && (
//             <IconButton
//               aria-label="toggle password visibility"
//               onClick={handleClickShowPassword}
//               edge="end"
//             >
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </IconButton>
//           )
//         }}
//       />
//       {fieldData?.error ? <span className='text-red-500 text-sm'>{fieldData?.error?.[fieldData?.name]}</span> : null}
//     </div>
//   );
// }

// export default InputField;

















import {  TextField, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSubject } from '../redux-toolkit/slices/teacher';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RadioBtn from './RadioBtn';

const InputField = ({ fieldData, ansIndex, subjectName,Options,currQuestion }) => {

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  let opts=[];
 
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
    console.log('showPassword :>> ', showPassword);
  }

  const inputType = fieldData?.type === 'password' && showPassword ? 'text' : fieldData?.type;

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
        value={fieldData?.name === 'subjectName' ? subjectName  : fieldData?.data?.[fieldData?.name]}
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
            dispatch(fieldData.updateData(data)); 

            let errorObj = {};
            const inputValue = e?.target?.value;

                if(Options){
                  opts=Object.values(Options);
                };
                errorObj[fieldData.name]='';    // check it is necessary or not
               
                const index = /\d$/g.exec(fieldData.name)?.[0]
                const updateOpt = opts?.map((opt, i) => i === index - 1 ? inputValue : opt);

                updateOpt.forEach((opt, i, arr) => {
                  
                  let isDuplicate = false;
                  arr.forEach((val, ind) => {

                    if (ind === i) {
                      return;
                    }
                    else if (val !== "" && opt === val) {
                      isDuplicate = true;
                    }
                  })
                  
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
}

export default InputField;



