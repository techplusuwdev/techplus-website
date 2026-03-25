'use client';

import React, { useState } from 'react';

interface Step4Props {
  profilePicture: File | null;
  setProfilePicture: (file: File | null) => void;
  loading?: boolean;
  onBack: () => void;
  onSkip: () => void;
}

export default function Step4({
  profilePicture,
  setProfilePicture,
  loading = false,
  onBack,
  onSkip,
}: Step4Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-5xl text-[#6B8E6B] font-medium text-center mb-4">
        Profile Information
      </h1>
      
      <p className="text-[#0A1628] text-center mb-8">
        Please fill out the remaining information. These are things your mentee will see 
        about you! This can be edited later.
      </p>

      <h2 className="text-2xl text-black font-bold text-center mb-8">
        Upload Picture
      </h2>

      {/* Profile Picture Upload Area */}
      <div className="flex flex-col items-center mb-8">
        {/* Preview Circle */}
        <div className="relative w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Profile preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            // Default user icon (CSS-only)
            <div className="w-20 h-20 rounded-full bg-gray-400 relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-600"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 rounded-t-full bg-gray-600"></div>
            </div>
          )}
          
          {/* Plus button overlay */}
          <label 
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500"
          >
            {/* Plus icon (CSS) */}
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white -translate-x-1/2"></div>
            </div>
          </label>
        </div>

        {/* Hidden file input */}
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-black text-sm">Click to upload!</p>
      </div>

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
          onClick={onSkip}
          className="px-6 py-3 bg-[#76a36d] hover:bg-[#6a9462] text-white font-medium rounded"
        >
          Skip
        </button>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 px-6 py-3 bg-[#6B8E6B] hover:bg-[#5a7559] text-white font-bold rounded disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  );
}
