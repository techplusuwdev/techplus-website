'use client';

import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { applicationService } from '@/lib/services/applicationService';
import { useAuth } from '@/lib/contexts/AuthContext';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Step4 from './page4';

export default function MenteeSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [pronouns, setPronouns] = useState<string[]>([]);

  const [studyTerm, setStudyTerm] = useState('');
  const [academicProgram, setAcademicProgram] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');

  const [commitment, setCommitment] = useState('');
  const [interestedInEvents, setInterestedInEvents] = useState('');
  const [timezone, setTimezone] = useState('');
  const [inWaterloo, setInWaterloo] = useState('');
  const [isInternational, setIsInternational] = useState('');
  const [menteesCount, setMenteesCount] = useState('');
  const [wasMentee, setWasMentee] = useState('');
  const [isReturning, setIsReturning] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [mentorshipGoals, setMentorshipGoals] = useState('');
  const [deiAgreement, setDeiAgreement] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  const [contactMethods, setContactMethods] = useState<string[]>([]);
  const [askMeAbout, setAskMeAbout] = useState('');
  const [freetimeInterests, setFreetimeInterests] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const router = useRouter();
  const { userId, isAuthenticated } = useAuth();

  const leftLeafPath = "/assets/images/left-leaf-portal.svg";
  const rightLeafPath = "/assets/images/right-leaf-portal.svg";

  if (!isAuthenticated || !userId) {
    return (
      <>
        <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#050a1f' }}>
          <div className="max-w-2xl mx-auto text-center">
            <Alert severity="warning" className="mb-4">
              Please log in to apply as a mentee.
            </Alert>
            <Link href="/login" className="text-[#76a36d] hover:underline">
              Go to Login
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await applicationService.submitMenteeApplication({
      user_id: userId,
      profile_id: userId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      pronouns: pronouns,
      study_term: studyTerm,
      academic_program: academicProgram,
      commitment: commitment,
      interested_in_events: interestedInEvents,
      timezone: timezone,
      in_waterloo: inWaterloo,
      is_international: isInternational,
      mentees_count: menteesCount,
      was_mentee: wasMentee,
      is_returning: isReturning,
      how_did_you_hear: howDidYouHear,
    });

    if (result.success) {
      alert('Mentee application submitted successfully!');
      router.push('/profile');
    } else {
      setError(result.error || 'Failed to submit application');
    }

    setLoading(false);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSkip = () => {
    setProfilePicture(null);
    if (window.confirm('Submit application without profile picture?')) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }
  };

  return (
    <>
      <div className="min-h-screen py-20 pb-60 px-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <div className="relative">
          {/* LEFT LEAVES - way down */}
          <div className="hidden md:block absolute top-[30vh] left-0">
            <Image
              src={leftLeafPath}
              alt="decorative leaf"
              width={456}
              height={554}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
            <Image
              src={leftLeafPath}
              alt="decorative leaf"
              width={456}
              height={554}
              className="h-[60vh] w-auto mt-[30vh] opacity-30 pointer-events-none"
              unoptimized
            />
            <Image
              src={leftLeafPath}
              alt="decorative leaf"
              width={456}
              height={554}
              className="h-[60vh] w-auto mt-[30vh] opacity-30 pointer-events-none"
              unoptimized
            />
          </div>

          {/* RIGHT LEAVES - pulled up with negative space */}
          <div className="hidden md:block absolute top-0 right-0 -mt-[15vh]">
            <Image
              src={rightLeafPath}
              alt="decorative leaf"
              width={451}
              height={615}
              className="h-[60vh] w-auto opacity-30 pointer-events-none"
              unoptimized
            />
            <Image
              src={rightLeafPath}
              alt="decorative leaf"
              width={451}
              height={615}
              className="h-[60vh] w-auto mt-[40vh] opacity-30 pointer-events-none"
              unoptimized
            />
            <Image
              src={rightLeafPath}
              alt="decorative leaf"
              width={451}
              height={615}
              className="h-[60vh] w-auto mt-[40vh] opacity-30 pointer-events-none"
              unoptimized
            />
          </div>

          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert severity="error" className="bg-red-900 text-white">
                  {error}
                </Alert>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <Page1
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  pronouns={pronouns}
                  setPronouns={setPronouns}
                  studyTerm={studyTerm}
                  setStudyTerm={setStudyTerm}
                  academicProgram={academicProgram}
                  setAcademicProgram={setAcademicProgram}
                  commitment={commitment}
                  setCommitment={setCommitment}
                  interestedInEvents={interestedInEvents}
                  setInterestedInEvents={setInterestedInEvents}
                  timezone={timezone}
                  setTimezone={setTimezone}
                  inWaterloo={inWaterloo}
                  setInWaterloo={setInWaterloo}
                  isInternational={isInternational}
                  setIsInternational={setIsInternational}
                  menteesCount={menteesCount}
                  setMenteesCount={setMenteesCount}
                  wasMentee={wasMentee}
                  setWasMentee={setWasMentee}
                  isReturning={isReturning}
                  setIsReturning={setIsReturning}
                  howDidYouHear={howDidYouHear}
                  setHowDidYouHear={setHowDidYouHear}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <Page2
                  mentorshipGoals={mentorshipGoals}
                  setMentorshipGoals={setMentorshipGoals}
                  deiAgreement={deiAgreement}
                  setDeiAgreement={setDeiAgreement}
                  portfolioLink={portfolioLink}
                  setPortfolioLink={setPortfolioLink}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <Page3
                  contactMethods={contactMethods}
                  setContactMethods={setContactMethods}
                  askMeAbout={askMeAbout}
                  setAskMeAbout={setAskMeAbout}
                  freetimeInterests={freetimeInterests}
                  setFreetimeInterests={setFreetimeInterests}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 4 && (
                <Step4
                  profilePicture={profilePicture}
                  setProfilePicture={setProfilePicture}
                  onBack={handleBack}
                  onSkip={handleSkip}
                />
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
