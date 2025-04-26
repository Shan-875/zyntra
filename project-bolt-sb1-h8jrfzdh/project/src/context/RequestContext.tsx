import React, { createContext, useContext, useState, useEffect } from 'react';
import { Request, RequestStatus, User } from '../types';
import { mockRequests } from '../data/mockData';
import { useAuth } from './AuthContext';

interface RequestContextType {
  requests: Request[];
  userRequests: Request[];
  isLoading: boolean;
  error: string | null;
  submitRequest: (request: Omit<Request, 'id' | 'status' | 'submissionDate' | 'studentId' | 'studentName'>) => Promise<void>;
  updateRequestStatus: (requestId: string, status: RequestStatus, responseMessage?: string) => Promise<void>;
  getRequestById: (requestId: string) => Request | undefined;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get requests that belong to the current user (if student)
  const userRequests = user?.role === 'student' 
    ? requests.filter(req => req.studentId === user.id) 
    : requests;

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with mockData
        await new Promise(resolve => setTimeout(resolve, 600));
        setRequests(mockRequests);
      } catch (err) {
        setError('Failed to fetch requests');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  const submitRequest = async (requestData: Omit<Request, 'id' | 'status' | 'submissionDate' | 'studentId' | 'studentName'>) => {
    if (!user) {
      throw new Error('User must be logged in to submit a request');
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRequest: Request = {
        id: `req-${Date.now()}`,
        studentId: user.id,
        studentName: user.name,
        status: 'pending',
        submissionDate: new Date().toISOString(),
        ...requestData,
      };

      setRequests(prev => [newRequest, ...prev]);
      return Promise.resolve();
    } catch (err) {
      setError('Failed to submit request');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: RequestStatus, responseMessage?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { 
                ...req, 
                status, 
                responseDate: new Date().toISOString(),
                responseMessage: responseMessage || req.responseMessage
              } 
            : req
        )
      );
      return Promise.resolve();
    } catch (err) {
      setError('Failed to update request status');
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRequestById = (requestId: string) => {
    return requests.find(req => req.id === requestId);
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        userRequests,
        isLoading,
        error,
        submitRequest,
        updateRequestStatus,
        getRequestById,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = (): RequestContextType => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};