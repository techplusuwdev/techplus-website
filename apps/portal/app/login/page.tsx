'use client';

import React, { useState } from 'react';
import { TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import Image from 'next/image';
import { authService } from '@/lib/services/authService';

const leftLeafPath = '/assets/images/left-leaf-portal.svg';
const rightLeafPath = '/assets/images/right-leaf-portal.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authService.signIn({ email, password });

    if (result.success) {
      // Full reload so AuthProvider picks up the new session and home shows logged-in state
      window.location.href = '/';
      return;
    }

    setError(result.error || 'Failed to sign in');
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setError('');
    setLoading(true);

    const result = await authService.resetPassword(email);

    if (result.success) {
      window.location.href = '/login/check-email';
      return;
    }

    setError(result.error || 'Failed to send reset email');
    setLoading(false);
  };

  return (
    <>
      <div
        className="min-h-screen py-20 pb-60 px-4 overflow-hidden"
        style={{
          background: 'linear-gradient(168.48deg, #FFFFFF 32.06%, rgba(255, 238, 194, 0.4) 77.51%)',
        }}
      >
        <div className="relative">
          <div className="hidden md:block absolute top-[30vh] left-0">
            <Image
              src={leftLeafPath}
              alt=""
              width={456}
              height={554}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
          </div>
          <div className="hidden md:block absolute top-0 right-0 -mt-[15vh]">
            <Image
              src={rightLeafPath}
              alt=""
              width={451}
              height={615}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
          </div>

          <div className="max-w-md mx-auto relative z-10 pt-8">
            <h1 className="text-4xl font-semibold text-[#050a1f] mb-2">Sign in</h1>
            <p className="text-[#0A1628] text-sm mb-8">Sign in to your Tech+ account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert severity="error" sx={{ bgcolor: 'rgba(185, 28, 28, 0.15)', color: '#0A1628' }}>
                  {error}
                </Alert>
              )}

              <div>
                <label className="block text-[#0A1628] font-medium mb-2">Email</label>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      '& fieldset': { borderColor: 'rgba(10, 22, 40, 0.2)' },
                      '&:hover fieldset': { borderColor: '#76a36d' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d', borderWidth: '2px' },
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-[#0A1628] font-medium mb-2">Password</label>
                <TextField
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size="medium"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#0A1628' }}
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      '& fieldset': { borderColor: 'rgba(10, 22, 40, 0.2)' },
                      '&:hover fieldset': { borderColor: '#76a36d' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d', borderWidth: '2px' },
                    },
                  }}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#76a36d] hover:underline text-sm font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                className="normal-case py-3 text-base font-medium"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: '#76a36d',
                  borderRadius: '8px',
                  '&:hover': { backgroundColor: '#5d8a55' },
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-6 text-center text-[#0A1628]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#76a36d] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
