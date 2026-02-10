'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const leftLeafPath = '/assets/images/left-leaf-portal.svg';
const rightLeafPath = '/assets/images/right-leaf-portal.svg';

export default function CheckEmailPage() {
  return (
    <>
      <div
        className="min-h-screen py-20 pb-60 px-4 overflow-hidden"
        style={{
          background: 'linear-gradient(168.48deg, #FFFFFF 32.06%, rgba(255, 238, 194, 0.4) 77.51%)',
        }}
      >
        <div className="relative">
          <div className="hidden md:block absolute top-[30vh] left-0">
            <Image
              src={leftLeafPath}
              alt=""
              width={456}
              height={554}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
          </div>
          <div className="hidden md:block absolute top-0 right-0 -mt-[15vh]">
            <Image
              src={rightLeafPath}
              alt=""
              width={451}
              height={615}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
          </div>

          <div className="max-w-lg mx-auto relative z-10 text-center pt-16">
            <h1 className="text-4xl font-semibold text-[#050a1f] mb-4">
              Check your inbox
            </h1>
            <p className="text-[#0A1628] text-lg mb-8">
              Password reset email sent! Please check your inbox and follow the link to reset your password.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded font-medium text-white transition-colors"
              style={{ backgroundColor: '#76a36d' }}
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
