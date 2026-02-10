'use client';

import React from 'react';
import { TextField, Button } from '@mui/material';

export default function ProfileForm() {
  return (
    <form className="max-w-[600px]">
      <TextField fullWidth label="Name" margin="normal" />
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Program" margin="normal" />
      <Button variant="contained" className="mt-5">
        Save Profile
      </Button>
    </form>
  );
}
