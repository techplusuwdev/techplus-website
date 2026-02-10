import React from 'react';
import FormRadioGroup from '@/components/molecules/form/formRadio';
import FormSelect from '@/components/molecules/form/formDropDown';

interface Step2Props {
  // Dropdown fields
  raceEthnicOrigin: string;
  setRaceEthnicOrigin: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  sexualOrientation: string;
  setSexualOrientation: (value: string) => void;
  
  // Radio button
  isIndigenous: string;
  setIsIndigenous: (value: string) => void;
  
  // Navigation
  onNext: () => void;
  onBack: () => void;
}

export default function Page2({
  raceEthnicOrigin,
  setRaceEthnicOrigin,
  gender,
  setGender,
  sexualOrientation,
  setSexualOrientation,
  isIndigenous,
  setIsIndigenous,
  onNext,
  onBack,
}: Step2Props) {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl text-black font-bold text-center mb-4">
        This section is OPTIONAL.
      </h1>
      
      <p className="text-[#0A1628] text-center mb-8">
        We're collecting this in the case that some mentees may be looking for mentors 
        who they identify with. This information will also be valuable data for diversity and 
        inclusion initiatives that are launching at Tech+ this term.
        <br /><br />
        This will NOT be shared outside of the organizing team who handles the mentor/
        mentee pairing.
      </p>

      {/* Race/Ethnic Origin Dropdown */}
      <FormSelect
        label="What is your race/ethnic origin?"
        options={[
          "Asian",
          "Black",
          "Hispanic/Latino",
          "Indigenous",
          "Middle Eastern",
          "White",
          "Mixed/Multiple",
          "Prefer not to say",
          "Other"
        ]}
        value={raceEthnicOrigin}
        onChange={setRaceEthnicOrigin}
        placeholder="Select..."
        required={true}
      />

      {/* Gender Dropdown */}
      <FormSelect
        label="What is your gender?"
        options={[
          "Man",
          "Woman",
          "Non-binary",
          "Genderqueer",
          "Genderfluid",
          "Agender",
          "Two-Spirit",
          "Prefer not to say",
          "Other"
        ]}
        value={gender}
        onChange={setGender}
        placeholder="Select..."
        required={true}
      />

      {/* Sexual Orientation Dropdown */}
      <FormSelect
        label="What is your sexual orientation?"
        options={[
          "Heterosexual/Straight",
          "Gay",
          "Lesbian",
          "Bisexual",
          "Pansexual",
          "Asexual",
          "Queer",
          "Questioning",
          "Prefer not to say",
          "Other"
        ]}
        value={sexualOrientation}
        onChange={setSexualOrientation}
        placeholder="Select..."
        required={true}
      />

      {/* Indigenous Radio Button */}
      <FormRadioGroup
        label="Do you identify as an Indigenous person?"
        options={["Yes", "No"]}
        value={isIndigenous}
        onChange={setIsIndigenous}
        required={true}
      />

      {/* Navigation Buttons */}
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