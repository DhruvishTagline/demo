
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAnsIndexes } from '../redux-toolkit/slices/teacher';

const RadioBtn = ({fieldData}) => {

    console.log('feildData :>> ', fieldData);
    const dispatch = useDispatch()
    const eData=useSelector(state=>state.teacher.createExam);
    
    const ansIndex= eData?.questions?.reduce((acc,curr)=>{
        const ansIndex =curr.options.findIndex(option=>option === curr.answer);
        acc.push(ansIndex);
        return acc;
    },[])
               
  return (
    <div>
        <input 
        type={fieldData.type}
        id={fieldData.id}
        name={fieldData.name}
        checked={fieldData?.data?.[fieldData.id] === fieldData?.ans && ansIndex?.[fieldData.currQuestion] === fieldData?.opIndex }
        onChange={(e) => {
            dispatch(handleAnsIndexes({
                currQuestion:fieldData.currQuestion,
                ansIndex:fieldData.opIndex
            }))
            
            let data = {
                name:e?.target?.name,
                value:e?.target?.value,
                queIndex:fieldData?.currQuestion,
                opIndex:fieldData?.opIndex,
                ans:fieldData?.data[fieldData.id],
                ansIndex:fieldData.ansIndex
            }
            
            dispatch(fieldData.updateData(data))
        }}
        className='border-black border'
        />
    </div>
  )
}

export default RadioBtn

