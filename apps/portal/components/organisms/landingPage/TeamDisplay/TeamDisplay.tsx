'use client';

import React from 'react';

interface TeamDisplayProps {
  league: any[];
}

export default function TeamDisplay({ league }: TeamDisplayProps) {
  return (
    <div className="text-center">
      <p className="text-gray-600">Team Display - {league.length} members</p>
    </div>
  );
}
