import React, { useState } from 'react';
import { useRequests } from '../context/RequestContext';
import RequestsList from '../components/requests/RequestsList';
import RequestDetail from '../components/requests/RequestDetail';

const StudentDashboard: React.FC = () => {
  const { userRequests } = useRequests();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  
  // Sort requests by submission date (newest first)
  const sortedRequests = [...userRequests].sort((a, b) => 
    new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
  );
  
  // Filter requests by status
  const pendingRequests = sortedRequests.filter(req => req.status === 'pending');
  const completedRequests = sortedRequests.filter(req => req.status !== 'pending');

  const handleRequestClick = (requestId: string) => {
    setSelectedRequestId(requestId);
  };

  const handleBackClick = () => {
    setSelectedRequestId(null);
  };

  if (selectedRequestId) {
    return <RequestDetail requestId={selectedRequestId} onBack={handleBackClick} />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">My Requests</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RequestsList
            requests={pendingRequests}
            title="Pending Requests"
            emptyMessage="No pending requests found."
            onRequestClick={handleRequestClick}
          />
          
          <RequestsList
            requests={completedRequests}
            title="Completed Requests"
            emptyMessage="No completed requests found."
            onRequestClick={handleRequestClick}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;