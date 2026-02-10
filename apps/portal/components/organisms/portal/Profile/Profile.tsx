'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { useAuth } from '@/lib/contexts/AuthContext';
import { authRepository } from '@/lib/repositories/authRepository';
import type { ProfileData } from '@/lib/repositories/authRepository';

export default function Profile() {
  const { userId, email, firstName, lastName, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const profileData = await authRepository.getProfile(userId);
        setProfile(profileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="py-10 px-5">
        <Alert severity="warning">Please log in to view your profile.</Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-10 px-5 flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-5">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  const displayProfile = profile || {
    id: userId,
    email: email || '',
    first_name: firstName || '',
    last_name: lastName || '',
    role: 'default' as const,
    created_at: undefined,
  };

  return (
    <div className="py-10 px-5" style={{ backgroundColor: '#050a1f', minHeight: '100vh' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="mb-8 text-4xl font-semibold text-white">My Profile</h2>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Name</label>
            <div className="text-white text-lg">
              {displayProfile.first_name} {displayProfile.last_name}
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <div className="text-white text-lg">{displayProfile.email}</div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Role</label>
            <div className="text-white text-lg capitalize">{displayProfile.role}</div>
          </div>

          {displayProfile.created_at && (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Member Since</label>
              <div className="text-white text-lg">
                {new Date(displayProfile.created_at).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
