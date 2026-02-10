'use client';

import React from 'react';
import { Typography } from '@mui/material';
import type { EventData } from '@/lib/repositories/eventRepository';

interface EventListProps {
  events: EventData[];
  loading: boolean;
  emptyMessage: string;
  formatAttendees?: (event: EventData) => string;
}

export default function EventList({ events, loading, emptyMessage, formatAttendees }: EventListProps) {
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Winter', 'Spring', 'Summer', 'Fall'];
    const month = months[Math.floor(date.getMonth() / 3)] || 'Fall';
    return `${month} ${date.getFullYear()}`;
  };

  if (loading) {
    return <Typography className="text-gray-600">Loading events...</Typography>;
  }

  if (events.length === 0) {
    return <Typography className="text-gray-600">{emptyMessage}</Typography>;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex justify-between items-center py-3 border-b border-gray-300"
        >
          <Typography variant="h6" className="text-navy font-semibold">
            {formatEventDate(event.start_time)} {event.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {formatAttendees ? formatAttendees(event) : (event.max_attendees ? `${event.max_attendees} Attendees` : 'Event')}
          </Typography>
        </div>
      ))}
    </div>
  );
}
