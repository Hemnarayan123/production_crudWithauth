import React from 'react';
import { Link } from 'react-router-dom';

function EmailConfirmation() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Check Your Email</h2>
        <p className="mt-4 text-center text-gray-600">
          We have sent a password reset link to your email. Please check your email and follow the instructions to reset your password.
        </p>
        <div className="mt-6 text-center">
          <Link to="/signin" className="text-blue-500 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
