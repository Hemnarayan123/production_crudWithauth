import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthToken';
import { ToastBar, toast } from 'react-hot-toast';

function ForgetPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const { tokenGetLocalStorage } = useAuth();

  

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/forget_password', { email })

    .then(res => {
      console.log("Response:", res);
      

      if (res.data && res.data.Status === "Success") {
        toast.success("Email send for Reset Password Successfully", {
          duration: 3000,
        });
        navigate(`/email_confirmation`);
      } else {
        console.log("Error: Response status is not success");
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen rgb(25, 22, 22)">
    <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center text-gray-100">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
          Send Reset Link
        </button>
      </form>
    </div>
  </div>
  );
}

export default ForgetPassword;

