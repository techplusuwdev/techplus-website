'use client';

import React from 'react';
import { Grid, Divider, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import ResourcesDisplay from '../ResourcesDisplay/ResourcesDisplay';

const resources = [
  {
    link: 'https://drive.google.com/file/d/18mCKk31vRv0cwoOYYRlaeix-cY3XSz7B/view',
    text: 'Navigating race in Canadian Workplaces',
  },
  {
    link: 'https://lgbtqexperiment.com/2018/10/28/should-i-use-lgbt-lgbtq-lgbtq-lgbtqqia-or-something-else/',
    text: 'Should I use LGBT, LGBTQ, LGBTQ+, LGBTQQIA, or something else?',
  },
  {
    link: 'https://www.techrepublic.com/article/5-eye-opening-statistics-about-minorities-in-tech/',
    text: '5 eye-opening statistics about minorities in tech ',
  },
  {
    link: 'https://www.wired.com/story/five-years-tech-diversity-reports-little-progress/',
    text: 'Five Years of Tech Diversity Reports—and Little Progress',
  },
];

const leftGetInvolved = [
  { link: 'https://www.facebook.com/uwdsc', text: 'UW Data Science Club' },
  { link: 'https://www.facebook.com/uwaterloopm', text: 'UW PM' },
  { link: 'https://www.instagram.com/uwwistem/', text: 'UW WiSTEM' },
  { link: 'https://www.instagram.com/uwaterloowie/', text: 'UW Women in Engineering' },
  { link: 'https://www.watonomous.ca/', text: 'WATONOMOUS' },
  { link: 'https://www.facebook.com/uw.computerscienceclub', text: 'Waterloo Computer Science Club' },
  { link: 'https://www.facebook.com/uwaterloowics', text: 'Waterloo Women in Computer Science' },
  { link: 'https://www.facebook.com/uwuxwaterloo', text: 'UW/UX' },
  { link: 'https://uwblueprint.org/', text: 'UW Blueprint' },
];

const rightGetInvolved = [
  { link: 'https://www.facebook.com/asauw', text: 'African Students Association' },
  { link: 'https://www.facebook.com/UWEngiQueers/', text: 'UW EngiQueers' },
  { link: 'https://www.facebook.com/uwbase', text: 'Black Association for Student Expression' },
  { link: 'https://www.facebook.com/QTPOC-KW-930748673793249', text: 'QTPOC KW' },
  { link: 'https://www.facebook.com/nsbe.waterloo/', text: 'National Society of Black Engineers' },
];

export default function Resources() {
  return (
    <div className="py-[5%]">
      <ResourcesDisplay />
      <div className="px-[12%]">
        <h1 className="mt-[100px] font-semibold text-[36px] leading-[54px] text-navy">Diversity and Inclusion</h1>
        <Grid container className="max-[1100px]:block">
          <Grid item lg={6} md={12}>
            <p className="w-full font-normal text-lg leading-[27px] text-navy">
              At Tech+, we aim to promote diversity and inclusion at UWaterloo by establishing meaningful
              relationships with underrepresented communities and learning what barriers, needs, and gaps exist.
              Additionally, we want to dedicate time to empower underrepresented individuals to encourage their
              involvement with Tech+ initiatives.
            </p>
            <p className="w-full font-normal text-lg leading-[27px] text-navy">
              Here are some useful resources and articles to learn about Diversity and Inclusion.
            </p>
            {resources.map((resource, index) => (
              <MuiLink
                key={index}
                href={resource.link}
                target="_blank"
                className="m-0 w-[503px] h-[28px] font-normal text-sm leading-[21px] underline text-navy block mb-4"
              >
                {resource.text}
              </MuiLink>
            ))}
          </Grid>
          <Grid item lg={6} md={12} className="flex justify-end max-md:justify-center">
            <div>
              <Image
                src="/assets/images/W22TeamStatement.svg"
                alt="TeamStatement"
                width={500}
                height={500}
                className="w-full max-w-[500px] max-h-[500px]"
              />
            </div>
          </Grid>
        </Grid>
        <h1 className="mt-[100px] font-semibold text-[36px] leading-[54px] text-navy">Get Involved</h1>
        <Grid container spacing={4} className="max-[1300px]:block">
          <Grid item lg={6} md={12}>
            <p className="w-full font-normal text-lg leading-[27px] text-navy">
              There are lots of other clubs and organizations out there to provide you help and support! Feel free to
              check out these opportunities.
            </p>
          </Grid>
          <Grid item lg={6} md={12}>
            <Grid container className="max-[600px]:flex max-[600px]:flex-col">
              <Grid item lg={5} sm={12}>
                <br />
                {leftGetInvolved.map((resource, index) => (
                  <MuiLink
                    key={index}
                    href={resource.link}
                    target="_blank"
                    className="m-0 w-[503px] h-[28px] font-normal text-sm leading-[21px] underline text-navy block mb-4"
                  >
                    {resource.text}
                  </MuiLink>
                ))}
              </Grid>
              <Grid item lg={2} sm={12} className="flex justify-center max-xs:hidden">
                <Divider orientation="vertical" />
              </Grid>
              <Grid item lg={5} sm={12} className="max-xs:border-t max-xs:border-[#0000001f]">
                <br />
                {rightGetInvolved.map((resource, index) => (
                  <MuiLink
                    key={index}
                    href={resource.link}
                    target="_blank"
                    className="m-0 w-[503px] h-[28px] font-normal text-sm leading-[21px] underline text-navy block mb-4"
                  >
                    {resource.text}
                  </MuiLink>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
