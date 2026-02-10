'use client';

import React, { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

interface CalendarClientProps {
  events: CalendarEvent[];
}

export default function CalendarClient({ events }: CalendarClientProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const getMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  const monthData = getMonthData(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            Previous
          </button>
          <button
            onClick={goToNextMonth}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            Next
          </button>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-[#76a36d] hover:bg-[#5d8a55] text-white rounded transition"
          >
            Today
          </button>
        </div>
        <h2 className="text-2xl font-semibold">{monthName}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded transition ${
              view === 'month' ? 'bg-[#76a36d] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded transition ${
              view === 'week' ? 'bg-[#76a36d] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-semibold text-gray-600 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {monthData.map((day, index) => {
            const dayEvents = day ? getEventsForDay(day) : [];
            const isToday = day && day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                  !day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                {day && (
                  <>
                    <div
                      className={`text-sm font-medium mb-2 ${
                        isToday ? 'text-[#76a36d] font-bold' : 'text-gray-700'
                      }`}
                    >
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition"
                          style={{ backgroundColor: event.backgroundColor }}
                          onClick={() => {
                            const startDate = new Date(event.start);
                            alert(`Event: ${event.title}\nStart: ${startDate.toLocaleString()}`);
                          }}
                        >
                          <div className="text-white font-medium truncate">{event.title}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">{events.length}</span> events this month
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#76a36d' }}></div>
          <span className="text-sm text-gray-600">Tech+ Event</span>
        </div>
      </div>
    </div>
  );
}
