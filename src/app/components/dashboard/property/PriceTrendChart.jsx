"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PriceTrendChart = ({ predictions, selectedYear }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        // Filter predictions for the selected year
        const filteredPredictions = selectedYear
            ? predictions.filter(pred => new Date(pred.date).getFullYear() === parseInt(selectedYear))
            : predictions;

        if (chartInstance.current) {
            chartInstance.current.destroy(); // Destroy previous chart instance
        }

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: filteredPredictions.map(pred => pred.date),
                datasets: [{
                    label: 'Estimated Sale Price',
                    data: filteredPredictions.map(pred => pred.estimate_sale_price),
                    borderColor: '#1A2B6C',
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(0, 'rgba(26, 43, 108, 0.2)');
                        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '',
                            font: { size: 12 }
                        },
                        ticks: {
                            display: false // Hide Y-axis values
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '',
                            font: { size: 12 }
                        },
                        ticks: {
                            display: false // Hide X-axis values
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        backgroundColor: '#1A2B6C', // Dark blue background for tooltip
                        titleColor: '#FFFFFF', // White text for title (not used since title is disabled)
                        bodyColor: '#FFFFFF', // White text for body (price)
                        bodyFont: { size: 14 }, // Slightly larger font for readability
                        padding: 10, // Add padding for better appearance
                        cornerRadius: 4, // Rounded corners for tooltip
                        callbacks: {
                            title: () => '', // Disable the title (date) in tooltip
                            label: context => `$${context.raw.toLocaleString()}` // Show only the price
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        backgroundColor: '#1A2B6C'
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [predictions, selectedYear]);

    return (
        <div className="w-full h-40 mt-2">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PriceTrendChart;