'use client';

import React from 'react';
import { Tabs, Tab } from '@mui/material';
import TabPanel from './TabPanel';
import EventList from './EventList';
import { useEventTabs } from './useEventTabs';

const TAB_LABELS = [
  'Mentorship Program',
  'Experience Sharing',
  'First Year Resources',
  'Resume + Interview Prep',
];

const EMPTY_MESSAGES = [
  'No past mentorship events found.',
  'Experience Sharing events coming soon.',
  'First Year Resources events coming soon.',
  'Resume + Interview Prep events coming soon.',
];

export default function PastEvents() {
  const { activeTab, setActiveTab, events, loading } = useEventTabs();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const formatMentorshipAttendees = (event: any) => {
    return event.max_attendees ? `${event.max_attendees} Mentor/Mentee Pairs` : 'Event';
  };

  const formatAttendees = (event: any) => {
    return event.max_attendees ? `${event.max_attendees} Attendees` : 'Event';
  };

  return (
    <div className="pt-8 pb-12 px-8 md:px-20" style={{ backgroundColor: 'rgba(118, 163, 109, 0.1)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8">Our Past Events</h2>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: '2px solid #e5e7eb',
            mb: 4,
            '& .MuiTabs-indicator': {
              backgroundColor: '#76a36d',
              height: '2px',
            },
            '& .MuiTab-root': {
              color: '#050a1f',
              fontWeight: 500,
              textTransform: 'uppercase',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              '&.Mui-selected': {
                color: '#050a1f',
                fontWeight: 600,
              },
            },
          }}
        >
          {TAB_LABELS.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>

        {TAB_LABELS.map((_, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            <EventList
              events={events}
              loading={loading}
              emptyMessage={EMPTY_MESSAGES[index]}
              formatAttendees={index === 0 ? formatMentorshipAttendees : formatAttendees}
            />
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
