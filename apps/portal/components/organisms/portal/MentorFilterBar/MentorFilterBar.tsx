'use client';

import React from 'react';
import type { Mentor } from '@/types/user';

interface MentorFilterBarProps {
  mentors: Mentor[];
  setFilteredMentors: (mentors: Mentor[]) => void;
}

export default function MentorFilterBar({ mentors, setFilteredMentors }: MentorFilterBarProps) {
  React.useEffect(() => {
    setFilteredMentors(mentors);
  }, [mentors, setFilteredMentors]);

  return <div className="mb-5">Filter Bar - Coming Soon</div>;
}
