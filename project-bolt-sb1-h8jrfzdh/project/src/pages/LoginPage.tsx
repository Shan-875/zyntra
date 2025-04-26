import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import { Mail } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="mb-8 flex items-center text-blue-800">
            <Mail className="h-8 w-8 mr-2" />
            <h1 className="text-3xl font-bold">RequestFlow</h1>
          </div>
          <p className="text-slate-600 mb-8 text-center max-w-md">
            A streamlined system for students to submit formal requests to the Head of Department
          </p>
          {showSignUp ? (
            <SignUpForm onBack={() => setShowSignUp(false)} />
          ) : (
            <LoginForm onSignUpClick={() => setShowSignUp(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;