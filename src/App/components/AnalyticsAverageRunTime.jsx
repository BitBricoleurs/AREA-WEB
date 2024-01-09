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



const labels = [
    '09/12/2023', '10/12/2023', '11/12/2023', '12/12/2023', '13/12/2023',
    '14/12/2023', '15/12/2023', '16/12/2023', '17/12/2023', '18/12/2023',
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Runtime',
            data: labels.map(() => Math.floor(Math.random() * 10)),
            backgroundColor: 'rgba(57, 240, 186, 0.4)',
            borderColor: 'rgba(57, 240, 186, 1)',
            borderWidth: 1,
        }
    ],
};

const AnalyticsAverageRunTime = () => {
    return (
        <Bar options={options} data={data} />
    );
}
export default AnalyticsAverageRunTime;