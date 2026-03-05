'use client';

import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { applicationService } from '@/lib/services/applicationService';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Step4 from './page4';

const DRAFT_KEY = (userId: string) => `mentee-draft-${userId}`;

export default function MenteeSignupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Page 1 — basic info
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
  const [isReturning, setIsReturning] = useState('');

  // Page 2 — mentee-specific
  const [mentorshipGoals, setMentorshipGoals] = useState('');
  const [deiAgreement, setDeiAgreement] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');

  // Page 3 — profile / interests
  const [contactMethods, setContactMethods] = useState<string[]>([]);
  const [askMeAbout, setAskMeAbout] = useState('');
  const [freetimeInterests, setFreetimeInterests] = useState('');

  // Page 4 — profile picture
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { userId, isAuthenticated } = useAuth();

  // ── Load draft from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    try {
      const saved = localStorage.getItem(DRAFT_KEY(userId));
      if (!saved) return;
      const d = JSON.parse(saved);
      if (d.firstName !== undefined) setFirstName(d.firstName);
      if (d.lastName !== undefined) setLastName(d.lastName);
      if (d.email !== undefined) setEmail(d.email);
      if (Array.isArray(d.pronouns)) setPronouns(d.pronouns);
      if (d.studyTerm !== undefined) setStudyTerm(d.studyTerm);
      if (d.academicProgram !== undefined) setAcademicProgram(d.academicProgram);
      if (d.howDidYouHear !== undefined) setHowDidYouHear(d.howDidYouHear);
      if (d.commitment !== undefined) setCommitment(d.commitment);
      if (d.interestedInEvents !== undefined) setInterestedInEvents(d.interestedInEvents);
      if (d.timezone !== undefined) setTimezone(d.timezone);
      if (d.inWaterloo !== undefined) setInWaterloo(d.inWaterloo);
      if (d.isInternational !== undefined) setIsInternational(d.isInternational);
      if (d.isReturning !== undefined) setIsReturning(d.isReturning);
      if (d.mentorshipGoals !== undefined) setMentorshipGoals(d.mentorshipGoals);
      if (d.deiAgreement !== undefined) setDeiAgreement(d.deiAgreement);
      if (d.portfolioLink !== undefined) setPortfolioLink(d.portfolioLink);
      if (Array.isArray(d.contactMethods)) setContactMethods(d.contactMethods);
      if (d.askMeAbout !== undefined) setAskMeAbout(d.askMeAbout);
      if (d.freetimeInterests !== undefined) setFreetimeInterests(d.freetimeInterests);
      if (d.currentStep !== undefined) setCurrentStep(d.currentStep);
    } catch {
      // ignore malformed stored data
    }
  }, [userId]);

  // ── Save draft to localStorage on any field change ─────────────────────────
  useEffect(() => {
    if (!userId) return;
    try {
      localStorage.setItem(
        DRAFT_KEY(userId),
        JSON.stringify({
          currentStep,
          firstName, lastName, email, pronouns,
          studyTerm, academicProgram, howDidYouHear,
          commitment, interestedInEvents, timezone,
          inWaterloo, isInternational, isReturning,
          mentorshipGoals, deiAgreement, portfolioLink,
          contactMethods, askMeAbout, freetimeInterests,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [
    userId, currentStep,
    firstName, lastName, email, pronouns,
    studyTerm, academicProgram, howDidYouHear,
    commitment, interestedInEvents, timezone,
    inWaterloo, isInternational, isReturning,
    mentorshipGoals, deiAgreement, portfolioLink,
    contactMethods, askMeAbout, freetimeInterests,
  ]);

  const leftLeafPath = '/assets/images/left-leaf-portal.svg';
  const rightLeafPath = '/assets/images/right-leaf-portal.svg';

  if (!isAuthenticated || !userId) {
    return (
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
    );
  }

  // ── Upload profile picture to Supabase Storage ─────────────────────────────
  const uploadProfilePicture = async (): Promise<string | null> => {
    if (!profilePicture) return null;
    const ext = profilePicture.name.split('.').pop();
    const path = `${userId}/profile.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(path, profilePicture, { upsert: true });
    if (uploadError) {
      throw new Error(`Photo upload failed: ${uploadError.message}`);
    }
    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(path);
    return data.publicUrl;
  };

  // ── Form submit ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const profilePictureUrl = await uploadProfilePicture();

      const result = await applicationService.submitMenteeApplication({
        user_id: userId,
        profile_id: userId,
        // Page 1
        first_name: firstName,
        last_name: lastName,
        email,
        pronouns,
        study_term: studyTerm,
        academic_program: academicProgram,
        how_did_you_hear: howDidYouHear,
        commitment,
        interested_in_events: interestedInEvents,
        timezone,
        in_waterloo: inWaterloo,
        is_international: isInternational,
        is_returning: isReturning,
        // Page 2
        mentorship_goals: mentorshipGoals,
        dei_agreement: deiAgreement,
        portfolio_link: portfolioLink,
        // Page 3
        contact_methods: contactMethods,
        ask_me_about: askMeAbout,
        freetime_interests: freetimeInterests,
        // Page 4
        ...(profilePictureUrl ? { profile_picture_url: profilePictureUrl } : {}),
      });

      if (result.success) {
        localStorage.removeItem(DRAFT_KEY(userId));
        alert('Mentee application submitted successfully!');
        router.push('/profile');
      } else {
        setError(result.error || 'Failed to submit application');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    }

    setLoading(false);
  };

  const handleNext = () => setCurrentStep((s) => s + 1);
  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleSkip = () => {
    setProfilePicture(null);
    if (window.confirm('Submit application without profile picture?')) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(fakeEvent);
    }
  };

  return (
    <div className="min-h-screen py-20 pb-60 px-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      <div className="relative">

        {/* LEFT LEAVES */}
        <div className="hidden md:block absolute top-[30vh] left-0">
          <Image src={leftLeafPath} alt="decorative leaf" width={456} height={554}
            className="h-[60vh] w-auto opacity-30 pointer-events-none" unoptimized />
          <Image src={leftLeafPath} alt="decorative leaf" width={456} height={554}
            className="h-[60vh] w-auto mt-[30vh] opacity-30 pointer-events-none" unoptimized />
          <Image src={leftLeafPath} alt="decorative leaf" width={456} height={554}
            className="h-[60vh] w-auto mt-[30vh] opacity-30 pointer-events-none" unoptimized />
        </div>

        {/* RIGHT LEAVES */}
        <div className="hidden md:block absolute top-0 right-0 -mt-[15vh]">
          <Image src={rightLeafPath} alt="decorative leaf" width={451} height={615}
            className="h-[60vh] w-auto opacity-30 pointer-events-none" unoptimized />
          <Image src={rightLeafPath} alt="decorative leaf" width={451} height={615}
            className="h-[60vh] w-auto mt-[40vh] opacity-30 pointer-events-none" unoptimized />
          <Image src={rightLeafPath} alt="decorative leaf" width={451} height={615}
            className="h-[60vh] w-auto mt-[40vh] opacity-30 pointer-events-none" unoptimized />
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert severity="error" className="bg-red-900 text-white">
                {error}
              </Alert>
            )}

            {currentStep === 1 && (
              <Page1
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                email={email} setEmail={setEmail}
                pronouns={pronouns} setPronouns={setPronouns}
                studyTerm={studyTerm} setStudyTerm={setStudyTerm}
                academicProgram={academicProgram} setAcademicProgram={setAcademicProgram}
                commitment={commitment} setCommitment={setCommitment}
                interestedInEvents={interestedInEvents} setInterestedInEvents={setInterestedInEvents}
                timezone={timezone} setTimezone={setTimezone}
                inWaterloo={inWaterloo} setInWaterloo={setInWaterloo}
                isInternational={isInternational} setIsInternational={setIsInternational}
                isReturning={isReturning} setIsReturning={setIsReturning}
                howDidYouHear={howDidYouHear} setHowDidYouHear={setHowDidYouHear}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <Page2
                mentorshipGoals={mentorshipGoals} setMentorshipGoals={setMentorshipGoals}
                deiAgreement={deiAgreement} setDeiAgreement={setDeiAgreement}
                portfolioLink={portfolioLink} setPortfolioLink={setPortfolioLink}
                onNext={handleNext} onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Page3
                contactMethods={contactMethods} setContactMethods={setContactMethods}
                askMeAbout={askMeAbout} setAskMeAbout={setAskMeAbout}
                freetimeInterests={freetimeInterests} setFreetimeInterests={setFreetimeInterests}
                onNext={handleNext} onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <Step4
                profilePicture={profilePicture} setProfilePicture={setProfilePicture}
                loading={loading}
                onBack={handleBack} onSkip={handleSkip}
              />
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
