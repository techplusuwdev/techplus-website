'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import type { MemberData } from '@/lib/repositories/memberRepository';

interface MemberCardProps {
  member: MemberData;
}

export default function MemberCard({ member }: MemberCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center bg-white rounded-lg border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        {member.photo_url ? (
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#8BC677]/40">
            <Image
              src={member.photo_url}
              alt={member.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        ) : (
          <Avatar
            sx={{
              width: 96,
              height: 96,
              bgcolor: '#6C9A5C',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
        )}
      </div>

      <h3 className="text-base font-semibold text-[#020B2C] text-center leading-tight">
        {member.name}
      </h3>

      {member.role && (
        <p className="text-sm text-[#6C9A5C] font-medium text-center mt-1">{member.role}</p>
      )}

      {member.teams.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mt-3">
          {member.teams.map((team) => (
            <Chip
              key={team}
              label={team}
              size="small"
              sx={{
                backgroundColor: 'rgba(108, 154, 92, 0.12)',
                color: '#4a7a3c',
                fontSize: '0.7rem',
                height: '22px',
              }}
            />
          ))}
        </div>
      )}

      {(member.linkedin || member.email) && (
        <div className="flex gap-3 mt-4">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="text-[#6C9A5C] hover:text-[#4a7a3c] transition-colors"
            >
              <LinkedInIcon fontSize="small" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="text-[#6C9A5C] hover:text-[#4a7a3c] transition-colors"
            >
              <EmailIcon fontSize="small" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
