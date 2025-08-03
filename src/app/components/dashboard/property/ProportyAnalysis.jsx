"use client";
import React, { useState } from 'react';
import SingleAddressSearch from './SingleSearch';

const PropertyAnalysis = () => {
  const [isActive, setIsActive] = useState('Single Address');
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (step > 0) setShowSteps(true); // Show steps from Step 1 onwards
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base lg:text-xl font-bold text-[#1E2029]">Property Analysis</h1>
        {showSteps && (
          <div className="flex items-center space-x-2 flex-col gap-2">
            <div className="w-[200px] h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A2B6C] transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-[#1A2B6C] font-medium">Step {currentStep}/4</span>
          </div>
        )}
      </div>
      <p className="text-xs lg:text-base text-[#9A9DA4] mt-2">Simple property analysis tool with AI insights</p>
      <div className="mt-5 md:mt-8">
        <h2 className="text-sm lg:text-lg font-semibold text-[#1E2029]">Choose Analysis Type</h2>
        <div className="flex space-x-6 mt-2">
          <button
            className="cursor-pointer bg-[#1A2B6C] w-full lg:w-[48%] text-white h-[48px] rounded-[5px] text-sm lg:text-[15px] font-medium"
            onClick={() => setIsActive('Single Address')}
          >
            Single Address
          </button>
          <button
            className="cursor-pointer bg-[#F0F2F5] w-full lg:w-[48%] text-[#2A2A2A] h-[48px] rounded-[5px] text-sm lg:text-[15px] font-medium"
            onClick={() => setIsActive('Lead List')}
          >
            Lead List
          </button>
        </div>
      </div>
      {isActive === 'Single Address' && (
        <SingleAddressSearch onStepChange={handleStepChange} />
      )}
      {isActive === 'Lead List' && <div className="mt-6">Lead List content will be added later</div>}
    </div>
  );
};

export default PropertyAnalysis;