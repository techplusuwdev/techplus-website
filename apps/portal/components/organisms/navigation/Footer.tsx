'use client';

import React from 'react';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

interface FooterProps {
  trackingEventCategory?: string;
}

export default function Footer({ trackingEventCategory }: FooterProps) {
  return (
    <footer className="relative w-full h-[150px]" style={{ backgroundColor: '#050a1f' }}>
      <div className="absolute text-center h-[34.67px] top-[51px] left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        <Link
          href="https://www.linkedin.com/company/techplusuw/"
          aria-label="Tech Plus LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2.5"
        >
          <LinkedInIcon />
        </Link>
        <Link
          href="https://twitter.com/techplusuw"
          aria-label="Tech Plus Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2.5"
        >
          <TwitterIcon />
        </Link>
        <Link
          href="mailto:techplusuw@gmail.com"
          aria-label="Tech Plus Email"
          className="text-white mx-2.5"
        >
          <EmailIcon />
        </Link>
        <Link
          href="https://www.facebook.com/techplusuw"
          aria-label="Tech Plus Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2.5"
        >
          <FacebookIcon />
        </Link>
        <Link
          href="https://www.instagram.com/techplusuw"
          aria-label="Tech Plus Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2.5"
        >
          <InstagramIcon />
        </Link>
      </div>
      <div className="absolute text-center top-[63.37%] bottom-[11.63%] text-white left-1/2 -translate-x-1/2">
        © Tech+ UW {new Date().getFullYear()}
      </div>
    </footer>
  );
}
