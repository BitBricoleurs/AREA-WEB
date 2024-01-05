import {useEffect, useState} from "react";

const DashboardCardStats = ({ title, value, icon, percentageLastWeek }) => {

    const [percentageState, setPercentageState] = useState("none")

    useEffect(() => {
        if (percentageLastWeek < 0) {
            setPercentageState("negative")
        } else {
            setPercentageState("positive")
        }
    }
    , [percentageLastWeek])

    return (
        <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
            <div className="flex flex-row items-start">
                <div className="h-20 bg-vertical-card-purple-gradient w-1.5 rounded-lg"/>
                <div className="Content flex flex-col w-11/12 h-full">
                    <div className="Header flex flex-col pl-5 ">
                        <p className="text-white font-outfit text-md pb-2">{title}</p>
                        <p className="text-white font-outfit text-xl font-bold">{value}</p>
                    </div>
                    <div className="flex flex-row items-center relative pt-8 w-full space-x-2">
                        <svg className={`${percentageState === "positive" ? 'stroke-success-green' : 'stroke-error-red rotate-180'} `} width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 15.4287V0.571533"  strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M14.25 4.57153L9.5 0.571533L4.75 4.57153" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <span className={`${percentageState === "positive" ? 'text-success-green' : 'text-error-red'} font-outfit text-sm`}>{percentageLastWeek}%</span>
                        <span className="text-custom-grey  font-outfit text-sm text-center">Since Last week</span>
                    </div>
                </div>
                <div className="flex flex-row place-items-end w-1/12">
                    <div className="ms-auto w-8 h-8 rounded-full bg-transparent flex justify-center items-center">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCardStats;