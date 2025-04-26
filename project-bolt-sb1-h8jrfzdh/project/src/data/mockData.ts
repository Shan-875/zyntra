import { User, Request } from '../types';

// Mock data for demonstration purposes
export const mockUsers: User[] = [
  {
    id: 'stud-1',
    name: 'John Doe',
    email: 'john@example.edu',
    studentId: 'S12345',
    role: 'student',
    department: 'Computer Science'
  },
  {
    id: 'stud-2',
    name: 'Jane Smith',
    email: 'jane@example.edu',
    studentId: 'S67890',
    role: 'student',
    department: 'Electrical Engineering'
  },
  {
    id: 'stud-3',
    name: 'Michael Johnson',
    email: 'michael@example.edu',
    studentId: 'S13579',
    role: 'student',
    department: 'Mechanical Engineering'
  },
  {
    id: 'stud-4',
    name: 'Sarah Williams',
    email: 'sarah@example.edu',
    studentId: 'S24680',
    role: 'student',
    department: 'Civil Engineering'
  },
  {
    id: 'stud-5',
    name: 'David Brown',
    email: 'david@example.edu',
    studentId: 'S11223',
    role: 'student',
    department: 'Computer Science'
  },
  {
    id: 'hod-1',
    name: 'Dr. Robert Williams',
    email: 'robert@example.edu',
    role: 'hod',
    department: 'Computer Science'
  },
  {
    id: 'hod-2',
    name: 'Dr. Emily Davis',
    email: 'emily@example.edu',
    role: 'hod',
    department: 'Electrical Engineering'
  },
  {
    id: 'hod-3',
    name: 'Dr. James Wilson',
    email: 'james@example.edu',
    role: 'hod',
    department: 'Mechanical Engineering'
  }
];

export const mockRequests: Request[] = [
  {
    id: 'req-1',
    studentId: 'stud-1',
    studentName: 'John Doe',
    subject: 'Permission for Late Assignment Submission',
    content: 'Dear Sir/Madam,\n\nI am writing to request an extension for my assignment due to health issues. I was hospitalized last week and have medical documentation to support my request.\n\nThank you for your consideration.\n\nSincerely,\nJohn Doe',
    recipientEmail: 'robert@example.edu',
    status: 'approved',
    submissionDate: '2025-02-15T09:00:00Z',
    responseDate: '2025-02-16T14:30:00Z',
    responseMessage: 'Request approved. Please submit your assignment by the end of next week.'
  },
  {
    id: 'req-2',
    studentId: 'stud-1',
    studentName: 'John Doe',
    subject: 'Request for Research Lab Access',
    content: 'Dear Sir/Madam,\n\nI would like to request access to the research lab for my final year project work. I need to use the equipment for data collection and analysis.\n\nThank you.\n\nRegards,\nJohn Doe',
    recipientEmail: 'robert@example.edu',
    status: 'pending',
    submissionDate: '2025-03-10T11:15:00Z'
  },
  {
    id: 'req-3',
    studentId: 'stud-2',
    studentName: 'Jane Smith',
    subject: 'Request for Course Change',
    content: 'Dear Sir/Madam,\n\nI am writing to request a change from my current course to the Advanced Database Systems course. The current course overlaps with another core requirement.\n\nThank you for your assistance.\n\nSincerely,\nJane Smith',
    recipientEmail: 'robert@example.edu',
    status: 'rejected',
    submissionDate: '2025-03-05T08:20:00Z',
    responseDate: '2025-03-07T13:45:00Z',
    responseMessage: 'Request denied. The course change period has ended. Please consult with your academic advisor for alternatives.'
  },
  {
    id: 'req-4',
    studentId: 'stud-2',
    studentName: 'Jane Smith',
    subject: 'Request for Reference Letter',
    content: 'Dear Sir/Madam,\n\nI am applying for a graduate program and would like to request a reference letter. I have taken three courses with you and received excellent grades.\n\nThank you for considering my request.\n\nBest regards,\nJane Smith',
    recipientEmail: 'robert@example.edu',
    status: 'pending',
    submissionDate: '2025-03-12T15:30:00Z'
  },
];