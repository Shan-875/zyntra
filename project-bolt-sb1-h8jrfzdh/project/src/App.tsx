import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RequestProvider } from './context/RequestContext';
import { useNavigate } from './hooks/useNavigate';
import LoginPage from './pages/LoginPage';
import Header from './components/layout/Header';
import StudentDashboard from './pages/StudentDashboard';
import HodDashboard from './pages/HodDashboard';
import NewRequestPage from './pages/NewRequestPage';

// Main app component with context providers
const App: React.FC = () => {
  return (
    <AuthProvider>
      <RequestProvider>
        <AppContent />
      </RequestProvider>
    </AuthProvider>
  );
};

// Inner component that uses context
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { path, navigate } = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNavigate={navigate} currentPath={path} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {(() => {
          switch (path) {
            case '/dashboard':
              return user?.role === 'student' ? <StudentDashboard /> : <HodDashboard />;
            case '/new-request':
              return <NewRequestPage />;
            default:
              return user?.role === 'student' ? <StudentDashboard /> : <HodDashboard />;
          }
        })()}
      </main>
    </div>
  );
};

export default App;