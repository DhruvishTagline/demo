import React from 'react'
import Pagination from './Pagination'
import { useNavigate } from 'react-router';

const CurrStudentDetail = ({currStudentDetail}) => {


  const navigate = useNavigate();
  const goBack = () => {
    navigate('/teacher/allstudent');
  }

  return (
    <div className='flex flex-col text-xl max-[350px]:text-lg'>
        <pre className='text-center'>Name: {currStudentDetail.name}</pre> 
        <pre className='text-center'>Email: {currStudentDetail.email}</pre> <br/>

        <div className='max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[600px]:w-[540px] max-[530px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px]'>
          <div className=" w-64 flex flex-row items-center justify-center gap-10  mr-auto ml-auto">
            <pre className="text-center">Result</pre>
            <button
              onClick={goBack}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
          </div>
          {
              currStudentDetail?.Result?.length > 0 ? 
              <Pagination data={currStudentDetail.Result} /> :
              <pre className='text-c enter mt-10 text-3xl text-red-500'>Result Not Found</pre>
          }
        </div>
    </div>
  )
}

export default CurrStudentDetail

