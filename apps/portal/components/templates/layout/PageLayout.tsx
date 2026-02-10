'use client';

import React from 'react';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Navbar from '@/components/organisms/navigation/Navbar';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
