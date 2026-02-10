import { useState, useEffect } from 'react';
import { eventService } from '@/lib/services/eventService';
import type { EventData } from '@/lib/repositories/eventRepository';

// Map tabs to event types
export const tabEventTypes: (string | null)[] = [
  'mentorship', // Mentorship Program
  'social', // Experience Sharing
  'workshop', // First Year Resources (using workshop for now)
  'workshop', // Resume + Interview Prep (using workshop for now)
];

export function useEventTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const eventType = tabEventTypes[activeTab];
      
      if (eventType) {
        const result = await eventService.getEventsByType(eventType);
        if (result.success && result.data) {
          // Filter to only past events
          const now = new Date();
          const pastEvents = result.data.filter(
            (event) => new Date(event.end_time) < now
          );
          setEvents(pastEvents);
        } else {
          setEvents([]);
        }
      } else {
        setEvents([]);
      }
      setLoading(false);
    };

    loadEvents();
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    events,
    loading,
  };
}
