import React from 'react';
import { Request, RequestStatus } from '../../types';
import StatusBadge from '../ui/StatusBadge';
import Card, { CardContent } from '../ui/Card';
import { Calendar, FileText } from 'lucide-react';

interface RequestsListProps {
  requests: Request[];
  title: string;
  emptyMessage: string;
  onRequestClick: (requestId: string) => void;
}

const RequestsList: React.FC<RequestsListProps> = ({
  requests,
  title,
  emptyMessage,
  onRequestClick
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>
      
      {requests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">{emptyMessage}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              onClick={() => onRequestClick(request.id)}
              className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium text-slate-900 mb-1 line-clamp-1">{request.subject}</h3>
                  <StatusBadge status={request.status} />
                </div>
                
                <div className="flex items-center text-sm text-slate-500 mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(request.submissionDate)}</span>
                </div>
                
                <p className="text-sm text-slate-700 line-clamp-2">
                  {request.content}
                </p>
                
                {request.responseMessage && request.status !== 'pending' && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">Response:</span> {request.responseMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsList;