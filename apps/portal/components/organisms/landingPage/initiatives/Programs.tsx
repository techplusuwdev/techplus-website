'use client';

import React from 'react';
import { Button } from '@mui/material';
import ProgramCard from './ProgramCard';

const PROGRAMS_DATA = [
  {
    title: 'Mentorship Project',
    description: 'Our mentorship program pairs students with upper-year mentors to provide guidance and insight into the tech industry. We foster individuality and personal growth within the Tech+ community.',
    imageSrc: '/assets/images/programs/Mentorship.svg',
    imageAlt: 'Mentorship program group photo',
    alignment: 'right' as const,
  },
  {
    title: 'First Year Resources',
    description: 'We create events, panels, and activities to help first-year students transition into the University of Waterloo. Past initiatives include a "First Year Q&A Panel", "Co-op 101", and a "Dear Tech+ Advice column".',
    imageSrc: '/assets/images/programs/FirstYearResources.svg',
    imageAlt: 'First Year Resources illustration',
    alignment: 'left' as const,
  },
  {
    title: 'Events',
    description: 'General events consist of panels, workshops, and public events designed to provide UW students with necessary skills and experiences. We aim to address common barriers within the UW tech community, promote diversity & inclusion, and prepare students for technical workplaces.',
    additionalText: 'Past events include "Resume Critiques", "Mock Interviews", an "AI/ML Technical Workshop", and a "fireside chat on how to deal with imposter syndrome".',
    imageSrc: '/assets/images/programs/GeneralEvents.svg',
    imageAlt: 'Events illustration',
    alignment: 'right' as const,
  },
  {
    title: 'Coffee Chats Project',
    description: 'An opportunity for students to connect with multiple upper-year mentors to get questions answered, learn about career paths, and expand their network. W21 Coffee Chats is now opening the floor up for matches across all years and programs.',
    imageSrc: '/assets/images/CoffeeChat.svg',
    imageAlt: 'Coffee Chats illustration',
    alignment: 'left' as const,
    additionalContent: (
      <Button
        variant="contained"
        className="normal-case rounded-[10px] mt-[25px] text-base"
        sx={{
          backgroundColor: '#050a1f',
          '&:hover': { backgroundColor: '#1a1f3a' },
        }}
      >
        Coffee Chat Guide
      </Button>
    ),
  },
];

export default function Programs() {
  return (
    <div 
      className="py-5"
      style={{ 
        background: 'linear-gradient(168.48deg, #FFFFFF 32.06%, rgba(255, 238, 194, 0.4) 77.51%)' 
      }}
    >
      <div className="px-[10%] mb-8">
        <h2 className="font-semibold text-[36px] text-navy">Our Programs</h2>
      </div>
      <div className="flex flex-col gap-[100px] mb-[100px] px-3">
        {PROGRAMS_DATA.map((program, index) => (
          <ProgramCard
            key={index}
            title={program.title}
            description={program.description}
            imageSrc={program.imageSrc}
            imageAlt={program.imageAlt}
            alignment={program.alignment}
            additionalText={program.additionalText}
            additionalContent={program.additionalContent}
          />
        ))}
      </div>
    </div>
  );
}
