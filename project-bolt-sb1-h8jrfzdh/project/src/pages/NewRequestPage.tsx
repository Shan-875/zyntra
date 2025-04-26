import React from 'react';
import RequestForm from '../components/requests/RequestForm';
import { useNavigate } from '../hooks/useNavigate';

const NewRequestPage: React.FC = () => {
  const { navigate } = useNavigate();
  
  const handleRequestSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Request</h1>
      <RequestForm onSuccess={handleRequestSuccess} />
    </div>
  );
};

export default NewRequestPage;