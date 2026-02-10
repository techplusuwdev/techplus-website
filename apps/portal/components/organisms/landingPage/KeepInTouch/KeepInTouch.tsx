'use client';

import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, CircularProgress, Box } from '@mui/material';

export default function KeepInTouch() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage('Thank you for subscribing!');
      setSnackbarOpen(true);
      setFullName('');
      setEmail('');
    }, 1000);
  };

  return (
    <Box id="mailing" className="py-10 px-5 text-center bg-gray-100">
      <h2 className="mb-5 text-3xl font-semibold">Keep In Touch</h2>
      <p className="mb-8">Subscribe to our mailing list to stay updated</p>
      <form onSubmit={handleSubmit} className="max-w-[500px] mx-auto">
        <TextField
          fullWidth
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="mb-5"
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-5"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="min-w-[200px] h-[50px]"
        >
          {loading ? <CircularProgress size={24} /> : 'Subscribe'}
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
