import React from 'react'
import InputField from '../shared/InputField';

const ShowExam = ({createExamFields,error,setCurrQuestion,currQuestion,validateExamData,validate,Options}) => {
    console.log("Shoe Exam",createExamFields);
   
    
    return (
        <>
            <div>ShowExam</div>
            <div>
            {
                createExamFields.map((field, i) => {
                    console.log("feildd",field);
                    if(field.type !== 'radio')
                    return <InputField fieldData={field} key={i} />

                    return <InputField fieldData={field} key={i}/>
                }
            )
            }
            </div>
        </>
    )
}

export default ShowExam