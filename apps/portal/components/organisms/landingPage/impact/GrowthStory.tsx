'use client';

import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import Image from 'next/image';

interface Story {
  index: number;
  name: string;
  role: string;
  story: string;
  tallImage: string;
  status: string;
  thumbnailImage: string;
}

const stories: Story[] = [
  {
    index: 0,
    name: 'Tailai Wang',
    role: 'Mentee class: Winter 2020',
    story:
      'Starting at UW felt like a daunting task. It\'s full of intimidating "firsts": the first set of midterms, the first round of WaterlooWorks, and that first group of interviews. Nothing brought more relief than having a great support system comprised of students who went through the same thing I did. I think I learned the most by doing interview prep with my mentors, who really helped me get my first co-op job. Tech+ brought guidance and insight that allowed to dive confidently into student life at UW!',
    tallImage: '/assets/images/people/tailai-2.jpg',
    status: 'Mentee',
    thumbnailImage: '/assets/images/people/tailai.jpg',
  },
  {
    index: 1,
    name: 'Lagan Bansal',
    role: 'Mentee class: Winter 2020',
    story:
      'This program was really amazing. My mentor was really supportive and I got to learn a lot from her when she told me about her experiences. I really loved our bubble tea hangouts where we talked about all the different opportunities in tech especially in the fields I was interested in. I was able to get a lot of suggestions on how to improve my resume and how to become more involved in the tech industry by joining clubs or going to conferences and networking. I learned a lot about how to get started with side projects and come up with ideas if I get stuck. This program was really fun and enjoyable for me. I really learned a lot and met a lot of awesome people!',
    tallImage: '/assets/images/people/Lagan_T.jpg',
    status: 'Mentee',
    thumbnailImage: '/assets/images/people/Lagan.jpg',
  },
  {
    index: 2,
    name: 'Vivian Liu',
    role: 'Mentee class: Winter 2020',
    story:
      'Starting university this year, I found it super helpful to reach out to my mentor about navigating student life. From technical interview prep to discovering good food spots around Waterloo, I definitely learnt a lot and met some amazing people along the way. Shout out to Katherine for being an incredible mentor',
    tallImage: '/assets/images/people/Vivian_T.jpg',
    status: 'Mentee',
    thumbnailImage: '/assets/images/people/Vivian_T.jpg',
  },
  {
    index: 3,
    name: 'Simran Thind',
    role: 'Mentee class: Winter 2020',
    story:
      'The Tech+ Mentorship program was an invaluable experience for me! As someone who was nervous about navigating co-op applications, it really helped to have a mentor (shoutout to Karolina Xin!) who was able to give me great advice on building my resume, interview preparation, and getting through school in general. I highly encourage applying and tapping into this network of awesome upper-year students!',
    tallImage: '/assets/images/people/Simran_T.jpg',
    status: 'Mentee',
    thumbnailImage: '/assets/images/people/Simran_T.jpg',
  },
  {
    index: 4,
    name: 'Moe Amadou',
    role: 'Mentee class: Fall 2019',
    story:
      'The value of the program for me was two-fold. Not only did I get to know my super thoughtful and wickedly talented mentor Kristy, but it helped demystify the software industry for me and learn about really valuable opportunities that I could get involved in immediately. I\'d say that the biggest thing that I got out of the program though was seeing real, human examples of the things that were possible. You get to meet a lot of great people who are accomplished in their own regard, and though that won\'t give you a blueprint for your definition of success, it opens your mind to tonnes of different possibilities that don\'t feel abstract or far away.',
    tallImage: '/assets/images/people/Moe_T.jpg',
    status: 'Mentee',
    thumbnailImage: '/assets/images/people/Moe.jpg',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function GrowthStory() {
  const [value, setValue] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 900);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="py-[3%] px-[8%] pb-[7%]">
      <p className="font-semibold text-[48px] m-0 pl-6 text-navy">Growth Stories</p>

      {stories.map((person, index) => (
        <div key={index}>
          <TabPanel value={value} index={index}>
            <div className="h-auto">
              <h1 className="m-[1%_0] text-[36px] leading-[54px] font-medium text-navy">{person.name}</h1>
              <h5 className="text-[#76a36d] text-[18px] font-medium leading-[27px] m-0">{person.role}</h5>
              {isLargeScreen ? (
                <Grid container spacing={1} className="mt-[7%]">
                  <Grid item sm={8} xs={12} className="flex flex-col justify-center items-center">
                    <p className="text-[1.5vw] font-normal leading-9">{person.story}</p>
                  </Grid>
                  <Grid item sm={4} xs={12} className="flex flex-col justify-center items-center">
                    <Image
                      src={person.tallImage}
                      alt={person.name}
                      width={400}
                      height={600}
                      className="w-[70%] h-auto m-[5%]"
                    />
                  </Grid>
                </Grid>
              ) : (
                <div>
                  <p className="text-[2.4vw]">{person.story}</p>
                  <div className="flex justify-center">
                    <Image
                      src={person.tallImage}
                      alt={person.name}
                      width={300}
                      height={450}
                      className="w-[60%]"
                    />
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
        </div>
      ))}

      <div className="w-[85%] mx-auto mt-10">
        <Divider />
        <div className="flex gap-10 justify-between mt-8 max-[1100px]:overflow-x-auto max-[1100px]:justify-start pb-6">
          {stories.map((person, index) => {
            const selected = index === value;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setValue(index)}
                className="shrink-0"
              >
                <div className={`w-[240px] ${selected ? 'bg-navy' : ''}`}>
                  <div className="w-[240px] h-[200px] relative">
                    <Image
                      src={person.thumbnailImage}
                      alt={person.name}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <div className="py-4 text-center">
                    <p className={`text-sm font-semibold tracking-wide ${selected ? 'text-white' : 'text-gray-500'}`}>
                      {person.name.toUpperCase()}
                    </p>
                    <p className={`text-xs font-semibold mt-2 ${selected ? 'text-[#FFDC84]' : 'text-[#76a36d]'}`}>
                      {person.status.toUpperCase()}
                    </p>
                  </div>
                </div>
                {selected && <div className="h-[2px] bg-navy mt-6" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
