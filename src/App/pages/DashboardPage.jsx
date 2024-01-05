import { AppNavBar, DashboardCardStats, DashboardPreviewCarrousel, DashboardGraphTriggeredWorkflow}  from '/src/App/components'
import React ,{useState} from "react";
import WorkflowHistoryTable from "../components/WorkflowHistoryTable.jsx";
import totalWorkflowSvg from '/src/assets/icons/totalworkflow.svg';
import averageTimeSvg from '/src/assets/icons/averagetime.svg';
import successRateSvg from '/src/assets/icons/successrate.svg';
import triggeredWorkflowSvg from '/src/assets/icons/triggeredworkflow.svg';


const mockHistory = [
    {
        "id": 101,
        "name": "Daily Data Backup",
        "startTime": "2022-08-01T09:30:00Z",
        "endTime": "2022-08-01T09:45:30Z",
        "duration": "15min30s",
        "status": "Success"
    },
    {
        "id": 102,
        "name": "Weekly Data Backup",
        "startTime": "2022-08-01T09:30:00Z",
        "endTime": "2022-08-01T09:45:30Z",
        "duration": "30min30s",
        "status": "Failed"
    },
    {
        "id": 103,
        "name": "Monthly Data Backup",
        "startTime": "2022-08-01T09:30:00Z",
        "endTime": "2022-08-01T09:45:30Z",
        "duration": "45min30s",
        "status": "Running"
    }
];

export default function DashboardPage() {


    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    const [workflows, setWorkflows] = useState(mockHistory);

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"dashboard"}/>
                <div className={`flex flex-col transition-all transition-300 h-full ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="p-4 mt-14 h-full">
                        <div className="grid grid-cols-4 gap-6 mb-6 h-full">
                            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-box-color">
                                <DashboardCardStats title={"Total Workflows"} value={6} percentageLastWeek={1.5} icon={
                                    <img className="stroke-light-purple" src={totalWorkflowSvg} alt="total workflow icon"/>}/>
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                <DashboardCardStats title={"Triggered Workflows"} value={"32"} percentageLastWeek={-1.5} icon={
                                    <img className="stroke-light-purple" src={triggeredWorkflowSvg} alt="average time icon"/>}/>
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                <DashboardCardStats title={"Success Rate"} value={"78%"} percentageLastWeek={2} icon={
                                    <img className="stroke-light-purple" src={successRateSvg} alt="success rate icon"/>}/>
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                <DashboardCardStats title={"Average Time"} value={"2min3s"} percentageLastWeek={0} icon={
                                    <img className="stroke-light-purple" src={averageTimeSvg} alt="average time icon"/>}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-11 gap-6 mb-6">
                            <div
                                className="flex items-center justify-center col-span-5 h-full rounded-lg bg-gray-50 dark:bg-box-color">
                                <DashboardPreviewCarrousel/>
                        </div>
                            <div className="flex col-span-6 h-full rounded-lg bg-gray-50 dark:bg-box-color border border-contrast-box-color">
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex flex-row w-full p-4 h-16">
                                        <div className="textContainer flex flex-col">
                                        <p className="text-white font-outfit text-2xl font-light text-md ">Triggered
                                            Workflows</p>
                                        <p className="text-white font-outfit text-sm font-thin">per Day</p>
                                        </div>
                                        <svg className="ms-auto" width="24" height="24" viewBox="0 0 24 23" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M21 7L15.5657 12.4343C15.3677 12.6323 15.2687 12.7313 15.1545 12.7684C15.0541 12.8011 14.9459 12.8011 14.8455 12.7684C14.7313 12.7313 14.6323 12.6323 14.4343 12.4343L12.5657 10.5657C12.3677 10.3677 12.2687 10.2687 12.1545 10.2316C12.0541 10.1989 11.9459 10.1989 11.8455 10.2316C11.7313 10.2687 11.6323 10.3677 11.4343 10.5657L7 15M21 7H17M21 7V11"
                                                stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <DashboardGraphTriggeredWorkflow/>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow items-center justify-center pb-4">
                            <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                                <h2 className="text-2xl font-light text-custom-grey font-outfit mb-4">Workflows
                                    History</h2>
                                <WorkflowHistoryTable workflows={workflows} maxColumns={3}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
