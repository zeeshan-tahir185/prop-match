"use client"
import React, { useState } from 'react';
import SingleAddressSearch from './SingleSearch';

const PropertyAnalysis = () => {
  const [isActive, setIsActive] = useState('Single Address');

  return (
    <div className="p-6">
      <h1 className="text-base lg:text-xl font-bold text-[#1E2029]">Property Analysis</h1>
      <p className="text-xs lg:text-base text-[#9A9DA4] mt-2">Simple property analysis tool with AI insights</p>
      <div className="mt-5 md:mt-8">
        <h2 className="text-sm lg:text-lg font-semibold text-[#1E2029]">Choose Analysis Type</h2>
        <div className="flex space-x-6 mt-2">
          <button
            className="bg-[#1A2B6C] w-full lg:w-[48%] text-white h-[48px] rounded-[5px] text-sm lg:text-[15px] font-medium"
            onClick={() => setIsActive('Single Address')}
          >
            Single Address
          </button>
          <button
            className="bg-[#F0F2F5] w-full lg:w-[48%] text-[#2A2A2A] h-[48px] rounded-[5px] text-sm lg:text-[15px] font-medium"
            onClick={() => setIsActive('Lead List')}
          >
            Lead List
          </button>
        </div>
      </div>
      {isActive === 'Single Address' && <SingleAddressSearch />}
      {isActive === 'Lead List' && <div className="mt-6">Lead List content will be added later</div>}
    </div>
  );
};

export default PropertyAnalysis;
