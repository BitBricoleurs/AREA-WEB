import { AppNavBar}  from '../../Static/components';
import React ,{useState} from "react";

const AnalyticsContent = () => {
    return (
        <div className="flex flex-col w-full">
            <span className="text-2xl font-bold font-outfit mt-2 text-custom-grey">{"ANALYTICS"}</span>
            <div className="flex flex-col flex-grow w-full pt-16">
                <div className="flex bg-box-color border-contrast-box-color border w-1/3 h-20 rounded-md">
                </div>
                <div className="grid grid-cols-10 gap-6 mt-6">
                    <div className="flex flex-col col-span-3 bg-box-color border-contrast-box-color border h-64 rounded-md">
                    </div>
                    <div className="flex flex-col col-span-3 bg-box-color border-contrast-box-color border h-64 rounded-md">
                    </div>
                    <div className="flex flex-col col-span-4 bg-box-color border-contrast-box-color border h-64 rounded-md">
                    </div>
                </div>
                <div className="flex bg-box-color border-contrast-box-color border w-full h-80 rounded-md mt-6">
                </div>
            </div>
        </div>
    )
}

export default function AnalyticsPage() {
    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"analytics"}/>
                <div className={`flex flex-col transition-all transition-300 ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="p-4 mt-14">
                        <AnalyticsContent/>
                    </div>
                </div>
            </div>
        </>
    );
}
