'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { adminService } from '@/lib/services/adminService';
import { useAuth } from '@/lib/contexts/AuthContext';
import type { UserRole } from '@/lib/repositories/authRepository';
import type { UserSearchResult } from '@/lib/repositories/adminRepository';

interface AdminStats {
  totalMembers: number;
  mentors: number;
  mentees: number;
  execs: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState<UserSearchResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('default');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userRole, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Admin page - isAuthenticated:', isAuthenticated, 'userRole:', userRole);
    
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting...');
      router.push('/');
      return;
    }

    if (userRole !== 'admin') {
      console.log('User role is not admin:', userRole, 'redirecting...');
      router.push('/');
      return;
    }

    console.log('User is admin, loading stats...');
    loadStats();
  }, [isAuthenticated, userRole, router]);

  const loadStats = async () => {
    try {
      const result = await adminService.getStats();
      if (result.success && result.data) {
        setStats(result.data);
        setError(''); // Clear any previous errors
      } else {
        const errorMsg = result.error || 'Failed to load stats';
        console.error('Failed to load stats:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error loading stats:', err);
      setError(errorMsg);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const result = await adminService.searchUserByEmail(searchEmail.trim());

    if (result.success) {
      if (result.data) {
        setSearchResult(result.data);
        setSelectedRole(result.data.role);
      } else {
        setError('No user found with that email');
        setSearchResult(null);
      }
    } else {
      setError(result.error || 'Failed to search user');
      setSearchResult(null);
    }

    setLoading(false);
  };

  const handleUpdateRole = async () => {
    if (!searchResult) {
      setError('Please search for a user first');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const result = await adminService.updateUserRole(searchResult.id, selectedRole);

    if (result.success) {
      setSuccess(`User role updated to ${selectedRole}`);
      setSearchResult({ ...searchResult, role: selectedRole });
      loadStats(); // Refresh stats
    } else {
      setError(result.error || 'Failed to update role');
    }

    setLoading(false);
  };

  // Show debug info if not admin
  if (!isAuthenticated || userRole !== 'admin') {
    return (
      <>
        <div className="py-10 px-5" style={{ backgroundColor: '#050a1f', minHeight: '100vh' }}>
          <div className="max-w-6xl mx-auto">
            <Card className="bg-red-900 p-6">
              <Typography variant="h5" className="text-white mb-4">
                Access Denied
              </Typography>
              <Typography variant="body1" className="text-white mb-2">
                You need admin privileges to access this page.
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Current status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Your role: {userRole || 'none'}
              </Typography>
              <Typography variant="body2" className="text-gray-300 mt-4">
                Required role: admin
              </Typography>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="py-10 px-5" style={{ backgroundColor: '#020B2C', minHeight: '100vh' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-4xl font-semibold text-white text-center">Admin Dashboard</h1>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card 
                sx={{ 
                  backgroundColor: '#1F2937',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9CA3AF', mb: 2 }}>
                    Total Members
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {stats.totalMembers}
                  </Typography>
                </CardContent>
              </Card>
              <Card 
                sx={{ 
                  backgroundColor: '#1F2937',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9CA3AF', mb: 2 }}>
                    Mentors
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {stats.mentors}
                  </Typography>
                </CardContent>
              </Card>
              <Card 
                sx={{ 
                  backgroundColor: '#1F2937',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9CA3AF', mb: 2 }}>
                    Mentees
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {stats.mentees}
                  </Typography>
                </CardContent>
              </Card>
              <Card 
                sx={{ 
                  backgroundColor: '#1F2937',
                  color: 'white',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#9CA3AF', mb: 2 }}>
                    Execs
                  </Typography>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {stats.execs}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search and Role Management Section */}
          <Card 
            sx={{ 
              backgroundColor: '#1F2937',
              color: 'white',
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
              User Management
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2, 
                  backgroundColor: '#7F1D1D', 
                  color: 'white',
                  '& .MuiAlert-icon': { color: 'white' },
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 2, 
                  backgroundColor: '#14532D', 
                  color: 'white',
                  '& .MuiAlert-icon': { color: 'white' },
                }}
              >
                {success}
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex gap-4">
                <TextField
                  fullWidth
                  label="Search by Email"
                  placeholder="Enter email address"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#374151',
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255, 255, 255, 0.5)' },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-[#76a36d] hover:bg-[#5d8a55] text-white normal-case"
                  sx={{
                    backgroundColor: '#76a36d',
                    '&:hover': { backgroundColor: '#5d8a55' },
                  }}
                >
                  Search
                </Button>
              </div>

              {searchResult && (
                <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Name
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {searchResult.first_name} {searchResult.last_name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Email
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {searchResult.email}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Current Role
                    </Typography>
                    <Typography variant="body1" className="text-white capitalize">
                      {searchResult.role}
                    </Typography>
                  </div>
                  <div className="flex gap-4 items-end">
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Change Role</InputLabel>
                      <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        label="Change Role"
                        sx={{
                          backgroundColor: '#374151',
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#76a36d',
                          },
                          '& .MuiSvgIcon-root': {
                            color: 'white',
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: '#374151',
                              color: 'white',
                              '& .MuiMenuItem-root': {
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: '#4B5563',
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="mentor">Mentor</MenuItem>
                        <MenuItem value="mentee">Mentee</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      onClick={handleUpdateRole}
                      disabled={loading || selectedRole === searchResult.role}
                      className="bg-[#6C9A5C] hover:bg-[#8BC677] text-white normal-case"
                      sx={{
                        backgroundColor: '#6C9A5C',
                        '&:hover': { backgroundColor: '#8BC677' },
                      }}
                    >
                      {loading ? 'Updating...' : 'Update Role'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
