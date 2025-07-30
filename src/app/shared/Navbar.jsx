'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaRocket, FaGlobe } from 'react-icons/fa';
import { MdOutlineRocketLaunch } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=''>
            <nav className="!bg-white max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center h-[100px] fixed top-0 w-full left-0 right-0">
            <Link href="/" className="flex items-center">
                <Image src="/images/home/logo.svg" alt='logo' width={160} height={26} />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
                <Link href="/property-analysis" className="">Property Analysis</Link>
                <Link href="/lead-ranking" className="">Lead Ranking</Link>
                <Link href="/pricing" className="">Pricing</Link>
                <Link href="/resources" className="">Resources</Link>
                <button className="bg-[#1A2B6C] text-white w-[148px] h-[48px] rounded-[5px] flex items-center justify-center">
                    <MdOutlineRocketLaunch className="mr-2 w-[22px] h-[22px]" />Get Started
                </button>
                <div className="flex gap-1">
                    <IoIosGlobe className="w-[24px] h-[24px]" />
                    <select className=" bg-white border-none focus:outline-none text-base">
                        <option value="en">EN</option>
                    </select>
                </div>
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-10">
                    <div className="flex flex-col items-center space-y-4 py-4">
                        <Link href="/property-analysis" className="" onClick={() => setIsOpen(false)}>Property Analysis</Link>
                        <Link href="/lead-ranking" className="" onClick={() => setIsOpen(false)}>Lead Ranking</Link>
                        <Link href="/pricing" className="" onClick={() => setIsOpen(false)}>Pricing</Link>
                        <Link href="/resources" className="" onClick={() => setIsOpen(false)}>Resources</Link>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" onClick={() => setIsOpen(false)}>
                            <MdOutlineRocketLaunch className="mr-2 w-[22px] h-[22px]" />Get Started
                        </button>
                        <div className="flex gap-3 border-2">
                            <IoIosGlobe className=" w-[24px] h-[24px]" />
                            <select className=" bg-white border-none focus:outline-none w-full">
                                <option value="en">EN</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </nav>
        </div>
    );
};

export default Navbar;