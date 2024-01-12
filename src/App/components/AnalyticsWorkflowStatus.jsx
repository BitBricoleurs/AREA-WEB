import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsWorkflowStatus = ({ workflowId, selectedStartDate, selectedEndDate }) => {
    const [chartData, setChartData] = useState({
        labels: ['Failed', 'Success', 'Running'],
        datasets: [{
            label: '%',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(244, 67, 54, 0.6)',
                'rgba(76, 175, 80, 0.6)',
                'rgba(255, 193, 7, 0.6)',
            ],
            borderColor: [
                'rgba(244, 67, 54, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(255, 193, 7, 1)',
            ],
            borderWidth: 1,
        }]
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkflowStatus = async () => {
            try {

                const workflowExecutionStatusUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/workflow-execution-status/${workflowId}`;
                const params = new URLSearchParams({
                    start: selectedStartDate,
                    end: selectedEndDate
                });
                
                const response = await fetch(`${workflowExecutionStatusUrl}?${params.toString()}`, {
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
                        data: [data.failed, data.success, data.running]
                    }],
                    labels: ['Failed', 'Success', 'Running']

                });
            } catch (error) {
                console.error('Error fetching workflow status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (workflowId && selectedStartDate && selectedEndDate) {
            fetchWorkflowStatus();
        }
    }, [workflowId, selectedStartDate, selectedEndDate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
            <Spinner />
        </div>
        )
        ;
    }

    const options = {
        cutout: '75%',
        plugins: {
            legend: {
                display: true,
                position: 'left',
            },
        }
    };

    return <Doughnut data={chartData} options={options} />;
}

export default AnalyticsWorkflowStatus;
