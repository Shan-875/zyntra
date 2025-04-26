import { useState, useCallback } from 'react';

export const useNavigate = () => {
  const [path, setPath] = useState('/dashboard');

  const navigate = useCallback((newPath: string) => {
    setPath(newPath);
  }, []);

  return { path, navigate };
};