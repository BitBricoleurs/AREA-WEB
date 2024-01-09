import React, { PureComponent } from 'react';
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer, Rectangle, Area, ReferenceDot,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    // Vérifier si la date actuelle est dans le tableau editDates
    const isEdited = editDates.includes(label);

    if (active) {
        return (
            <div className="bg-contrast-box-color border border-light-purple rounded-lg p-4">
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-hover-static rounded-full"/>
                    <p className="label text-custom-grey text-sm">{`Daily Average Run Time : ${payload[0].payload.Average_run_time}`}</p>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <div className="h-2 w-2 bg-light-purple rounded-full"/>
                    <p className="label text-custom-grey text-sm">{`Daily Runs : ${payload[0].payload.triggered}`}</p>
                </div>
                {isEdited && (
                    <div className="flex flex-row items-center space-x-1">
                        <svg className={"h-3 w-3"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                                    stroke="#000000" strokeWidth="1" strokeLinecap="round"
                                    strokeLinejoin="round"></path>
                                <path d="M21 21H12" stroke="#000000" strokeWidth="1" strokeLinecap="round"
                                      strokeLinejoin="round"></path>
                            </g>
                        </svg>
                        <p className="text-custom-grey text-sm">Edited</p>
                    </div>
                )}
            </div>
        );
    }
    return null;
}


const data = [
    {
        date: '2021-09-01',
        triggered: 12,
        Average_run_time: 2.4,
    },
    {
        date: '2021-09-02',
        triggered: 10,
        Average_run_time: 1.3,
    }
    ,
    {
        date: '2021-09-03',
        triggered: 2,
        Average_run_time: 9.8,
    }
    ,
    {
        date: '2021-09-04',
        triggered: 7,
        Average_run_time: 3.9,
    }
    ,
    {
        date: '2021-09-05',
        triggered: 14,
        Average_run_time: 4.8,
    }
    ,
    {
        date: '2021-09-06',
        triggered: 0,
        Average_run_time: 3.8,
    }
    ,
    {
        date: '2021-09-07',
        triggered: 6,
        Average_run_time: 4.3,
    }
];

const editDates = ["2021-09-01", "2021-09-02", "2021-09-03"];


const AnalyticsLifeTime = () => {



    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 50,
                    left: 20,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id="average" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#39F0BA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#39F0BA" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={"#3F3F3F"} fillOpacity={0.5}/>
                <XAxis dataKey="date" />
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>
                <Area type="monotone" dataKey="Average_run_time" stroke="#39F0BA" fillOpacity={1}
                          fill="url(#average)"
                    />
                <Line dataKey="triggered" stroke={"#9A77EC"}/>
                {
                    editDates.map((editDate, index) => {
                        const dataItem = data.find(item => item.date === editDate);
                        return dataItem ? (
                            <ReferenceDot
                                key={`reference-dot-${index}`}
                                x={dataItem.date}
                                y={dataItem.triggered }
                                r={7}
                                fill="#9A77EC"
                                stroke="none"
                            />
                        ) : null;
                    })
                }
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default AnalyticsLifeTime;