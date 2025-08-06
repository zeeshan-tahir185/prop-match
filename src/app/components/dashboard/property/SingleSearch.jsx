"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { IoSearchOutline, IoCopyOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import PriceTrendChart from './PriceTrendChart'; // Adjust path as per your project structure
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import ScoreAnalysis from './ScoreAnalysis';
import { FaCheck } from 'react-icons/fa6';

const SingleAddressSearch = ({ onStepChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading..."); // New state for dynamic loading message
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [confirmedAddress, setConfirmedAddress] = useState(null);
    const [propertyId, setPropertyId] = useState(null);
    const [propertyData, setPropertyData] = useState(null);
    const [queryId] = useState("123"); // Example query_id
    const [currentStep, setCurrentStep] = useState(0);
    const [scoreData, setScoreData] = useState(null);
    const [isCopied, setIsCopied] = useState({ address: false, id: false, text: false, pitch: false, email: false }); // Track copy state
    const [selectedYear, setSelectedYear] = useState(""); // Default to "All Years" (empty string)
    const [reportData, setReportData] = useState(null);
    const [outreachData, setOutreachData] = useState(null);

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied((prev) => ({ ...prev, [type]: true }));
            setTimeout(() => {
                setIsCopied((prev) => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleAnalyze = async () => {
        if (!address.trim()) {
            setError("Please enter a valid address");
            return;
        }
        setLoading(true);
        setLoadingMessage("Searching for addresses..."); // Specific message for address search
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
        setSuggestions([]);
        setLoading(true);
        setLoadingMessage("Fetching property details..."); // Specific message for property details
        setError(null);
        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/get-property-details?query_id=${queryId}`,
                { property_id: currentPropertyId, complete_address: currentConfirmedAddress },
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
        setLoadingMessage("Getting property details, saving to database, and calculating score..."); // Specific message for score calculation
        setError(null);
        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/propmatch-score`,
                { address_string: confirmedAddress, query_id: queryId },
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

    const handleGenerateReport = async () => {
        if (!confirmedAddress || !scoreData) return;
        setLoading(true);
        setLoadingMessage("Generating property report..."); // Specific message for report generation
        setError(null);
        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/generate-report`,
                { query_id: queryId },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setReportData(response.data);
                setCurrentStep(4);
                onStepChange(4);
            }
        } catch (err) {
            setError("Failed to generate report");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOutreach = async () => {
        if (!confirmedAddress || !scoreData) return;
        setLoading(true);
        setLoadingMessage("Generating AI outreach messages..."); // Specific message for outreach generation
        setError(null);
        try {
            const response = await axios.post(
                `https://propmatch-backend-1077352833070.us-central1.run.app/generate-ai-messages`,
                { query_id: queryId },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setOutreachData(response.data);
                setCurrentStep(5);
                onStepChange(5);
            }
        } catch (err) {
            setError("Failed to generate outreach");
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePDF = async () => {
        if (!confirmedAddress || !scoreData) return;
        setLoading(true);
        setLoadingMessage("Generating PDF report..."); // Specific message for PDF generation
        setError(null);
        try {
            // Placeholder: Generate PDF logic can be added here if needed via API
            // For now, trigger download of existing public PDF
            const pdfUrl = '/public/reports/property_report.pdf'; // Update with actual file path
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `property_report_${queryId}.pdf`; // Customize filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError("Failed to generate or download PDF");
        } finally {
            setLoading(false);
        }
    };

    const handleClearAndStartNew = () => {
        if (currentStep === 4 || currentStep === 5) {
            setCurrentStep(3);
            onStepChange(3);
        } else {
            setAddress("");
            setSuggestions([]);
            setError(null);
            setSelectedIndex(null);
            setConfirmedAddress(null);
            setPropertyId(null);
            setPropertyData(null);
            setScoreData(null);
            setReportData(null);
            setOutreachData(null);
            setCurrentStep(0);
            onStepChange(0);
        }
    };

    // Extract unique years from predictions for dropdown
    const years = propertyData?.predictions[0].predictions
        ? [...new Set(propertyData.predictions[0].predictions.map(pred => new Date(pred.date).getFullYear()))]
        : [];

    // Calculate YOY percentage change (based on latest available data)
    const calculateYOY = () => {
        if (!propertyData?.predictions[0].predictions) return "N/A";
        const predictions = propertyData.predictions[0].predictions;
        const currentDate = new Date();
        const latestPred = predictions.find(pred => new Date(pred.date) <= currentDate) || predictions[predictions.length - 1];
        const prevYearPred = predictions.find(pred => {
            const predDate = new Date(pred.date);
            return predDate.getFullYear() === currentDate.getFullYear() - 1 && predDate <= currentDate;
        }) || predictions[0];

        const yoyChange = ((latestPred.estimate_sale_price - prevYearPred.estimate_sale_price) / prevYearPred.estimate_sale_price) * 100;
        return yoyChange.toFixed(1);
    };

    const yoyPercentage = calculateYOY();

    return (
        <div className="mt-6">
            <p className='text-sm font-medium mb-2'>Enter Property Address</p>
            <div className="flex items-start mt-2 flex-col md:flex-row gap-4">
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
                            {loadingMessage}
                        </div>
                    ) : error ? (
                        <p className="text-sm text-red-500 mt-1">{error}</p>
                    ) : suggestions.length > 0 ? (
                        <p className="text-sm font-normal mt-3 mb-5 hidden md:flex items-center gap-2 h-[48px] bg-[#E8EEFF] rounded-[5px] px-4 text-[#000000]">
                            <img src="/images/property/mark.png" className='w-[22px] h-[22px]' alt="" />
                            {suggestions.length} matches found. Select the correct address below.</p>
                    ) : isFocused ? null : (
                        currentStep === 0 && (
                            <p className="text-sm text-[#9A9DA4] mt-1">
                                Enter an address to generate sale-likelihood and pricing. For example: [123 Main St, Toronto].
                            </p>
                        )
                    )}
                </div>
                <div className="flex space-x-6 w-full md:w-auto flex-col md:flex-row">
                    <button
                        className="bg-[#1A2B6C] text-white w-full lg:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2 md:mt-0"
                        onClick={suggestions.length > 0 ? handleValidateAddress : handleAnalyze}
                        disabled={loading || (suggestions.length > 0 && selectedIndex === null)}
                    >
                        <IoSearchOutline />
                        {suggestions.length > 0 ? "Validate Address" : "Analyze"}
                    </button>
                    {(currentStep === 2 || currentStep === 3) && (
                        <button
                            className="bg-transparent text-black border border-[#EDEDED] w-full lg:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2 mt-2 md:mt-0"
                            onClick={handleClearAndStartNew}
                        >
                            Clear & Start New
                        </button>
                    )}
                </div>
                {suggestions.length > 0 ? (
                    <p className="text-xs font-normal mt-3 mb-5 md:hidden flex items-center gap-2 h-[48px] bg-[#E8EEFF] rounded-[5px] px-2 text-[#000000]">
                        <img src="/images/property/mark.png" className='w-[20px] h-[20px]' alt="" />
                        {suggestions.length} matches found. Select the correct address below.</p>
                ) : <></>
                }
            </div>
            {suggestions.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold text-[#1E2029] mb-3">Select the Correct Address <span className='hidden md:inline'>({suggestions.length} options found)</span></h3>
                    <p className='text-[#000000] text-sm font-medium mb-1'>Select the Correct Address</p>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-start justify-between !w-full ${selectedIndex === index ? 'border-l-[2px] border-[#1A2B6C]' : ''}`}
                        >
                            <div onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
                                className="text-base text-[#000000] w-full flex flex-col md:flex-row md:justify-between items-center gap-2 p-1 md:p-2 border border-[#EDED] hover:bg-gray-100 min-h-[65px] justify-center">
                                <div className='w-full flex items-center gap-1 md:gap-2 text-sm md:text-base'>
                                    <HiOutlineLocationMarker className='text-[rgb(26,43,108)] text-lg font-bold' />
                                    <span className='w-full text-xs md:text-base'>{suggestion.complete_address}</span>
                                </div>
                                {(index === 0 || index === 1) && (
                                    <span className="bg-[#28A745] text-white text-base font-semibold w-[122px] h-[36px] flex justify-center items-center rounded">Exact Match</span>
                                )}
                            </div>
                            <div className='w-full lg:w-[245px] hidden md:flex'>
                                {selectedIndex === index && (
                                    <button
                                        className="md:ml-6 bg-[#1A2B6C] text-white w-full h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    // onClick={handleValidateAddress}
                                    >
                                        Confirm Address
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className='w-full lg:w-[245px] md:hidden mt-3'>
                        <button
                            className="md:ml-6 bg-[#1A2B6C] text-white w-full h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                        // onClick={handleValidateAddress}
                        >
                            Confirm Address
                        </button>
                    </div>
                </div>
            )}
            {confirmedAddress && propertyData && currentStep === 2 && (
                <div className="mt-5 md:mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                    </div>
                    <div className="pt-4 pb-2 rounded-lg ">
                        <div className="flex items-start gap-6 flex-col md:flex-row">
                            <div className='flex flex-col gap-3'>
                                <div className='bg-[#F4F6F8] flex items-center w-full md:w-[469px] h-[48px] rounded-[5px] px-3'>
                                    <HiOutlineLocationMarker className="text-[#1A2B6C] text-lg font-bold" />
                                    <input
                                        type="text"
                                        value={confirmedAddress}
                                        readOnly
                                        className="flex-1 bg-transparent border-none text-base text-[#000000] focus:outline-none"
                                    />
                                    <button
                                        className="text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium ml-2"
                                        onClick={() => copyToClipboard(confirmedAddress, 'address')}
                                        title="Copy address"
                                    >
                                        {isCopied.address ? (
                                            <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <IoCopyOutline className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <p className='text-xs text-[#9A9DA4]'>Confirmed address found. Review details then generate sale-likelihood score.</p>
                            </div>

                            <div className='bg-[#F4F6F8] flex items-center w-full md:w-[392px] h-[48px] rounded-[5px] px-3 justify-between'>
                                <input
                                    type="text"
                                    value={propertyData.property_id || ""}
                                    readOnly
                                    className="bg-transparent text-base text-[#000000] px-2 focus:outline-none"
                                />
                                <button
                                    className="text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium ml-2"
                                    onClick={() => copyToClipboard(propertyData.property_id || "", 'id')}
                                    title="Copy property ID"
                                >
                                    {isCopied.id ? (
                                        <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <IoCopyOutline className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <button
                                className="w-full md:w-[245px] h-[48px] bg-[#1A2B6C] text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 "
                                onClick={handleGetPropertyScore}
                            >
                                <IoSearchOutline />
                                Get Property Score
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {scoreData && propertyData && currentStep === 3 && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                    </div>
                    <div className="bg-white py-4 rounded-lg w-full">
                        <div className="flex items-center w-full gap-4 md:gap-2 mb-6 justify-between flex-col md:flex-row flex-wrap">
                            <span className="w-full md:w-[120px] h-[48px] flex justify-center items-center bg-[#28A745] text-white text-base md:text-xl font-bold px-4 py-2 rounded"><span className='text-xl !font-light md:hidden'>PropMatch Score:</span> {Math.round(scoreData.predicted_score)}/10</span>
                            <div className='flex justify-center items-start md:items-center gap-6 md:gap-2 my-3 md:my-0 flex-col xl:flex-row w-full md:w-auto'>
                                <p className="text-sm flex items-center "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Analyzed <span className='text-bold'> 52 market </span> indicators</p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Compared <span className='text-bold'> 1,847 similar homes</span></p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> <span className='text-bold'>92%</span> prediction accuracy</p>
                            </div>
                            <div className="flex space-x-4 flex-col md:flex-row gap-3 w-full md:w-auto">
                                <button
                                    className="bg-[#1A2B6C] text-white w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleGenerateOutreach}
                                >
                                    Generate Outreach
                                </button>
                                <button
                                    className="bg-[#1A2B6C] text-white w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleGenerateReport}
                                >
                                    Generate Report
                                </button>
                            </div>
                        </div>
                        <ScoreAnalysis scoreData={scoreData} />
                        <hr className='border border-[#EDEDED] my-6' />
                        <h2 className="text-lg font-bold text-[#1E2029] mb-6">
                            Market Trends
                        </h2>
                        <div className="bg-white rounded-[5px] border border-[#EDEDED] min-h-[144px] w-full  flex flex-col md:flex-row items-center justify-between">
                            <div className='flex flex-col  h-[100%] p-5 items-center md:items-start w-full sm:w-auto'>
                                <h4 className="text-sm font-semibold ">Property Price Trends</h4>
                                <span className="text-[26px] text-[#1A2B6C] font-semibold">{yoyPercentage} <span className='text-[#9A9DA4] text-[13px] font-normal'>YoY</span> </span>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="p-2 border rounded w-full md:w-40"
                                >
                                    <option value="">All Years</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className=" border-t md:border-l border-[#EDEDED] w-full">
                                <PriceTrendChart
                                    predictions={propertyData.predictions[0].predictions}
                                    selectedYear={selectedYear}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {reportData && currentStep === 4 && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                    </div>
                    <div className="bg-white py-4 rounded-lg w-full">
                        <div className="flex items-center gap-4 md:gap-2 mb-6 justify-between flex-col md:flex-row flex-wrap">
                            <span className="w-full md:w-[120px] h-[48px] flex justify-center items-center bg-[#28A745] text-white text-base md:text-xl font-bold px-4 py-2 rounded"><span className='text-xl !font-light md:hidden'>PropMatch Score:</span> {Math.round(scoreData.predicted_score)}/10</span>
                            <div className='flex justify-center items-start xl:items-center gap-6 md:gap-2 my-3 md:my-0 flex-col xl:flex-row w-full md:w-auto'>
                                <p className="text-sm flex items-center "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Analyzed <span className='text-bold'> 52 market </span> indicators</p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Compared <span className='text-bold'> 1,847 similar homes</span></p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> <span className='text-bold'>92%</span> prediction accuracy</p>
                            </div>
                            <div className="flex space-x-4 flex-col md:flex-row gap-3 w-full md:w-auto">
                                <button
                                    className="bg-[#1A2B6C] text-white w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleGenerateOutreach}
                                >
                                    Generate Outreach
                                </button>
                                <button
                                    className=" text-[#727176] bg-[#EDEDED] w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleClearAndStartNew}
                                >
                                    Back to Analyze
                                </button>
                            </div>
                        </div>
                        <hr className=' border-[#EDEDED] mb-6' />

                        <div className="mb-6 flex items-center gap-5 flex-col md:flex-row">
                            <h2 className="text-base md:text-lg font-bold text-[#1E2029]">
                                AI-Generated Property Report
                            </h2>
                            <p className="w-full md:w-auto text-xs md:text-sm font-medium flex items-center min-h-[32px] gap-3 bg-[#16A34A1A] px-4 rounded-[3px]">
                                <FaCheck className="mr-2 text-[#28A745]" />Report generated successfully
                            </p>
                        </div>
                        <div className="flex space-x-4 mb-6 flex-col md:flex-row gap-4">
                            <a
                                href="/property_report_20250805_002916.html"
                                download={`property_report_${queryId}.html`}
                                target="_blank"
                                className="bg-[#1A2B6C] text-white w-full md:w-[49%] h-[48px] rounded-[5px] text-[15px] font-semibold flex justify-center items-center gap-2"
                            >
                                Download PDF Report
                            </a>
                            <a
                                target="_blank"
                                href="/property_report_20250805_002916.html"
                                download={`property_html_report_${queryId}.html`}
                                rel="noopener noreferrer"
                                className="bg-transparent text-black w-full md:w-[49%] h-[48px] border border-[#EDEDED] rounded-[5px] text-[15px] font-semibold flex justify-center items-center gap-2"
                            >
                                Download HTML
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {outreachData && currentStep === 5 && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[#1E2029]">
                            Property Information
                        </h2>
                    </div>
                    <div className="bg-white py-4 rounded-lg w-full">
                        <div className="flex items-center w-full gap-4 md:gap-2 mb-6 justify-between flex-col md:flex-row flex-wrap">
                            <span className="w-full md:w-[120px] h-[48px] flex justify-center items-center bg-[#28A745] text-white text-base md:text-xl font-bold px-4 py-2 rounded"><span className='text-xl !font-light md:hidden'>PropMatch Score:</span> {Math.round(scoreData.predicted_score)}/10</span>
                            <div className='flex justify-center items-start md:items-center gap-6 md:gap-2 my-3 md:my-0 flex-col xl:flex-row w-full md:w-auto'>
                                <p className="text-sm flex items-center "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Analyzed <span className='text-bold'> 52 market </span> indicators</p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> Compared <span className='text-bold'> 1,847 similar homes</span></p>
                                <p className="text-sm flex items-center  "><img src="/images/property/mark.png" className='mr-2 w-[22px] h-[22px]' alt="" /> <span className='text-bold'>92%</span> prediction accuracy</p>
                            </div>
                            <div className="flex space-x-4 flex-col md:flex-row w-full md:w-auto gap-3">
                                <button
                                    className="bg-[#1A2B6C] text-white w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleGenerateReport}
                                >
                                    Generate Report
                                </button>
                                <button
                                    className="text-[#727176] bg-[#EDEDED] w-full md:w-[160px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleClearAndStartNew}
                                >
                                    Back to Analyze
                                </button>
                            </div>
                        </div>
                        <hr className=' border-[#EDEDED] mb-6' />
                        <div className="mb-6 flex items-start gap-3 flex-col md:flex-row">
                            <h2 className="text-base md:text-lg font-bold text-[#1E2029] text-left">
                                AI-Generated Messages
                            </h2>
                            <p className="w-full md:w-auto text-xs md:text-sm font-medium flex items-center min-h-[32px] gap-3 bg-[#16A34A1A] px-4 rounded-[3px]">
                                <FaCheck className="mr-2 text-[#28A745]" /> AI-messages generated successfully
                            </p>
                        </div>
                        <div className="mb-6">
                            <div className=" relative">
                                <div className='flex justify-between items-center mb-3'>
                                    <h3 className="text-lg font-bold text-[#1E2029]">Text Message</h3>
                                    <button
                                        className="text-[#1A2B6C] border border-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium"
                                        onClick={() => copyToClipboard(outreachData.personalized_text_message || "", 'text')}
                                        title="Copy text"
                                        disabled={!outreachData.personalized_text_message}
                                    >
                                        {isCopied.text ? (
                                            <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <IoCopyOutline className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <p className="bg-[#F8F9FB] border border-[#EDEDED] p-4 rounded-xl text-base text-[#9A9DA4]">{outreachData.personalized_text_message || "Text message not available"}</p>

                            </div>
                        </div>
                        <hr className=' border-[#EDEDED] mb-6' />
                        <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
                            <div className="w-full md:w-[45%]">
                                <div className=" relative">
                                    <div className='flex justify-between items-center mb-3'>
                                        <h3 className="text-lg font-bold text-[#1E2029] ">Sales Pitch</h3>
                                        <button
                                            className="border border-[#1A2B6C] text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium"
                                            onClick={() => copyToClipboard(outreachData.detailed_sales_pitch || "", 'pitch')}
                                            title="Copy pitch"
                                            disabled={!outreachData.detailed_sales_pitch}
                                        >
                                            {isCopied.pitch ? (
                                                <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <IoCopyOutline className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="bg-[#F8F9FB] border border-[#EDEDED] p-4 rounded-xl text-base text-[#9A9DA4]">{outreachData.detailed_sales_pitch || "Sales pitch not available"}</p>

                                </div>
                            </div>
                            <div className="w-full md:w-[45%]">
                                <div className=" relative">
                                    <div className='flex justify-between items-center mb-3'>
                                        <h3 className="text-lg font-bold text-[#1E2029] ">Email Content</h3>
                                        <button
                                            className="border border-[#1A2B6C] text-[#1A2B6C] px-2 py-2 rounded-md text-sm font-medium"
                                            onClick={() => copyToClipboard(outreachData.lead_generation_email || "", 'email')}
                                            title="Copy email"
                                            disabled={!outreachData.lead_generation_email}
                                        >
                                            {isCopied.email ? (
                                                <IoCheckmarkCircleOutline className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <IoCopyOutline className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="bg-[#F8F9FB] border border-[#EDEDED] p-4 rounded-xl text-base text-[#9A9DA4]">{outreachData.lead_generation_email || "Email content not available"}</p>

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