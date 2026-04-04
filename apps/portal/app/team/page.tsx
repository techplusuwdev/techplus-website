'use client';

import React from 'react';
import Image from 'next/image';
import TeamDisplay from '@/components/organisms/landingPage/TeamDisplay/TeamDisplay';
import { useMembers } from '@/lib/hooks/useMembers';

export default function TeamPage() {
  const { members, isLoading, error } = useMembers();
  const leftLeafPath = "/assets/images/left-leaf-portal.svg";
  const rightLeafPath = "/assets/images/right-leaf-portal.svg";

  return (
    <div className="min-h-screen py-20 pb-60 px-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative">
        {/* LEFT LEAVES */}
        <div className="hidden md:block absolute top-[30vh] left-0">
          <Image
            src={leftLeafPath}
            alt="decorative leaf"
            width={456}
            height={554}
            className="h-[60vh] w-auto opacity-30 pointer-events-none"
            unoptimized
          />
          <Image
            src={leftLeafPath}
            alt="decorative leaf"
            width={456}
            height={554}
            className="h-[60vh] w-auto mt-[30vh] opacity-30 pointer-events-none"
            unoptimized
          />
        </div>

        {/* RIGHT LEAVES */}
        <div className="hidden md:block absolute top-0 right-0 -mt-[15vh]">
          <Image
            src={rightLeafPath}
            alt="decorative leaf"
            width={451}
            height={615}
            className="h-[60vh] w-auto opacity-30 pointer-events-none"
            unoptimized
          />
          <Image
            src={rightLeafPath}
            alt="decorative leaf"
            width={451}
            height={615}
            className="h-[60vh] w-auto mt-[40vh] opacity-30 pointer-events-none"
            unoptimized
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="mb-5 text-4xl font-semibold text-[#6B8E6B]">Meet Our Team</h1>
          <p className="mb-8 max-w-[800px] mx-auto text-[#0A1628]">
            We are a dedicated group of students who work toward the common goal of
            building the tech community at UW for you
          </p>
          <TeamDisplay members={members} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
