'use client';

import React from 'react';
import PastEvents from './PastEvents';
import Programs from './Programs';

export default function Initiatives() {
  return (
    <div style={{ backgroundColor: 'rgba(118, 163, 109, 0.1)', minHeight: '100vh' }}>
      <div className="pt-12 pb-8 px-8 md:px-20" style={{ background: 'linear-gradient(168.48deg, rgba(118, 163, 109, 0.15) 32.06%, rgba(118, 163, 109, 0.1) 77.51%)' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-0 text-navy">Programs & Events</h1>
        </div>
      </div>
      <PastEvents />
      <Programs />
    </div>
  );
}
