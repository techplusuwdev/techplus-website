'use client';

import React from 'react';
import Image from 'next/image';

type Props = {
  participantName: string;
  testimonial: string;
  picture: string;
};

export default function Testimonial({ participantName, testimonial, picture }: Props) {
  return (
    <div className="relative">
      <div className="relative bg-white border border-black/10 shadow-[0_6px_18px_rgba(0,0,0,0.12)] rounded-md pl-20 pr-8 py-6 min-h-[140px]">
        <div className="font-semibold text-[18px] text-[#111827]">{participantName}</div>
        <div className="mt-2 text-[16px] leading-6 text-[#374151]">
          {testimonial}
        </div>
        <div className="absolute left-0 top-0 h-full w-[6px] bg-[#E7D29D] rounded-l-md" />
      </div>
      <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-white shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
          <Image src={picture} alt={participantName} width={56} height={56} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
