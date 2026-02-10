'use client';

import React from 'react';
import GrowthStory from './GrowthStory';
import Testimonials from './Testimonials';
import Banner from '../ImpactBanner/Banner';

export default function Impact() {
  return (
    <div>
      <Banner />
      <Testimonials />
      <GrowthStory />
    </div>
  );
}
