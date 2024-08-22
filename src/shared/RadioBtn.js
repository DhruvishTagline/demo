
import React from 'react';
import { useDispatch } from 'react-redux';
import { handleAnsIndexes } from '../redux-toolkit/slices/teacher';

const RadioBtn = ({fieldData}) => {
    
    const dispatch = useDispatch();
    // console.log('fieldData :>> ', fieldData);
    console.log('aaaaa',fieldData?.data?.[fieldData.id] === fieldData?.ans && fieldData?.ans  );
  return (
    <div>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        checked={fieldData?.data?.[fieldData.id] === fieldData?.ans && fieldData?.ans }  // feildData?.ans && .......
        onChange={(e) => {
            dispatch(handleAnsIndexes({
                currQuestion:fieldData.currQuestion,
                ansIndex:fieldData.opIndex
            }))
            
            const data = { 
                name:e?.target?.name,
                value:e?.target?.value,
                queIndex:fieldData?.currQuestion,
                opIndex:fieldData?.opIndex,
                ans:fieldData?.data[fieldData.id],
                ansIndex:fieldData.ansIndex,
            }
            console.log('data :>> ', data);
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border h-[10px] w-[10px]'
        />
    </div>
  )
}

export default RadioBtn
