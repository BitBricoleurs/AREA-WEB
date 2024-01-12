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



const labels = [
    '09/12/2023', '10/12/2023', '11/12/2023', '12/12/2023', '13/12/2023',
    '14/12/2023', '15/12/2023', '16/12/2023', '17/12/2023', '18/12/2023',
    '19/12/2023', '20/12/2023', '21/12/2023', '22/12/2023', '23/12/2023',
    '24/12/2023', '25/12/2023', '26/12/2023', '27/12/2023', '28/12/2023',
    '29/12/2023', '30/12/2023', '31/12/2023', '01/01/2024', '02/01/2024',
    '03/01/2024', '04/01/2024', '05/01/2024', '06/01/2024', '07/01/2024',
    '08/01/2024', '09/01/2024', '10/01/2024', '11/01/2024', '12/01/2024',
    '13/01/2024', '14/01/2024', '15/01/2024', '16/01/2024', '17/01/2024'
];
export const data = {
    labels,
    datasets: [
        {
            label: 'Triggered Workflow',
            data: labels.map(() => Math.floor(Math.random() * 2)),
            backgroundColor: 'rgba(146, 112, 222, 0.4)',
            borderColor: 'rgba(146, 112, 222, 1)',
        },
    ],
};

const AnalyticsTriggeredWorkflow = () => {
    return (
        <Line options={options} data={data} />
    )
}

export default AnalyticsTriggeredWorkflow