'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface UpcomingEventsCardProps {
  imageUrl: string;
  eventTitle: string;
  buttonTitle: string;
  eventDate?: string;
  signUpLink?: string;
  onButtonClick?: () => void;
}

export default function UpcomingEventsCard({
  imageUrl,
  eventTitle,
  buttonTitle,
  eventDate,
  signUpLink,
  onButtonClick,
}: UpcomingEventsCardProps) {
  return (
    <Card className="max-w-[400px] m-2.5">
      <CardMedia>
        <Image src={imageUrl} alt={eventTitle} width={400} height={200} />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div" className="mb-2.5">
          {eventTitle}
        </Typography>
        {eventDate && (
          <Typography variant="body2" className="mb-2.5 text-gray-600">
            {eventDate}
          </Typography>
        )}
        <Button
          variant="contained"
          href={signUpLink}
          onClick={onButtonClick}
          disabled={!signUpLink && !onButtonClick}
          className="mt-2.5"
        >
          {buttonTitle}
        </Button>
      </CardContent>
    </Card>
  );
}
