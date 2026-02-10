'use client';

import React, { useState } from 'react';
import MentorFilterBar from '../MentorFilterBar/MentorFilterBar';
import Pagination from '../Pagination/Pagination';
import { getAllMockMentors } from '@/lib/mockData';
import type { Mentor } from '@/types/user';

export default function MentorDisplay() {
  const [mentors] = useState<Mentor[]>(getAllMockMentors());
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mentors);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="py-10 px-5">
      <h2 className="mb-8 text-4xl font-semibold">Mentor Profiles</h2>
      <MentorFilterBar
        mentors={mentors}
        setFilteredMentors={setFilteredMentors}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="p-4 border rounded">
            <h3 className="text-xl font-semibold">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.program}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredMentors.length / 12)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
