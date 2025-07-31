"use client"
import React, { useState } from 'react';
import { FaTachometerAlt, FaChartLine, FaUsers, FaHome, FaFileAlt, FaHistory, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-[#FDFDFF] w-[100px] lg:w-64 min-h-screen fixed shadow-md flex flex-col justify-between">
            <div>
                <div className="h-[100px] flex justify-center items-center border-b border-[#EDEDED]">
                    <img src="/images/home/logo.svg" alt="PropMatch AI" className="w-[70px] lg:w-[160px]" />
                </div>
                <ul className="space-y-2 p-4 flex flex-col items-center lg:items-start">
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard"
                            className={`flex w-full items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${pathname === '/dashboard' ? 'bg-black text-white' : 'hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <RxDashboard className={`text-[16px] ${pathname === '/dashboard' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block">Dashboard</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <RxDashboard className={`text-[16px] ${pathname === '/dashboard' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard/property-analysis"
                            className={` flex w-full items-center text-[15px] rounded-[42px] gap-3 ${pathname === '/dashboard/property-analysis' ? 'bg-black text-white' : 'text-[#6B7280] hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard/property-analysis' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <RxDashboard className={`text-[16px] ${pathname === '/dashboard/property-analysis' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block ">Property Analysis</span>
                        </Link>
                        <Link
                            href="/dashboard/property-analysis"
                            className={` flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/property-analysis' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <RxDashboard className={`text-[16px] ${pathname === '/dashboard/property-analysis' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard/leads"
                            className={`w-full flex items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${pathname === '/dashboard/leads' ? 'bg-black text-white' : 'hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard/leads' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <TbUsers className={`text-[16px] ${pathname === '/dashboard/leads' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block">Leads</span>
                        </Link>
                        <Link
                            href="/dashboard/leads"
                            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/leads' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <TbUsers className={`text-[16px] ${pathname === '/dashboard/leads' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard/properties"
                            className={`w-full flex items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${pathname === '/dashboard/properties' ? 'bg-black text-white' : 'hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard/properties' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <LiaHomeSolid className={`text-[16px] ${pathname === '/dashboard/properties' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block">Properties</span>
                        </Link>
                        <Link
                            href="/dashboard/properties"
                            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/properties' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <LiaHomeSolid className={`text-[16px] ${pathname === '/dashboard/properties' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard/reports"
                            className={`w-full flex items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${pathname === '/dashboard/reports' ? 'bg-black text-white' : 'hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard/reports' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <TbReportAnalytics className={`text-[16px] ${pathname === '/dashboard/reports' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block">Reports</span>
                        </Link>
                        <Link
                            href="/dashboard/reports"
                            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/reports' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <TbReportAnalytics className={`text-[16px] ${pathname === '/dashboard/reports' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                    <li className='w-full flex justify-center lg:justify-start'>
                        <Link
                            href="/dashboard/search-history"
                            className={`w-full flex items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${pathname === '/dashboard/search-history' ? 'bg-black text-white' : 'hover:bg-gray-200'} ${'lg:flex'} ${'lg:items-center'} ${'hidden lg:flex'}`}
                        >
                            <span className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${pathname === '/dashboard/search-history' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                                <MdOutlineAccessTime className={`text-[16px] ${pathname === '/dashboard/search-history' ? 'text-white' : 'text-[#6B7280]'}`} />
                            </span>
                            <span className="hidden lg:block">Search History</span>
                        </Link>
                        <Link
                            href="/dashboard/search-history"
                            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/search-history' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                        >
                            <MdOutlineAccessTime className={`text-[16px] ${pathname === '/dashboard/search-history' ? 'text-white' : 'text-[#6B7280]'}`} />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="border-t border-[#EDEDED] p-4 flex flex-col items-center lg:items-start w-full">
                <Link
                    href="/dashboard/settings"
                    className={`w-full flex  items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] hover:bg-gray-200 ${pathname === '/dashboard/settings' ? 'bg-black text-white' : ''}`}
                >
                    <span className={`h-[42px] w-[42px] rounded-full hidden lg:flex justify-center items-center ${pathname === '/dashboard/settings' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'}`}>
                        <LuSettings className={`text-[16px] ${pathname === '/dashboard/settings' ? 'text-white' : 'text-[#6B7280]'}`} />
                    </span>
                    <span className="hidden lg:block">Settings</span>
                </Link>
                <Link
                    href="/dashboard/settings"
                    className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${pathname === '/dashboard/settings' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'} lg:hidden`}
                >
                    <LuSettings className={`text-[16px] ${pathname === '/dashboard/settings' ? 'text-white' : 'text-[#6B7280]'}`} />
                </Link>
            </div>
            
        </div>
    );
};

export default Sidebar;
