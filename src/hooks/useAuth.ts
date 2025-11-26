'use client';

import { IUserAuth } from '@/types/global';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<IUserAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to load user from localStorage:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoggedIn, isLoading };
}
