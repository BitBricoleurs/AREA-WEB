import { AppNavBar}  from '../../Static/components';
import React ,{useState} from "react";
import { AnalyticsWorkflowFilterSection, AnalyticsWorkflowStatus  } from "/src/App/components";

const AnalyticsContent = () => {

    const mockWorkflows = [
        {value: "1", label: "Workflow 1"},
        {value: "2", label: "Workflow 2"},
        {value: "3", label: "Workflow 3"},
        {value: "4", label: "Workflow 4"},
        ]


    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [workflows, setWorkflows] = useState(mockWorkflows);
    const minDate = "19/12/2023";
    const maxDate = "07/01/2024";
    const [selectedStartDate, setSelectedStartDate] = useState("19/12/2023");
    const [selectedEndDate, setSelectedEndDate] = useState("07/01/2024");

    return (
        <div className="flex flex-col w-full">
            <span className="text-2xl font-bold font-outfit mt-2 text-custom-grey">{"ANALYTICS"}</span>
            <div className="flex flex-col flex-grow w-full pt-16">
                <div className="flex flex-row w-full h-full space-x-6">
                <div className="flex bg-box-color border-contrast-box-color border max-w-max max-h-max rounded-md">
                    <AnalyticsWorkflowFilterSection workflows={workflows} selectedWorkflow={selectedWorkflow} onChange={setSelectedWorkflow} minDate={minDate} maxDate={maxDate} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} handleStartDateChange={setSelectedStartDate} handleEndDateChange={setSelectedEndDate}/>
                </div>
                </div>
                <div className="grid grid-cols-9 gap-6 mt-6">
                    <div
                        className="flex flex-col col-span-3 bg-box-color border-contrast-box-color border h-64 rounded-md">
                    </div>
                    <div
                        className="flex flex-col col-span-3 bg-box-color border-contrast-box-color border h-64 rounded-md">
                    </div>
                    <div
                        className="flex flex-row col-span-3 bg-box-color border-contrast-box-color border max-h-max rounded-md">
                        <div className="flex flex-row h-full m-4">
                            <div className={"h-1/2 bg-vertical-card-purple-gradient w-1.5 rounded-lg"}/>
                        </div>
                        <p className="text-white font-outfit text-2xl font-light text-md pt-2 ">{"Workflow Status"}</p>
                            <div className={"flex flex-col w-full h-full -ml-32"}>
                                <AnalyticsWorkflowStatus/>
                            </div>
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
