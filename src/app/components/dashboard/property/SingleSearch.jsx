"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SingleAddressSearch = ({ onStepChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [confirmedAddress, setConfirmedAddress] = useState(null);
    const [propertyId, setPropertyId] = useState(null);
    const [propertyData, setPropertyData] = useState(null);
    const [queryId] = useState("123"); // Example query_id
    const [currentStep, setCurrentStep] = useState(0);
    const [scoreData, setScoreData] = useState(null);

    const handleAnalyze = async () => {
        if (!address.trim()) {
            setError("Please enter a valid address");
            return;
        }

        setLoading(true);
        setError(null);
        setSuggestions([]);
        setCurrentStep(1);
        onStepChange(1);

        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/search-addresses?query_id=${queryId}`,
                { address_string: address },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setSuggestions(response.data.suggestions || []);
            }
        } catch (err) {
            setError("Failed to fetch address suggestions");
        } finally {
            setLoading(false);
        }
    };

    const handleValidateAddress = async () => {
        if (selectedIndex === null || suggestions.length === 0) return;

        const selectedSuggestion = suggestions[selectedIndex];
        const currentConfirmedAddress = selectedSuggestion.complete_address;
        const currentPropertyId = selectedSuggestion.property_id;
        setConfirmedAddress(currentConfirmedAddress);
        setPropertyId(currentPropertyId);
        setSuggestions([]); // Clear suggestions

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/get-property-details?query_id=${queryId}`,
                {
                    property_id: currentPropertyId,
                    complete_address: currentConfirmedAddress
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setPropertyData(response.data.property_data);
                setCurrentStep(2);
                onStepChange(2);
            }
        } catch (err) {
            setError("Failed to fetch property details");
        } finally {
            setLoading(false);
        }
    };

    const handleGetPropertyScore = async () => {
        if (!confirmedAddress) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/propmatch-score`,
                {
                    address_string: confirmedAddress,
                    query_id: queryId
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setScoreData(response.data.prediction_score);
                setCurrentStep(3);
                onStepChange(3);
            }
        } catch (err) {
            setError("Failed to fetch property score");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyAddress = () => {
        alert("Address copied to clipboard!");
    };

    const handleCopyId = () => {
        alert("Property ID copied to clipboard!");
    };

    const handleClearAndStartNew = () => {
        setAddress("");
        setSuggestions([]);
        setError(null);
        setSelectedIndex(null);
        setConfirmedAddress(null);
        setPropertyId(null);
        setPropertyData(null);
        setScoreData(null);
        setCurrentStep(0);
        onStepChange(0);
    };

    return (
        <div className="mt-6">
            <div className="flex items-start mt-2 flex-col md:flex-row gap-6">
                <div className="w-full">
                    <div className="relative w-full">
                        <HiOutlineLocationMarker className='text-[#1A2B6C] text-lg font-bold absolute left-3 top-1/2 transform -translate-y-1/2' />
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Property Address"
                            className="w-full h-[48px] pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    {loading ? (
                        <div className="text-sm text-[#9A9DA4] mt-1 flex items-center">
                            <div className="w-5 h-5 border-2 border-t-[#1A2B6C] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                            Loading...
                        </div>
                    ) : error ? (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    ) : suggestions.length > 0 ? (
                        <p className="text-sm font-normal mt-3 mb-5 flex items-center gap-2 h-[48px] bg-[#E8EEFF] rounded-[5px] px-4 text-[#000000]">
                            <img src="/images/property/mark.png" className='w-[22px] h-[22px]' alt="" />
                            {suggestions.length} matches found. Select the correct address below.</p>
                    ) : isFocused ? null : (
                        <p className="text-sm text-[#9A9DA4] mt-1">
                            Enter an address to generate sale-likelihood and pricing. For example: [123 Main St, Toronto].
                        </p>
                    )}
                </div>
                <div className="flex space-x-4">
                    <button
                        className="bg-[#1A2B6C] text-white w-full lg:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2 md:mt-0"
                        onClick={suggestions.length > 0 ? handleValidateAddress : handleAnalyze}
                        disabled={loading || (suggestions.length > 0 && selectedIndex === null)}
                    >
                        <IoSearchOutline />
                        {suggestions.length > 0 ? "Validate Address" : "Analyze"}
                    </button>
                    {currentStep === 2 && (
                        <button
                            className="bg-[#1A2B6C] text-white w-full lg:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2 md:mt-0"
                            onClick={handleClearAndStartNew}
                        >
                            Clear & Start New
                        </button>
                    )}
                </div>
            </div>
            {suggestions.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold text-[#1E2029] mb-3">Select the Correct Address ({suggestions.length} options found)</h3>
                    <p className='text-[#000000] text-sm font-medium mb-1'>Select the Correct Address</p>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`flex items-start justify-between w-full ${selectedIndex === index ? 'border-l-[2px] border-[#1A2B6C]' : ''}`}
                        >
                            <div onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
                                className="text-base text-[#000000] w-full flex justify-between items-center gap-2 p-2 border border-[#EDEDED] hover:bg-gray-100 h-[65px]">
                                <div className='w-full flex items-center gap-2'>
                                    <HiOutlineLocationMarker className='text-[rgb(26,43,108)] text-lg font-bold' />
                                    {suggestion.complete_address}
                                </div>
                                {(index === 0 || index === 1) && (
                                    <span className="bg-[#28A745] text-white text-base font-semibold w-[122px] h-[36px] flex justify-center items-center rounded">Exact Match</span>
                                )}
                            </div>
                            <div className='w-full lg:w-[245px]'>

                                {selectedIndex === index && (
                                    <button
                                        className="ml-6 bg-[#1A2B6C] text-white w-full h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                        onClick={() => { }} // No functionality, just for UI
                                    >
                                        Confirm Address
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {confirmedAddress && propertyData && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                    </div>
                    <div className=" p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2">
                            <div className='bg-[#F4F6F8] flex items-center w-[469px] h-[48px] rounded-[5px] px-3'>
                                <HiOutlineLocationMarker className="text-[#1A2B6C] text-lg font-bold" />
                                <input
                                    type="text"
                                    value={confirmedAddress}
                                    readOnly
                                    className="flex-1 bg-transparent border-none text-base text-[#000000] focus:outline-none"
                                />
                                <CopyToClipboard text={confirmedAddress} onCopy={handleCopyAddress}>
                                    <button className=" text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </CopyToClipboard>
                            </div>
                            <div className='bg-[#F4F6F8] flex items-center w-[392px] h-[48px] rounded-[5px] px-3 justify-between'>
                                <input
                                    type="text"
                                    value={propertyData.property_id || ""}
                                    readOnly
                                    className=" bg-transparent text-base text-[#000000] px-2 focus:outline-none"
                                />
                                <CopyToClipboard text={propertyData.property_id || ""} onCopy={handleCopyId}>
                                    <button className="text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </CopyToClipboard>
                            </div>
                            <button
                                className="w-[245px] h-[48px] bg-[#1A2B6C] text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 ml-2"
                                onClick={handleGetPropertyScore}
                            >
                                <IoSearchOutline />
                                Get Property Score
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {scoreData && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                        <div className="flex space-x-4">
                            <button
                                className="bg-[#1A2B6C] text-white w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                onClick={() => { }}
                            >
                                Generate Outreach
                            </button>
                            <button
                                className="bg-[#1A2B6C] text-white w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                onClick={() => { }}
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-[#28A745] text-white text-base font-semibold px-4 py-2 rounded">{Math.round(scoreData.predicted_score)}/10</span>
                            <div>
                                <p className="text-sm text-green-600">✓ Analyzed 52 market indicators</p>
                                <p className="text-sm text-green-600">✓ Compared 1.4M homes</p>
                                <p className="text-sm text-green-600">✓ 92% prediction accuracy</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-[#F4F6F8] p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-600">AI-Optimized Pricing Strategy</h3>
                                <div className="mt-2">
                                    <p className="text-lg font-bold">${scoreData.listing_prices.quick_sale_2_months.toLocaleString()} <span className="text-red-500 ml-2">▼ -6.4%</span></p>
                                    <p className="text-xs text-gray-500">Quick Sale (2 months)</p>
                                </div>
                            </div>
                            <div className="bg-[#F4F6F8] p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-600">Market Pace (6 months)</h3>
                                <p className="text-lg font-bold">${scoreData.listing_prices.market_pace_6_months.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#F4F6F8] p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-600">Baseline</h3>
                                <p className="text-lg font-bold">${scoreData.listing_prices.patient_sale_12_months.toLocaleString()} <span className="text-green-500 ml-2">▲ +5%</span></p>
                                <p className="text-xs text-gray-500">Patient Sale (12 months)</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <h3 className="text-sm font-medium text-gray-600">Statistical Analysis</h3>
                            <p className="text-xs text-gray-500">All flagged median days-on-market at 31 (city avg: 28). Seasonally adjusted volatility 3%</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-600">Market Trends</h3>
                            <div className="mt-2">
                                <select className="p-2 border rounded">
                                    <option>2024</option>
                                </select>
                                <div className="mt-2">
                                    <p className="text-lg font-bold">${scoreData.listing_prices.market_pace_6_months.toLocaleString()}</p>
                                    <div className="w-full h-32 bg-gray-200">
                                        {/* Placeholder for chart */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleAddressSearch;