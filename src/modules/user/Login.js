
import React, { useEffect } from 'react';
import InputField from '../../shared/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useLoginData } from '../../hooks/useLoginData';
import { handleError, initiateLoginData } from '../../redux-toolkit/slices/user';


import { getCurrUserData } from '../../utils/currentUser';

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleError({}));
    return () => {
      dispatch(initiateLoginData());
    };
  }, [dispatch]); 

  const { loginField, handleSubmit } = useLoginData();
  let status = useSelector((state) => state.api.status);
  const role = getCurrUserData().role;
  const Login = JSON.parse(localStorage.getItem('login'));

  if (Login) {
    return <Navigate to={`/${role}/dashboard`} />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>


        <div className="space-y-4">
          {loginField.map((field, i) => (
            <InputField fieldData={field} key={i} />
          ))}
        </div>

        <div className="text-right mt-2">
          <Link to="/forget-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;





