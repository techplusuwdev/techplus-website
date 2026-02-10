import React from 'react';
import FormField from '@/components/molecules/form/formField';
import FormRadioGroup from '@/components/molecules/form/formRadio';

interface Step2Props {
  mentorshipGoals: string;
  setMentorshipGoals: (value: string) => void;
  deiAgreement: string;
  setDeiAgreement: (value: string) => void;
  portfolioLink: string;
  setPortfolioLink: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2({
  mentorshipGoals,
  setMentorshipGoals,
  deiAgreement,
  setDeiAgreement,
  portfolioLink,
  setPortfolioLink,
  onNext,
  onBack,
}: Step2Props) {
  return (
    <div className="space-y-6">
      <FormField
        label="What do you hope to gain from this mentorship program? (150–200 words)"
        placeholder="Your Answer"
        value={mentorshipGoals}
        onChange={setMentorshipGoals}
        multiline
        rows={8}
        required={true}
      />

      <FormRadioGroup
        label="At Tech+, values of DEI (diversity, equity, and inclusion) are important to us. As a mentee, I agree to uphold these values as well as demonstrate kindness and respect at all Tech+ events."
        options={['Yes']}
        value={deiAgreement}
        onChange={setDeiAgreement}
        required={true}
      />

      <FormField
        label="[OPTIONAL] If you'd like, feel free to share with us a link to your resume, portfolio, LinkedIn, etc."
        placeholder="Your Answer"
        value={portfolioLink}
        onChange={setPortfolioLink}
      />

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full border border-[#76a36d] text-[#76a36d] hover:bg-[#eef6ec] font-medium py-3 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="w-full bg-[#76a36d] hover:bg-[#6a9462] text-white font-medium py-3 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
