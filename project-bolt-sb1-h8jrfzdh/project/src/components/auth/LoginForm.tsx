import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { School } from 'lucide-react';

interface LoginFormProps {
  onSignUpClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignUpClick }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ studentId?: string; password?: string }>({});
  
  const { login, isLoading, error } = useAuth();

  const validateForm = () => {
    const newErrors: { studentId?: string; password?: string } = {};
    
    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID or Email is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(studentId, password);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <School className="h-6 w-6 text-blue-800" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter your credentials to access the request letter system
        </p>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Student ID or Email"
            type="text"
            placeholder="Enter your student ID or email"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            error={errors.studentId}
            fullWidth
            required
            autoFocus
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            fullWidth
            required
          />
          
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-700 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              fullWidth
            >
              Sign in
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onSignUpClick}
              fullWidth
            >
              Create new account
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="text-center">
        <p className="text-sm text-slate-600">
          For demo purposes, use: <br/>
          <span className="font-medium">Students:</span><br/>
          <span className="font-medium">S12345 / john@example.edu</span><br/>
          <span className="font-medium">S67890 / jane@example.edu</span><br/>
          <span className="font-medium">S13579 / michael@example.edu</span><br/>
          <span className="font-medium">S24680 / sarah@example.edu</span><br/>
          <span className="font-medium">S11223 / david@example.edu</span><br/>
          <span className="font-medium">HODs:</span><br/>
          <span className="font-medium">robert@example.edu (CS)</span><br/>
          <span className="font-medium">emily@example.edu (EE)</span><br/>
          <span className="font-medium">james@example.edu (ME)</span><br/>
          <span className="font-medium">Password: password123</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;