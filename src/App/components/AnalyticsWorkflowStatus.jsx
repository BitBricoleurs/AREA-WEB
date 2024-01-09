import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Failed', 'Success', 'Running'],
    datasets: [
        {
            label: '%',
            data: [7, 2, 1],
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
        },
    ],
};

const options = {
    cutout: '75%',
    plugins: {
        legend: {
            display: true,
            position: 'left',
        },
    }
};


const AnalyticsWorkflowStatus = () => {

    return (
        <Doughnut data={data} options={options} />
    );
}

export default AnalyticsWorkflowStatus;