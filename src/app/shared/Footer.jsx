import Link from 'next/link';
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosGlobe } from 'react-icons/io';

const Footer = () => {
    return (
        <div className='bg-white border-t border-[#ededed] my-[50px]'>
            <div className='max-w-[1440px] px-[30px] mx-auto flex flex-col md:flex-row justify-between items-center gap-[50px]'>
                <div className='flex flex-col gap-[30px] md:gap-[70px] mt-[50px]'>
                    <p>
                        Need help? <span className='font-[600]'>support@propmatch.io</span>
                    </p>
                    <div className='flex items-center gap-[20px] justify-center md:justify-start'>
                        <FaLinkedin className='text-[36px] text-[#1A2B6C]' />
                        <FaXTwitter className='text-[36px] text-[#1A2B6C]' />

                    </div>
                </div>
                <div className='flex flex-col gap-[30px] md:gap-[70px] font-light items-center md:items-end md:mt-[50px] '>
                    <div className='flex flex-col md:flex-row flex-wrap gap-[50px] text-center md:text-start'>
                        <Link href="/about" className="">About Us</Link>
                        <Link href="/contact" className="">Contact</Link>
                        <Link href="/privacy-policy" className="">Privacy Policy</Link>
                        <Link href="/terms-of-services" className="">Terms of Service</Link>
                        <div className="flex gap-1 justify-center">
                            <IoIosGlobe className="w-[24px] h-[24px]" />
                            <select className=" bg-white border-none focus:outline-none text-base">
                                <option value="en">EN</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center gap-[30px] flex-col md:flex-row'>
                        <img src="/images/home/footer3.svg" alt="" />
                        <img src="/images/home/footer2.svg" alt="" />
                        <img src="/images/home/footer1.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
