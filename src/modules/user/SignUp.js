import React, { useEffect } from 'react'
import InputField from '../../shared/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSignupData, initiateSignupData } from '../../redux-toolkit/slices/user'
import DropDown from '../../shared/DropDown'
import { Link, Navigate } from 'react-router-dom'
import { useSignupData } from '../../hooks/useSignupData'
import { getCurrUserData } from '../../Current User/currentUser'

const SignUp = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleError({}));

    return () => {
      dispatch(initiateSignupData())
    }
  }, [dispatch])

  const { signupField, handleSignup } = useSignupData();
  const status = useSelector(state => state.api.status);
  const Login = JSON.parse(localStorage.getItem('login'));
  const role = getCurrUserData().role;

  const dropDownOptions = ['student', 'teacher'];

  if (Login) {
    return <Navigate to={`/${role}/dashboard`} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h1>

        <div className="space-y-4">
          {signupField.map((field, i) => (
            <InputField fieldData={field} key={i} />
          ))}
        </div>

        <DropDown dropDownOptions={dropDownOptions} name={'role'} updateData={handleSignupData} />

        <button
          onClick={handleSignup}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          {status === 'loading' ? 'Signing up...' : 'Sign Up'}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
