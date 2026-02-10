'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { authRepository, type ProfileData } from '../repositories/authRepository';

interface AuthContextType {
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  userRole: null,
  isAuthenticated: false,
  isLoading: true,
  refreshAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextType>({
    userId: null,
    email: null,
    firstName: null,
    lastName: null,
    userRole: null,
    isAuthenticated: false,
    isLoading: true,
    refreshAuth: async () => {},
  });

  const loadUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const profile = await authRepository.getProfile(session.user.id);
        
        if (profile) {
          setAuthState(prev => ({
            ...prev,
            userId: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            userRole: profile.role,
            isAuthenticated: true,
            isLoading: false,
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            userId: session.user.id,
            email: session.user.email || null,
            firstName: (session.user.user_metadata?.first_name as string) || null,
            lastName: (session.user.user_metadata?.last_name as string) || null,
            userRole: 'default',
            isAuthenticated: true,
            isLoading: false,
          }));
        }
      } else {
        setAuthState(prev => ({
          ...prev,
          userId: null,
          email: null,
          firstName: null,
          lastName: null,
          userRole: null,
          isAuthenticated: false,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await loadUser();
        } else if (event === 'SIGNED_OUT') {
          setAuthState(prev => ({
            ...prev,
            userId: null,
            email: null,
            firstName: null,
            lastName: null,
            userRole: null,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshAuth = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider value={{ ...authState, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
