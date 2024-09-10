import React from 'react';
import { useNavigate } from 'react-router';

import { getItemLocal } from '../utils/localStorageFunction';
import { LOGIN_PAGE } from '../utils/constant';
import { getCurrUserData } from '../utils/currentUser';

const ErrorPage = () => {
  const navigate = useNavigate();
  const login = getItemLocal('login');
  const { role } = getCurrUserData();

  const goBack = () => {
    if (login) {
      navigate(`${role}/dashboard`);
    } else {
      navigate(LOGIN_PAGE);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong!</h1>
        <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try again later.</p>
        <button
          onClick={goBack}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
