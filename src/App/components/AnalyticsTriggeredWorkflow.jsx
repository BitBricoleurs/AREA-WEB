import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
                display: false,
            }
        }
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};

const AnalyticsTriggeredWorkflow = ({ workflowId, selectedStartDate, selectedEndDate }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Triggered Workflow',
                data: [],
                backgroundColor: 'rgba(146, 112, 222, 0.4)',
                borderColor: 'rgba(146, 112, 222, 1)',
            },
        ],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkflowDetails = async () => {
            try {
                
                const workflowTriggerCountAnalyticsUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/workflow-trigger-count-analytics/${workflowId}`;
                const params = new URLSearchParams({
                    start: selectedStartDate,
                    end: selectedEndDate
                });
                
                const response = await fetch(`${workflowTriggerCountAnalyticsUrl}?${params.toString()}`, {
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
                    ...chartData,
                    datasets: [{
                        ...chartData.datasets[0],
                        data: data.map(d => d.triggerCount)
                    }],
                    labels: data.map(d => d.date)
                });
            } catch (error) {
                console.error('Error fetching workflow details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (workflowId && selectedStartDate && selectedEndDate) {
            fetchWorkflowDetails();
        }
    }, [workflowId, selectedStartDate, selectedEndDate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full w-full">
        <Spinner />
        </div>
        );
    }

    return (
        <Line options={options} data={chartData} />
    );
};

export default AnalyticsTriggeredWorkflow;
