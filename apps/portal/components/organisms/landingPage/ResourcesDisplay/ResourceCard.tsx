'use client';

import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import Image from 'next/image';

interface ResourceCardProps {
  link: string;
  title: string;
  desc: string;
  img: string;
}

export default function ResourceCard({ link, title, desc, img }: ResourceCardProps) {
  return (
    <CardActionArea className="p-[5%]" href={link} target="_blank" rel="noopener noreferrer">
      <Card className="h-full p-[29px] rounded-none border border-[#c0c1c2]">
        <div className="h-[50%] w-auto mb-[6%] max-[1040px]:h-[200px]">
          <Image
            src={img}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <Typography gutterBottom variant="h5" className="font-semibold text-navy">
          {title}
        </Typography>
        <Typography variant="h6" className="text-navy max-[1040px]:text-[1.5vw] max-[1200px]:text-[1.3vw] max-[1250px]:text-[1.2vw]">
          {desc}
        </Typography>
      </Card>
    </CardActionArea>
  );
}
