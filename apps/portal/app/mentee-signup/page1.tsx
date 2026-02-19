import React from 'react';
import FormField from '@/components/molecules/form/formField';
import FormCheckboxGroup from '@/components/molecules/form/formCheckBox';
import FormRadioGroup from '@/components/molecules/form/formRadio';
import FormSelect from '@/components/molecules/form/formDropDown';

interface Step1Props {
  // Text fields
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;

  // Checkboxes (array)
  pronouns: string[];
  setPronouns: (value: string[]) => void;

  // Dropdowns
  studyTerm: string;
  setStudyTerm: (value: string) => void;
  academicProgram: string;
  setAcademicProgram: (value: string) => void;

  // Radio buttons
  commitment: string;
  setCommitment: (value: string) => void;
  interestedInEvents: string;
  setInterestedInEvents: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  inWaterloo: string;
  setInWaterloo: (value: string) => void;
  isInternational: string;
  setIsInternational: (value: string) => void;
  isReturning: string;
  setIsReturning: (value: string) => void;
  howDidYouHear: string;
  setHowDidYouHear: (value: string) => void;

  // Navigation
  onNext: () => void;
}

export default function Step1({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  pronouns, setPronouns,
  studyTerm, setStudyTerm,
  academicProgram, setAcademicProgram,
  commitment, setCommitment,
  interestedInEvents, setInterestedInEvents,
  timezone, setTimezone,
  inWaterloo, setInWaterloo,
  isInternational, setIsInternational,
  isReturning, setIsReturning,
  howDidYouHear, setHowDidYouHear,
  onNext,
}: Step1Props) {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl text-[#6B8E6B] font-medium text-semibold text-center mb-8">
        Application - Mentee
      </h1>
      <p className="text-[#0A1628] font-md text-center mb-8">
        Thank you for your interest as a mentee! Please fill out the following information to apply. It should take about 10 minutes:
      </p>

      <div className="max-w-md space-y-6 mx-auto">

        <FormField
          label="First Name"
          placeholder="Enter first name"
          value={firstName}
          onChange={setFirstName}
          required={true}
        />

        <FormField
          label="Last Name"
          placeholder="Enter last name"
          value={lastName}
          onChange={setLastName}
          required={true}
        />

        <FormField
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={setEmail}
          type="email"
          required={true}
        />

        <FormCheckboxGroup
          label="Pronouns"
          options={["she/her/hers", "he/him/his", "they/them/theirs", "ze/zir/zis", "other"]}
          value={pronouns}
          onChange={setPronouns}
          required={true}
        />

        <FormSelect
          label="Current study term (or most recently completed)"
          options={["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "Graduate"]}
          value={studyTerm}
          onChange={setStudyTerm}
          required={true}
        />

        <FormSelect
          label="Academic Program"
          options={["Computer Science", "Software Engineering", "Computer Engineering", "Electrical Engineering", "Mechatronics Engineering", "Management Engineering", "Systems Design Engineering", "Other Engineering", "Math", "Business", "Other"]}
          value={academicProgram}
          onChange={setAcademicProgram}
          required={true}
        />

        <FormRadioGroup
          label="How committed are you to participating in the mentorship program this term?"
          options={["Very committed", "Somewhat committed", "Unsure"]}
          value={commitment}
          onChange={setCommitment}
          required={true}
        />

        <FormRadioGroup
          label="Would you be interested in participating in other Tech+ events outside of the Mentorship Program for this term?"
          options={["Yes", "No"]}
          value={interestedInEvents}
          onChange={setInterestedInEvents}
          required={true}
        />

        <FormRadioGroup
          label="What timezone are you in?"
          options={["EST", "MST", "AST", "PST", "Other"]}
          value={timezone}
          onChange={setTimezone}
          required={true}
        />

        <FormRadioGroup
          label="Are you in Waterloo / within the Waterloo region this term? Can you make in-person events held at UWaterloo throughout the term?"
          options={["Yes", "No"]}
          value={inWaterloo}
          onChange={setInWaterloo}
          required={true}
        />

        <FormRadioGroup
          label="Are you an international student?"
          options={["Yes", "No"]}
          value={isInternational}
          onChange={setIsInternational}
          required={true}
        />

        <FormRadioGroup
          label="Are you a returning mentee (have you participated in Tech+ mentorship before)?"
          options={["Yes", "No"]}
          value={isReturning}
          onChange={setIsReturning}
          required={true}
        />

        <FormSelect
          label="How did you find out about the mentorship program?"
          options={["Email", "Social Media", "Friend", "Website", "Other"]}
          value={howDidYouHear}
          onChange={setHowDidYouHear}
          required={true}
        />

        <button
          type="button"
          onClick={onNext}
          className="w-full bg-[#76a36d] hover:bg-[#6a9462] text-white font-medium py-3 rounded mt-6"
        >
          Next
        </button>
      </div>
    </div>
  );
}
