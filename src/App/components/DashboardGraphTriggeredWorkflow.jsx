import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";

const CustomTooltip = ({ active, payload, label }) => {

    console.log("payload: ", payload)
    if (active) {
        return (
            <div className="bg-contrast-box-color border border-light-purple rounded-lg p-4">
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-error-red rounded-full"/>
                <p className="label text-custom-grey text-sm">{`Last Week : ${payload[0].payload.valueLastWeek}`}</p>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-success-green rounded-full"/>
                    <p className="label text-custom-grey text-sm">{`Current Week : ${payload[0].payload.valueCurrentWeek}`}</p>
                </div>
            </div>
        );
    }

    return null;

}

const DashboardGraphTriggeredWorkflow = ({ }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setData(
            [{date: "Sun", valueCurrentWeek: 10, valueLastWeek: 30},
                {date: "Mon", valueCurrentWeek: 20, valueLastWeek: 40},
                {date: "Tue", valueCurrentWeek: 14, valueLastWeek: 50},
                {date: "Wed", valueCurrentWeek: 23, valueLastWeek: 42},
                {date: "Thu", valueCurrentWeek: 32, valueLastWeek: 12},
                {date: "Fri", valueCurrentWeek: 8, valueLastWeek: 6},
                {date: "Sat", valueCurrentWeek: 26, valueLastWeek: 20}
                ]
        )
    } , [])

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