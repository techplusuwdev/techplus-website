'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import UpcomingEventsCard from '../UpcomingEventsCard/UpcomingEventsCard';

export default function Event() {
  const router = useRouter();

  return (
    <div id="upcoming_events" className="py-10 px-5 text-center">
      <h1 className="mb-8 text-4xl font-semibold">Upcoming Events</h1>
      <div className="flex gap-5 justify-center flex-wrap">
        <UpcomingEventsCard
          imageUrl="/assets/images/Mentorship.png"
          eventTitle="Mentorship Program"
          buttonTitle="Open"
        />
        <UpcomingEventsCard
          imageUrl="/assets/images/CoffeeChat.svg"
          eventTitle="Coffee Chats"
          buttonTitle="Coming Soon"
        />
      </div>
      
      {/* Mentor/Mentee Signup Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <button
          onClick={() => router.push('/mentor-signup')}
          className="px-6 py-3 bg-[#76a36d] hover:bg-[#5d8a55] text-white rounded font-medium transition-colors"
        >
          Mentor Sign Up
        </button>
        <button
          onClick={() => router.push('/mentee-signup')}
          className="px-6 py-3 bg-[#76a36d] hover:bg-[#5d8a55] text-white rounded font-medium transition-colors"
        >
          Mentee Sign Up
        </button>
      </div>
    </div>
  );
}
