import React from 'react';
import FormCheckboxGroup from '@/components/molecules/form/formCheckBox';
import FormField from '@/components/molecules/form/formField';

interface Step3Props {
  contactMethods: string[];
  setContactMethods: (value: string[]) => void;
  askMeAbout: string;
  setAskMeAbout: (value: string) => void;
  freetimeInterests: string;
  setFreetimeInterests: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Page3({
  contactMethods,
  setContactMethods,
  askMeAbout,
  setAskMeAbout,
  freetimeInterests,
  setFreetimeInterests,
  onNext,
  onBack,
}: Step3Props) {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-5xl text-[#6B8E6B] font-medium text-center mb-8">
        Profile Information
      </h1>

      <FormCheckboxGroup
        label="How do you want to be contacted?"
        options={["LinkedIn", "Email", "Discord", "Instagram", "Other"]}
        value={contactMethods}
        onChange={setContactMethods}
        required={true}
      />

      <FormField
        label="You can ask me about..."
        placeholder="e.g., internship experiences, course selection, work-life balance"
        value={askMeAbout}
        onChange={setAskMeAbout}
        multiline={true}
        rows={4}
        required={true}
      />

      <FormField
        label="In my freetime I enjoy..."
        placeholder="e.g., hiking, playing guitar, cooking, gaming"
        value={freetimeInterests}
        onChange={setFreetimeInterests}
        multiline={true}
        rows={4}
        required={true}
      />

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border-2 border-[#76a36d] text-[#76a36d] font-medium rounded hover:bg-[#76a36d] hover:text-white"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-[#76a36d] hover:bg-[#6a9462] text-white font-medium rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
