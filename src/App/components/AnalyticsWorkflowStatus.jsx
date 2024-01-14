import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Spinner from './Spinner';
import {useContextLogin} from "../context/loginContext.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsWorkflowStatus = ({ workflowId, selectedStartDate, selectedEndDate }) => {

    const {ip} = useContextLogin();

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

                const encodedStartDate = btoa(selectedStartDate);
                const encodedEndDate = btoa(selectedEndDate);

                const workflowExecutionStatusUrl = `${ip}/workflow-execution-status/${workflowId}/${encodedStartDate}/${encodedEndDate}`;
                
                const response = await fetch(`${workflowExecutionStatusUrl}`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
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
                        data: [data[0].percentage, data[1].percentage, data[2].percentage]
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
