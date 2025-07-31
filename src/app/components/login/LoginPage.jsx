"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);

    // Handle Caps Lock detection
    const handleKeyPress = (e) => {
        const capsLock = e.getModifierState("CapsLock");
        setIsCapsLockOn(capsLock);
    };

    useEffect(() => {
        const input = document.querySelector('input[type="password"], input[type="text"]');
        input?.addEventListener("keypress", handleKeyPress);
        return () => input?.removeEventListener("keypress", handleKeyPress);
    }, [showPassword]); // Re-run effect when showPassword changes

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Section with Background Image and Text Overlay */}
            <div
                className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-[800px] bg-cover bg-center login_bg_img"
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-12">
                    <Image
                        src="/images/login/logo.png"
                        width={150}
                        height={36}
                        alt="PropMatch AI Logo"
                        className="mb-4"
                    />
                    <div className="flex flex-col gap-6 text-white">
                        <h1 className="text-xl md:text-4xl font-bold leading-tight max-w-md">
                            Instant AI insights for<br />
                            1,200+ Canadian agents.
                        </h1>
                        <p className="text-sm md:text-base text-white/80 max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing,<br />
                            sed do eiusmod tempor incididunt ut labore.
                        </p>
                        <div className="w-[160px] h-[24px]">
                            <Image
                                src="/images/login/slider.png"
                                width={160}
                                height={24}
                                alt="Slider"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section with Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                        Welcome Back to PropMatch
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base mb-8">
                        Log in to continue your 14-day trial.
                    </p>

                    <form className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-[#000000] mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-start gap-3 items-center mb-2">
                                <label className="text-sm font-medium ">Password</label>
                                <a href="#" className="text-sm text-[#1A2B6C] hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                    onKeyPress={handleKeyPress}
                                />
                                <span
                                    className="absolute right-[100px] top-1/2 -translate-y-1/2 text-lg text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    Caps Lock
                                </span>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        {/* Log In Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#1A2B6C] text-white py-2 rounded-md hover:bg-[#142050] transition-colors duration-300 h-[48px]"
                        >
                            Log In
                        </button>

                        {/* Divider */}
                        <div className="flex items-center justify-center text-base">
                            or
                        </div>

                        {/* Google Sign-in */}
                        <button
                            type="button"
                            className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                        >
                            <Image
                                src="/images/login/google.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span className="text-[15px] font-semibold ">Sign in with Google</span>
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-base text-center text-[#9A9DA4] mt-6">
                        Don’t have an account yet?{" "}
                        <a href="#" className="text-[#1A2B6C] font-semibold hover:underline">
                            Start free trial
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;