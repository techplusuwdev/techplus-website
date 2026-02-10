'use client';

import React from 'react';
import { Card, CardMedia } from '@mui/material';

interface BannerCardProps {
  count: string;
  desc: string;
  img: string;
  boxStyleClassname: string; // e.g. "w-[55%]" or "w-[35%]"
}

export default function BannerCard({
  count,
  desc,
  img,
  boxStyleClassname,
}: BannerCardProps) {
  return (
    <Card className="relative h-full w-full overflow-hidden rounded-none bg-white">
      {/* RIGHT IMAGE (always fills the card) */}
      <CardMedia
        image={img}
        className="absolute inset-0"
        sx={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* LEFT NAVY PANEL */}
      <div className={`relative z-10 h-full ${boxStyleClassname} bg-primary-main text-white`}>
        {/* Dynamic padding like the screenshot */}
        <div className="h-full p-[8%] flex flex-col justify-end">
          {/* Vertical rule + content */}
          <div className="border-l-2 border-white/80 pl-[10%]">
            <div className="font-semibold leading-none text-[clamp(36px,4vw,64px)]">
              {count}
            </div>
            <div className="mt-2 font-semibold leading-snug text-[clamp(14px,1.6vw,22px)]">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
