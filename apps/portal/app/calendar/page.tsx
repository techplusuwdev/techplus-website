'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const dummyEvents = [
  {
    id: '1',
    title: 'Tech+ Workshop: Resume Building',
    start: new Date().toISOString().split('T')[0] + 'T10:00:00',
    end: new Date().toISOString().split('T')[0] + 'T12:00:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '2',
    title: 'Mentorship Program Kickoff',
    start: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T14:00:00',
    end: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0] + 'T16:00:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '3',
    title: 'Coffee Chat Session',
    start: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T15:00:00',
    end: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] + 'T16:30:00',
    backgroundColor: '#76a36d',
  },
  {
    id: '4',
    title: 'Tech+ Social Event',
    start: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T18:00:00',
    end: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0] + 'T20:00:00',
    backgroundColor: '#76a36d',
  },
];

export default function CalendarPage() {
  const [CalendarComponent, setCalendarComponent] = useState<any>(null);
  const leftLeafPath = "/assets/images/left-leaf-portal.svg";
  const rightLeafPath = "/assets/images/right-leaf-portal.svg";

  useEffect(() => {
    // Load calendar component dynamically
    import('@/components/organisms/calendar/CalendarClient').then((mod) => {
      setCalendarComponent(() => mod.default);
    });
  }, []);

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

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="mb-8 text-4xl font-semibold text-[#6B8E6B] text-center">Events Calendar</h1>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {CalendarComponent ? (
              <CalendarComponent events={dummyEvents} />
            ) : (
              <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                Loading calendar...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
