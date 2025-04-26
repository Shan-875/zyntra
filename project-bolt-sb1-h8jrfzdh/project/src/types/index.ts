// Define types for the application

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'hod';
  department?: string;
  studentId?: string;
};

export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type Request = {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  content: string;
  recipientEmail: string;
  status: RequestStatus;
  submissionDate: string;
  responseDate?: string;
  responseMessage?: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};