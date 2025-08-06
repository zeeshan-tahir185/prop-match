"use client";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { IoCheckmarkCircleOutline, IoCloudUploadOutline, IoCloseOutline } from "react-icons/io5";
import { MdOutlineCheck } from 'react-icons/md';
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const LeadListAnalysis = ({ onStepChange }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [leadData, setLeadData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            const validFormats = ['.xlsx', '.xls', '.csv', '.pdf', '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
            const fileExtension = `.${uploadedFile.name.split('.').pop().toLowerCase()}`;
            if (validFormats.includes(fileExtension)) {
                setFile(uploadedFile);
                setError(null);
            } else {
                setError('Unsupported file format. Please upload .xlsx, .xls, .csv, .pdf, .png, .jpg, .jpeg, .gif, .bmp, or .webp.');
                setFile(null);
            }
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes >= 1024 * 1024) {
            return `Size: ${(bytes / (1024 * 1024)).toFixed(1)}MB`;
        } else if (bytes >= 1024) {
            return `Size: ${(bytes / 1024).toFixed(1)}KB`;
        } else {
            return `Size: ${bytes}B`;
        }
    };
    const handleRankLeads = async () => {
        if (!file) {
            setError('Please upload a file first.');
            return;
        }
        setLoading(true);
        setError(null);
        setUploadSuccess(false);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'https://propmatch-backend-1077352833070.us-central1.run.app/upload-lead-list',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (response.data.status === 'success') {
                setLeadData(response.data);
                setUploadSuccess(true);
                setCurrentStep(1);
                onStepChange(1);
            } else {
                setError('Failed to process leads.');
            }
        } catch (err) {
            setError('An error occurred while processing the lead list.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (leadData?.ranked_file) {
            const downloadUrl = `https://propmatch-backend-1077352833070.us-central1.run.app/download-file/${leadData.ranked_file}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = leadData.ranked_file.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleProcessAnother = () => {
        setLeadData(null);
        setUploadSuccess(false);
        setError(null);
        setCurrentStep(0);
        onStepChange(0);
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the input value
        }
    };

    return (
        <div className="">
            <p className='text-[#9A9DA4] mt-2 text-center md:text-left'>Upload your lead list to generate AI-powered rankings and insights.</p>
            <div className="flex items-center justify-between mb-4 mt-6">
                <h2 className="text-sm font-bold text-[#1E2029] ">Choose Your Lead List File</h2>
            </div>
            <div className="bg-white ">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-full">
                        <label className="flex flex-col items-center justify-center w-full min-h-[120px] border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg cursor-pointer hover:bg-gray-100">
                            <div className="flex flex-col md:flex-row items-center justify-between w-full p-[30px] gap-[30px]">
                                <div className='flex items-center gap-5'>
                                    <img src="/images/property/upload.png" alt="" />
                                    <div className='flex flex-col items-start'>
                                        <h3 className=''>Drag & drop file here</h3>
                                        <p className='text-[#9A9DA4]'>Max 100 MB · CSV, XLSX</p>
                                    </div>
                                </div>
                                <button
                                    className="text-base font-medium w-[245px] h-[48px] border border-[#EDEDED] bg-white rounded-[5px]"
                                    onClick={handleBrowseClick}
                                >
                                    Browse files
                                </button>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".xlsx,.xls,.csv,.pdf,.png,.jpg,.jpeg,.gif,.bmp,.webp"
                            />
                        </label>
                        {file && (
                            <div className="mt-4 flex flex-col gap-2 items-start justify-between ">
                                <div className="flex items-center bg-[#16A34A1A] min-h-[32px] px-3 rounded-[3px] gap-2 w-full sm:w-auto">
                                    <MdOutlineCheck className='text-[#16A34A]' />
                                    <p className="text-sm text-[#1A2B6C] font-medium">File uploaded successfully</p>
                                </div>
                                <div className="flex items-center min-h-[57px] border border-[#EDEDED] bg-[#F0F2F5] rounded-[8px] gap-3 px-3 w-full sm:w-auto ">
                                    <img src="/images/property/document.png" alt="" />
                                    <div className='flex flex-col gap-2 items-start'>
                                        <p className="text-sm text-[#000000] mr-4 font-semibold">{file.name}</p>
                                        <p className='text-[#9A9DA4] text-base'>{formatFileSize(file.size)}</p>
                                    </div>
                                    <button
                                        className="text-[#000000] hover:text-red-500"
                                        onClick={handleRemoveFile}
                                    >
                                        <RiDeleteBinLine className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                    </div>
                    <button
                        className="mt-3 bg-[#1A2B6C] text-white w-full h-[48px] rounded-[5px] text-[15px] font-semibold flex justify-center items-center gap-2"
                        onClick={handleRankLeads}
                        disabled={loading || !file}
                    >
                        {loading && (
                            <div className="w-5 h-5 border-2 border-t-[#FFFFFF] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                        )}
                        Rank My Leads
                    </button>
                </div>
                <hr className=' border-[#EDEDED] mt-6' />
                {uploadSuccess && leadData && (
                    <div className="mt-6">
                        <div className="mb-6 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
                            <h3 className='text-[#1E2029] text-lg font-bold'>Lead Ranking Result</h3>
                            <div className="flex items-center bg-[#16A34A1A] min-h-[32px] px-3 rounded-[3px] gap-2 w-full sm:w-auto">
                                <MdOutlineCheck className='text-[#16A34A]' />
                                <p className="text-sm text-[#1A2B6C] font-medium">Lead ranking completed</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-start gap-4 mb-6 flex-col md:flex-row">
                            <div className='flex flex-col gap-4 w-full'>
                                <div className="bg-[#F8F9FB] p-4 rounded-[12px] w-full border border-[#EDEDED] flex flex-col gap-5 sm:gap-3">
                                    <div className='flex items-center gap-2 sm:gap-5 flex-col sm:flex-row'>
                                        <p className='font-semibold'>Filename:</p>
                                        <p>{leadData.ranked_file.split('/').pop()}</p>
                                    </div>
                                    <div className='flex items-center gap-2 sm:gap-5 flex-col sm:flex-row'>
                                        <p className='font-semibold'>Leads processed:</p>
                                        <p>{leadData.lead_count}</p>
                                    </div>
                                    <div className='flex items-center gap-2 sm:gap-5 flex-col sm:flex-row'>
                                        <p className='font-semibold'>File type:</p>
                                        <p>{leadData.ranked_file.split('.').pop().toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className='flex  items-start sm:items-center gap-2 min-h-[48px] w-full bg-[#E8EEFF] rounded-[5px] p-3 '>
                                     <AiOutlineExclamationCircle />
                                        <p className='text-sm font-normal w-full'><span className='font-semibold'>Ranked list includes:</span> Contact info, Likelihood Scores (0-10), Phone Validation, Pricing Suggestions.</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 flex-col gap-3 w-full md:w-auto">
                                <button
                                    className="bg-[#1A2B6C] text-white w-full md:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleDownload}
                                    disabled={!leadData.ranked_file}
                                >
                                    Download Ranked CSV
                                </button>
                                <button
                                    className="bg-transparent text-black border border-[#EDEDED] w-full md:w-[245px] h-[48px] rounded-md text-sm font-medium flex justify-center items-center gap-2"
                                    onClick={handleProcessAnother}
                                >
                                    Process Another List
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadListAnalysis;