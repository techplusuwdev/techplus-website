'use client';

import React from 'react';
import BannerCard from './BannerCard';

const cards = [
  // Left column stack
  {
    containerClassname: 'col-start-1 col-span-6 row-start-1 row-span-5',
    count: '23',
    desc: 'Events',
    img: '/assets/images/impact/events.png',
    // dynamic width: % on small, capped px on large
    boxStyleClassname: 'w-[min(25%,520px)]',
  },
  {
    containerClassname: 'col-start-1 col-span-6 row-start-6 row-span-4',
    count: '1800+',
    desc: 'Event Attendees',
    img: '/assets/images/impact/event_attend.png',
    boxStyleClassname: 'w-[min(52%,340px)]',
  },
  {
    containerClassname: 'col-start-1 col-span-6 row-start-10 row-span-5',
    count: '1',
    desc: 'Community',
    img: '/assets/images/impact/community.png',
    boxStyleClassname: 'w-[min(32%,340px)]',
  },

  // Right side
  {
    containerClassname: 'col-start-7 col-span-9 row-start-1 row-span-6',
    count: '500+',
    desc: 'First-years reached',
    img: '/assets/images/impact/first_year.png',
    // slimmer like the ref, capped
    boxStyleClassname: 'w-[min(38%,320px)]',
  },
  {
    containerClassname: 'col-start-7 col-span-5 row-start-7 row-span-8',
    count: '573',
    desc: 'Mentorship Pairs',
    img: '/assets/images/impact/mentorship.png',
    // ref has BIG navy block here (no image showing much)
    boxStyleClassname: 'w-[min(40%,520px)]',
  },
  {
    containerClassname: 'col-start-12 col-span-4 row-start-7 row-span-8',
    count: '980',
    desc: 'Coffee Chat Pairings',
    img: '/assets/images/impact/coffee.png',
    // wider panel on small card
    boxStyleClassname: 'w-[min(42%,360px)]',
  },
];

export default function Banner() {
  return (
    <div className="p-[5%] grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(12,1fr)] gap-[20px] h-[800px] mb-2">
      {cards.map((card, index) => (
        <div key={index} className={`${card.containerClassname} h-full`}>
          <BannerCard
            count={card.count}
            desc={card.desc}
            img={card.img}
            boxStyleClassname={card.boxStyleClassname}
          />
        </div>
      ))}
    </div>
  );
}
