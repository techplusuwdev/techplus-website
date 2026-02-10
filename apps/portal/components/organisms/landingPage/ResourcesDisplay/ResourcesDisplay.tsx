'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ResourceCard from './ResourceCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const debunkingTechCareers = {
  link: 'https://techplusuw.medium.com/debunking-tech-careers-e33ab49782d6',
  title: 'Debunking Tech Careers',
  desc: `Do Frontend Engineers push pixels all day? 
  What the heck is DevOps?`,
  img: '/assets/images/resources/techCareers.png',
};

const dearTechPlus = {
  link: 'https://medium.com/techplusuw/uwaterloo-advice-column-dear-techplus-issue1-9afe1c326805',
  title: 'Dear Tech+',
  desc: `Receive guidance from experienced upper-year mentors on all things 
        UWaterloo from hackathons to co-op and even academics.`,
  img: '/assets/images/resources/dearTech.png',
};

const sixteenWeeksOfInternship = {
  link: 'https://www.youtube.com/channel/UCyAUw8sY5NN34v-ad6ym49A',
  title: '16 Weeks of Internships',
  desc: `Gain insight on industries, roles, cities, and more as we share 
        our experiences in the tech industry on YouTube.`,
  img: '/assets/images/resources/internships.png',
};

const techPlus101 = {
  link: 'https://medium.com/@techplusuw/tech-101-q-a-panel-8bbcd15fbf8b',
  title: 'Tech+ 101: Kick-Off Q&A Panel',
  desc: `The Tech 101 Q&A Panel was an event aimed at incoming first years 
        to provide some insights into life at University of Waterloo.`,
  img: '/assets/images/resources/101.jpg',
};

const workAbroad = {
  link: 'https://www.youtube.com/watch?v=wiXHkmc2SCQ&t=11s',
  title: 'Work Abroad: Experience Sharing',
  desc: `Current and past UW students who have interned outside of Canada & USA 
        share their experiences and how they got their opportunities.`,
  img: '/assets/images/resources/work.jpg',
};

const studyAbroad = {
  link: 'https://medium.com/@techplusuw/study-abroad-experience-sharing-624e3db077d8',
  title: 'Study Abroad: Experience Sharing',
  desc: `Learn about the experiences shared by eight current and past 
        student from the University of Waterloo while studying abroad.`,
  img: '/assets/images/resources/study.png',
};

const resourcesCardsLargeScreen = [
  [dearTechPlus, debunkingTechCareers],
  [sixteenWeeksOfInternship, techPlus101],
  [workAbroad, studyAbroad],
];

const resourcesCardsSmallScreen = [
  dearTechPlus,
  debunkingTechCareers,
  sixteenWeeksOfInternship,
  techPlus101,
  workAbroad,
  studyAbroad,
];

export default function ResourcesDisplay() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1040);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <div className="px-[11.5%]">
        <h1 className="font-semibold text-[48px] leading-[72px] text-navy mt-0">Resources</h1>
        <p className="text-[24px] leading-9 text-navy m-0">
          Check out our Medium articles and recordings from past events!
        </p>
      </div>
      <div className="px-[5%]">
        <div className="px-[10%] min-[1040px]:px-[5%]">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={32}
            slidesPerView={1}
            className="py-6"
          >
            {isLargeScreen
              ? resourcesCardsLargeScreen.map((page, pageIndex) => (
                  <SwiperSlide key={pageIndex}>
                    <div className="min-[1040px]:grid min-[1040px]:grid-cols-2 min-[1040px]:grid-rows-1 min-[1040px]:h-[55vh] min-[1265px]:h-[45vh] min-[1500px]:h-[55vh]">
                      {page.map((card, cardIndex) => (
                        <div key={cardIndex} className="m-[5%]">
                          <ResourceCard
                            link={card.link}
                            title={card.title}
                            desc={card.desc}
                            img={card.img}
                          />
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))
              : resourcesCardsSmallScreen.map((card, index) => (
                  <SwiperSlide key={index}>
                    <ResourceCard
                      link={card.link}
                      title={card.title}
                      desc={card.desc}
                      img={card.img}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
