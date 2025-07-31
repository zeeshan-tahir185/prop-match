import React from 'react';
import { FaBell } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { FiBell } from "react-icons/fi";

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-l border-[#EDEDED] h-[100px] px-6  flex justify-between items-center fixed left-[100px] lg:left-64 right-0 z-10">
            <div className=" text-sm md:text-xl text-[#1E2029] font-bold hidden lg:flex">Welcome back,  <span className='font-normal ml-1'> Alex</span></div>
            <div className="flex items-center space-x-6">
                <div className="relative h-[40px] w-[40px] rounded-full border border-[#E5E5E5] flex justify-center items-center">
                    <FiBell className=" text-xl" />
                    <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                </div>
                <span className="bg-[#EDEDED] text-sm md:text-base px-3 py-1 rounded-[6px] hidden lg:flex">Trial: 7 days left</span>
                <div className='border-l border-[#EDEDED] h-[46px]'></div>
                <div className="flex items-center space-x-2 p-2 ">
                    <span className="w-[46px] h-[46px] bg-[#1A2B6C] text-white rounded-full flex items-center justify-center text-sm font-semibold">AB</span>
                    <div className="flex flex-col">
                        <span className="text-sm md:text-base font-medium">Alex Brandt</span>
                        <span className=" text-[13px] font-light text-[#9A9DA4]">Real Estate Agent</span>
                    </div>
                    <div className="w-[36px] h-[36px] rounded-full hidden md:flex items-center justify-center ml-2 border border-[#E5E5E5] ">
                        <IoIosArrowDown className="text-gray-500 text-base" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
