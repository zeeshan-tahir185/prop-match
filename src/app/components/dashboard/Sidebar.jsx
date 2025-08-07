"use client";
import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { LiaHomeSolid } from "react-icons/lia";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ isMobileMenu = false, toggleMobileMenu }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-[#FDFDFF] ${
        isMobileMenu ? 'w-full h-full' : 'w-[100px] lg:w-64 min-h-screen fixed'
      } shadow-md flex flex-col justify-between z-50`}
    >
      <div>
        <div className="h-[100px] flex justify-between items-center border-b border-[#EDEDED] px-4">
          <Link href="/"><img src="/images/home/logo.svg" alt="PropMatch AI" className="w-[100px] lg:w-[160px]" /></Link>
          {isMobileMenu && (
            <button onClick={toggleMobileMenu} className="lg:hidden">
              <svg className="w-6 h-6 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <ul className="space-y-2 p-4 flex flex-col items-center lg:items-start">
          {[
            { href: '/dashboard', icon: RxDashboard, label: 'Dashboard' },
            { href: '/dashboard/property-analysis', icon: RxDashboard, label: 'Property Analysis' },
            { href: '/dashboard/leads', icon: TbUsers, label: 'Leads' },
            { href: '/dashboard/properties', icon: LiaHomeSolid, label: 'Properties' },
            { href: '/dashboard/reports', icon: TbReportAnalytics, label: 'Reports' },
            { href: '/dashboard/search-history', icon: MdOutlineAccessTime, label: 'Search History' },
          ].map(({ href, icon: Icon, label }) => (
            <li key={href} className="w-full flex justify-center lg:justify-start">
              <Link
                href={href}
                className={`flex w-full items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] ${
                  pathname === href ? 'bg-black text-white' : 'hover:bg-gray-200'
                } ${isMobileMenu ? 'justify-start' : 'hidden lg:flex'}`}
                onClick={isMobileMenu ? toggleMobileMenu : undefined}
              >
                <span
                  className={`h-[42px] w-[42px] rounded-full flex justify-center items-center ${
                    pathname === href ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'
                  }`}
                >
                  <Icon className={`text-[16px] ${pathname === href ? 'text-white' : 'text-[#6B7280]'}`} />
                </span>
                <span className={`${isMobileMenu ? 'block' : 'hidden lg:block'}`}>{label}</span>
              </Link>
              {!isMobileMenu && (
                <Link
                  href={href}
                  className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${
                    pathname === href ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'
                  } lg:hidden`}
                >
                  <Icon className={`text-[16px] ${pathname === href ? 'text-white' : 'text-[#6B7280]'}`} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-[#EDEDED] p-4 flex flex-col items-center lg:items-start w-full">
        <Link
          href="/dashboard/settings"
          className={`w-full flex items-center text-[15px] rounded-[42px] gap-3 text-[#6B7280] hover:bg-gray-200 ${
            pathname === '/dashboard/settings' ? 'bg-black text-white' : ''
          } ${isMobileMenu ? 'justify-start' : ''}`}
          onClick={isMobileMenu ? toggleMobileMenu : undefined}
        >
          <span
            className={`h-[42px] w-[42px] rounded-full ${
              isMobileMenu ? 'flex' : 'hidden lg:flex'
            } justify-center items-center ${
              pathname === '/dashboard/settings' ? 'bg-[#333A3E]' : 'bg-[#EAE9EE]'
            }`}
          >
            <LuSettings
              className={`text-[16px] ${pathname === '/dashboard/settings' ? 'text-white' : 'text-[#6B7280]'}`}
            />
          </span>
          <span className={`${isMobileMenu ? 'block' : 'hidden lg:block'}`}>Settings</span>
        </Link>
        {!isMobileMenu && (
          <Link
            href="/dashboard/settings"
            className={`flex items-center justify-center w-[42px] h-[42px] rounded-[42px] ${
              pathname === '/dashboard/settings' ? 'bg-black' : 'bg-[#EAE9EE] hover:bg-gray-200'
            } lg:hidden`}
          >
            <LuSettings
              className={`text-[16px] ${pathname === '/dashboard/settings' ? 'text-white' : 'text-[#6B7280]'}`}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;