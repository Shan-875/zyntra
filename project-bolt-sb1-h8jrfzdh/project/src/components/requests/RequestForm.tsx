import React, { useState } from 'react';
import { useRequests } from '../../context/RequestContext';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Send } from 'lucide-react';

interface RequestFormProps {
  onSuccess?: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }) => {
  const [subject, setSubject] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{
    subject?: string;
    recipientEmail?: string;
    content?: string;
  }>({});
  
  const { submitRequest, isLoading } = useRequests();

  const validateForm = () => {
    const newErrors: {
      subject?: string;
      recipientEmail?: string;
      content?: string;
    } = {};
    
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      newErrors.recipientEmail = 'Invalid email format';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Request content is required';
    } else if (content.trim().length < 20) {
      newErrors.content = 'Request content should be at least 20 characters';
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
      await submitRequest({
        subject,
        recipientEmail,
        content
      });
      
      // Clear form after successful submission
      setSubject('');
      setRecipientEmail('');
      setContent('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled in RequestContext
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-slate-900">New Request Letter</h2>
        <p className="text-sm text-slate-600 mt-1">
          Complete this form to submit a formal request letter to the Head of Department
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            label="Subject"
            type="text"
            placeholder="Enter the subject of your request"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={errors.subject}
            fullWidth
            required
          />
          
          <Input
            label="Recipient Email"
            type="email"
            placeholder="Enter recipient's email address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            error={errors.recipientEmail}
            fullWidth
            required
          />
          
          <TextArea
            label="Request Content"
            placeholder="Enter the details of your request..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={errors.content}
            rows={8}
            fullWidth
            required
          />
          
          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <p className="text-xs text-slate-500">
          Your request will be reviewed by the Head of Department. You will receive a notification once a decision has been made.
        </p>
      </CardFooter>
    </Card>
  );
};

export default RequestForm;