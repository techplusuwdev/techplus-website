'use client';

import React from 'react';
import Content from './Content';
import Event from '../Event/Event';
import KeepInTouch from '../KeepInTouch/KeepInTouch';
import Profile from './Profile';

export default function LandingPage() {
  return (
    <div>
      <Content />
      <Event />
      <Profile />
      <KeepInTouch />
    </div>
  );
}
