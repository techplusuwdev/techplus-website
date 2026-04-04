'use client';

import React from 'react';
import { CircularProgress } from '@mui/material';
import type { MemberData } from '@/lib/repositories/memberRepository';
import MemberCard from './MemberCard';

interface TeamDisplayProps {
  members: MemberData[];
  isLoading: boolean;
  error: string | null;
}

function groupByDepartment(members: MemberData[]): [string, MemberData[]][] {
  const map = new Map<string, MemberData[]>();
  for (const member of members) {
    const dept = member.department ?? 'Other';
    if (!map.has(dept)) map.set(dept, []);
    map.get(dept)!.push(member);
  }
  return [...map.entries()].sort(([a], [b]) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });
}

export default function TeamDisplay({ members, isLoading, error }: TeamDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress sx={{ color: '#6C9A5C' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Unable to load team members. Please try again later.</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No team members found.</p>
      </div>
    );
  }

  const groups = groupByDepartment(members);

  return (
    <div className="space-y-12 text-left">
      {groups.map(([department, deptMembers]) => (
        <section key={department}>
          <h2 className="text-2xl font-semibold text-[#020B2C] mb-6 pb-2 border-b border-[#8BC677]/40">
            {department}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {deptMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
