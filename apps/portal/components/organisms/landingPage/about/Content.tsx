'use client';

import React from 'react';
import { Button, Avatar } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';

export default function Content() {
  return (
    <>
      <div className="py-8 px-2.5" style={{ backgroundColor: '#050a1f' }}>
        <div className="max-w-[1500px] mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-1 hidden md:block"></div>
            <div className="col-span-12 md:col-span-5 flex justify-center">
              <div className="flex flex-col md:block items-center md:items-start text-center md:text-left">
                <h1 className="text-6xl md:text-[64px] font-semibold py-8 text-white">
                  Tech+ UW
                </h1>
                <p className="text-2xl font-medium leading-9 text-white max-w-[500px]">
                  At Tech+, we value diversity, equity and inclusion because we
                  believe that tech is for everyone.
                </p>
                <div className="flex mt-5 gap-9">
                  <a
                    href="https://twitter.com/techplusuw"
                    aria-label="Tech Plus Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar className="w-[46px] h-[46px]" style={{ backgroundColor: '#76a36d' }}>
                      <TwitterIcon className="text-white" />
                    </Avatar>
                  </a>
                  <a
                    href="mailto:techplusuw@gmail.com"
                    aria-label="Tech Plus Email"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar className="w-[46px] h-[46px]" style={{ backgroundColor: '#76a36d' }}>
                      <EmailIcon className="text-white" />
                    </Avatar>
                  </a>
                  <a
                    href="https://www.facebook.com/techplusuw/"
                    aria-label="Tech Plus Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar className="w-[46px] h-[46px]" style={{ backgroundColor: '#76a36d' }}>
                      <FacebookIcon className="text-white" />
                    </Avatar>
                  </a>
                  <a
                    href="https://www.instagram.com/techplusuw/"
                    aria-label="Tech Plus Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar className="w-[46px] h-[46px]" style={{ backgroundColor: '#76a36d' }}>
                      <InstagramIcon className="text-white" />
                    </Avatar>
                  </a>
                </div>
                <div className="min-w-[300px] mt-10 whitespace-nowrap">
                  <Button
                    variant="outlined"
                    className="text-lg text-white h-[55px] my-1 mr-8 max-w-[221px] normal-case rounded-none border-white"
                    sx={{ '&:hover': { backgroundColor: '#76a36d' } }}
                    href="#upcoming_events"
                  >
                    Upcoming Events
                  </Button>
                  <Button
                    variant="outlined"
                    className="text-lg text-white h-[55px] my-1 max-w-[165px] normal-case rounded-none border-white"
                    sx={{ '&:hover': { backgroundColor: '#76a36d' } }}
                    href="#mailing"
                  >
                    Mailing List
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 flex justify-center">
              <Image
                src="/assets/images/PlusLanding.svg"
                alt="Tech+ UW"
                width={500}
                height={400}
                className="w-full max-w-[500px] max-h-[400px]"
              />
            </div>
            <div className="col-span-1 hidden md:block"></div>
          </div>
        </div>
      </div>

      <div className="w-auto py-[5%] px-[15%]" style={{ color: '#050a1f', background: 'linear-gradient(168.48deg, #FFFFFF 32.06%, rgba(255, 238, 194, 0.4) 77.51%)' }}>
        <div className="col-span-12">
          <h2 className="font-semibold text-5xl leading-[72px] mb-4">About Us</h2>
          <p className="font-normal text-lg leading-[27px] max-w-[800px]">
            We believe that as students, we have the responsibility to do more
            for underrepresented communities at the University of Waterloo.
            Tech+ is a student organization that aims to support students, from
            all backgrounds, to be confident, knowledgeable, and empowered to
            pursue a career in the tech industry.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-8">
          <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
            <h2 className="font-semibold text-4xl leading-[54px] mb-0">Vision</h2>
            <p className="font-normal text-lg leading-[27px] mt-0">
              To cultivate a more inclusive and diverse tech community at
              UWaterloo by making resources more accessible to the community and
              students in need.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex justify-center">
            <Image src="/assets/images/vision.svg" alt="vision" width={300} height={300} />
          </div>
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <Image src="/assets/images/mission.svg" alt="mission" width={300} height={300} />
          </div>
          <div className="col-span-12 md:col-span-6 text-right flex flex-col justify-center">
            <h2 className="font-semibold text-4xl leading-[54px] mb-0">Mission</h2>
            <p className="font-normal text-lg leading-[27px] mt-0">
              Helping to create resources and events for students looking to break
              into tech. We believe that no part of your identity should hinder
              your access to opportunities in tech, nor should it be a roadblock
              on your path to success.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
