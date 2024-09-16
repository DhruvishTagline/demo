import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { ALL_EXAM } from '../utils/constant';

const ExamRestrictionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || 'An unknown error occurred';
  console.log('message :>> ', message);

  const handleBack = () => {
    navigate(ALL_EXAM);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl mb-8">{message}</p>
      <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back 
      </button>
    </div>
  );
}

export default ExamRestrictionPage