import Link from 'next/link';
import React from 'react';

const Navbar = ({ toggleSidebarMenu, toggleNavbarMenu }) => {
    return (
        <nav className="bg-white lg:border-b lg:border-l border-[#EDEDED] h-[100px] px-6 flex justify-between items-center fixed left-[16px] lg:left-64 right-0 z-10">
            <div className="flex items-center space-x-4 lg:hidden">
                <button onClick={toggleSidebarMenu} className="lg:hidden">
                    <svg className="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <Link href="/"><img src="/images/home/logo.svg" alt="PropMatch AI" className="w-[100px] lg:w-[160px]" /></Link>
            </div>
            <div className="flex items-center space-x-6 justify-end md:justify-between w-full">
                <button onClick={toggleNavbarMenu} className="lg:hidden">
                    <svg className="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="hidden lg:flex items-center space-x-6 justify-between w-full">
                    <div className="text-sm md:text-xl text-[#1E2029] font-bold">
                        Welcome back, <span className="font-normal ml-1">Alex</span>
                    </div>
                    <div className='w-auto flex items-center gap-5 cursor-pointer'>
                        <div className="relative h-[40px] w-[40px] rounded-full border border-[#E5E5E5] flex justify-center items-center">
                        <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </div>
                    <span className="bg-[#EDEDED] text-sm md:text-base px-3 py-1 rounded-[6px]">
                        Trial: 14 days left
                    </span>
                    <div className="border-l border-[#EDEDED] h-[46px]"></div>
                    <div className="flex items-center space-x-2 p-2 cursor-pointer">
                        <span className="w-[46px] h-[46px] bg-[#1A2B6C] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            AB
                        </span>
                        <div className="flex flex-col">
                            <span className="text-sm md:text-base font-medium">Alex Brandt</span>
                            <span className="text-[13px] font-light text-[#9A9DA4]">Real Estate Agent</span>
                        </div>
                        <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center ml-2 border border-[#E5E5E5]">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;