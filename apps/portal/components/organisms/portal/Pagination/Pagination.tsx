'use client';

import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <MuiPagination
      count={totalPages}
      page={currentPage}
      onChange={(_e, page) => onPageChange(page)}
      className="mt-8 flex justify-center"
    />
  );
}
