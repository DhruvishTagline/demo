import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleAnsIndexes } from '../redux-toolkit/slices/teacher';

const RadioBtn = ({ fieldData }) => {
    const dispatch = useDispatch();
    const eData = useSelector(state => state.teacher.createExam);

    console.log('eData :>> ', eData);

   
    const ansIndex = Array.isArray(eData?.questions)
        ? eData.questions.map(curr => curr.options.findIndex(option => option === curr.answer))
        : [];

    console.log(ansIndex);

    return (
        <div>
            <input 
                type={fieldData.type}
                id={fieldData.id}
                name={fieldData.name}
                checked={
                    fieldData?.data?.[fieldData.id] === fieldData?.ans && 
                    ansIndex?.[fieldData.currQuestion] === fieldData?.opIndex
                }
                onChange={(e) => {
                    dispatch(handleAnsIndexes({
                        currQuestion: fieldData.currQuestion,
                        ansIndex: fieldData.opIndex
                    }));

                    let data = {
                        name: e?.target?.name,
                        value: e?.target?.value,
                        queIndex: fieldData.currQuestion,
                        opIndex: fieldData.opIndex,
                        ans: fieldData.data[fieldData.id],
                        ansIndex: ansIndex // Updated to use the calculated ansIndex
                    };
                    
                    dispatch(fieldData.updateData(data));
                }}
                className='border-black border'
            />
        </div>
    );
}

export default memo(RadioBtn);
