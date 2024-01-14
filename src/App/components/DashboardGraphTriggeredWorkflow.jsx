import React, { useEffect, useState } from "react";
import { AreaChart, Area, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Spinner from "./Spinner";
import {useContextLogin} from "../context/loginContext.jsx";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-contrast-box-color border border-light-purple rounded-lg p-4">
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-error-red rounded-full"/>
                    <p className="label text-custom-grey text-sm">{`Last Week : ${payload[0].value}`}</p>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-success-green rounded-full"/>
                    <p className="label text-custom-grey text-sm">{`Current Week : ${payload[1].value}`}</p>
                </div>
            </div>
        );
    }
    return null;
}

const DashboardGraphTriggeredWorkflow = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { ip } = useContextLogin();

    useEffect(() => {
        const fetchTriggerCount = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}/weekly-trigger-count`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true, 
                        'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch trigger count data');
                }

                const result = await response.json();
                const formattedData = result.current_week.map((item, index) => ({
                    date: item.day.slice(0, 3), // "Sun", "Mon", etc.
                    valueLastWeek: result.last_week[index]?.trigger_count || 0,
                    valueCurrentWeek: item.trigger_count
                }));

                setData(formattedData);
            } catch (error) {
                console.error('Error fetching trigger count data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTriggerCount();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center justify-self-center">
                <Spinner />
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={400} data={data}
                       margin={{top: 10, right: 20, left: 20, bottom: 0}}>
                <defs>
                    <linearGradient id="colorCurrentWeek" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39F0BA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#39F0BA" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F44336" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={"#3F3F3F"} fillOpacity={0.5}/>
                <Area type="monotone" dataKey="valueLastWeek" stroke="#F44336" fillOpacity={1}
                      fill="url(#colorLastWeek)"/>
                <Area type="monotone" dataKey="valueCurrentWeek" stroke="#39F0BA" fillOpacity={1}
                      fill="url(#colorCurrentWeek)"/>
                <Tooltip content={<CustomTooltip/>}/>
                <XAxis dataKey="date"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default DashboardGraphTriggeredWorkflow;
