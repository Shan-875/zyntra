import React, { useState } from 'react';
import { Request, RequestStatus } from '../../types';
import { useRequests } from '../../context/RequestContext';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Calendar, CheckCircle, XCircle, ArrowLeft, User, Mail } from 'lucide-react';

interface RequestDetailProps {
  requestId: string;
  onBack: () => void;
}

const RequestDetail: React.FC<RequestDetailProps> = ({ requestId, onBack }) => {
  const { getRequestById, updateRequestStatus, isLoading } = useRequests();
  const { user } = useAuth();
  const request = getRequestById(requestId);
  
  const [responseMessage, setResponseMessage] = useState('');
  const [responseError, setResponseError] = useState<string | undefined>();

  if (!request) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-slate-600">Request not found</p>
          <Button onClick={onBack} variant="secondary" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleUpdateStatus = async (status: RequestStatus) => {
    if (user?.role !== 'hod') return;
    
    if (status !== 'pending' && (!responseMessage || responseMessage.trim().length < 5)) {
      setResponseError('Please provide a response message (minimum 5 characters)');
      return;
    }
    
    try {
      await updateRequestStatus(requestId, status, responseMessage);
    } catch (error) {
      // Error is handled in RequestContext
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">{request.subject}</h2>
            <StatusBadge status={request.status} />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <User className="w-5 h-5 text-slate-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-slate-700">From</h3>
                <p className="text-sm text-slate-600">{request.studentName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-slate-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-slate-700">To</h3>
                <p className="text-sm text-slate-600">{request.recipientEmail}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-slate-500 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-slate-700">Submission Date</h3>
                <p className="text-sm text-slate-600">{formatDate(request.submissionDate)}</p>
              </div>
            </div>
            
            {request.responseDate && (
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-slate-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-slate-700">Response Date</h3>
                  <p className="text-sm text-slate-600">{formatDate(request.responseDate)}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-2">Request Content</h3>
            <div className="bg-slate-50 rounded-md p-4 whitespace-pre-line text-slate-700">
              {request.content}
            </div>
          </div>
          
          {request.responseMessage && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Response</h3>
              <div className="bg-slate-50 rounded-md p-4 whitespace-pre-line text-slate-700">
                {request.responseMessage}
              </div>
            </div>
          )}
          
          {user?.role === 'hod' && request.status === 'pending' && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Response Message</h3>
              <TextArea
                placeholder="Enter your response to this request..."
                value={responseMessage}
                onChange={(e) => {
                  setResponseMessage(e.target.value);
                  if (responseError) setResponseError(undefined);
                }}
                error={responseError}
                rows={4}
                fullWidth
              />
              
              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="danger"
                  onClick={() => handleUpdateStatus('rejected')}
                  isLoading={isLoading}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleUpdateStatus('approved')}
                  isLoading={isLoading}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestDetail;