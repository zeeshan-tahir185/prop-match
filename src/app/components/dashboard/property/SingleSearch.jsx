import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";

const SingleAddressSearch = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mt-6">
            <h2 className="text-sm font-medium text-[#1E2029]">Enter Property Address</h2>
            <div className="flex items-start mt-2 flex-col md:flex-row ">
                <div className="w-full">
                    <div className="relative w-full">
                        <HiOutlineLocationMarker className='text-[#1A2B6C] text-lg font-bold absolute left-3 top-1/2 transform -translate-y-1/2' />
                        <input
                            type="text"
                            className="w-full h-[48px] pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    {!isFocused && (
                        <p className="text-sm text-[#9A9DA4] mt-1">
                            Enter an address to generate sale-likelihood and pricing. For example: [123 Main St, Toronto].
                        </p>
                    )}
                </div>
                <button className="ml-6 bg-[#1A2B6C] text-white w-full lg:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2 md:mt-0">
                    <IoSearchOutline />
                    Analyze
                </button>
            </div>
        </div>
    );
};

export default SingleAddressSearch;
