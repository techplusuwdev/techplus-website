'use client';

import React from 'react';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

interface ProgramCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  alignment: 'left' | 'right';
  additionalContent?: React.ReactNode;
  additionalText?: string;
}

export default function ProgramCard({
  title,
  description,
  imageSrc,
  imageAlt,
  alignment,
  additionalContent,
  additionalText,
}: ProgramCardProps) {
  const isRightAligned = alignment === 'right';

  return (
    <div 
      className={`flex items-end mb-[100px] max-lg:flex-col max-lg:items-center max-lg:text-left ${
        isRightAligned 
          ? 'self-end' 
          : 'self-start flex-row-reverse text-right'
      }`}
    >
      {/* Text Card - positioned to overlap image */}
      <div 
        className={`box-border p-[30px] shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)] max-w-[650px] relative bg-white rounded-lg z-10 max-[1250px]:left-0 max-[1250px]:right-0 ${
          isRightAligned 
            ? 'left-[80px] bottom-5' 
            : 'right-[80px] bottom-5'
        }`}
      >
        <h3 className="font-semibold text-2xl leading-[54px] text-navy mb-4">{title}</h3>
        <Typography className="font-normal text-base leading-[27px] text-gray-700 mb-4">
          {description}
        </Typography>
        {additionalText && (
          <Typography className="font-normal text-sm leading-[27px] text-gray-600">
            {additionalText}
          </Typography>
        )}
        {additionalContent}
      </div>

      {/* Image */}
      <div className="max-w-[700px] max-[700px]:w-[95vw]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={700}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
