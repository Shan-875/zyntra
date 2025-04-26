import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, LogOut, Mail, User } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPath }) => {
  const { user, logout } = useAuth();

  const navItems = user?.role === 'student' 
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: <FileText className="w-4 h-4 mr-2" /> },
        { path: '/new-request', label: 'New Request', icon: <Mail className="w-4 h-4 mr-2" /> },
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: <FileText className="w-4 h-4 mr-2" /> },
      ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-800 font-bold text-xl">RequestFlow</span>
            </div>
            <nav className="ml-6 flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    currentPath === item.path
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-800" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-slate-700">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role === 'student' ? `Student ID: ${user.studentId}` : 'Head of Department'}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="ml-2"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;