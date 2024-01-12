import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            }
        },
        y: {
            grid: {
                display: true,
                drawBorder: false,
                drawOnChartArea: true,
                drawTicks: false,
                color: function(context) {
                    if (context.tick && context.tick.major) {
                        return '#000000';
                    } else {
                        return '#3F3F3F';
                    }
                },
                lineWidth: function(context) {
                    return context.tick && context.tick.major ? 2 : 1;
                },
            },
            ticks: {
                major: {
                    enabled: true
                }
            }
        }
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};



const AnalyticsAverageRunTime = ({ workflowId, selectedStartDate, selectedEndDate }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Runtime',
                data: [],
                backgroundColor: 'rgba(57, 240, 186, 0.4)',
                borderColor: 'rgba(57, 240, 186, 1)',
                borderWidth: 1,
            }
        ],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchExecutionTimeData = async () => {
            try {
                const workflowExecutionTimeAnalyticsUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/workflow-execution-time-analytics/${workflowId}`;
                const params = new URLSearchParams({
                    start: selectedStartDate,
                    end: selectedEndDate
                });
                
                const response = await fetch(`${workflowExecutionTimeAnalyticsUrl}?${params.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                        'Content-Type': 'application/json'
                    }
                });                

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                const data = await response.json();
                setChartData({
                    labels: data.map(d => d.date),
                    datasets: [{
                        ...chartData.datasets[0],
                        data: data.map(d => d.average_execution_time)
                    }]
                });
            } catch (error) {
                console.error('Error fetching execution time data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        console.log("workflowId", workflowId);
        console.log("startDate", selectedStartDate);
        console.log("endDate", selectedEndDate);
        if (workflowId && selectedStartDate && selectedEndDate) {
            fetchExecutionTimeData();
        }
    }, [workflowId, selectedStartDate, selectedEndDate]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-full w-full">
            <Spinner />
        </div>;
    }

    return <Bar options={options} data={chartData} />;
};

export default AnalyticsAverageRunTime;
