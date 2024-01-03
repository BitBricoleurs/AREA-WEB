import { AppNavBar}  from '../../Static/components';
import React ,{useState} from "react";
import WorkflowHistoryTable from "../components/WorkflowHistoryTable.jsx";


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
                <div className={`flex flex-col transition-all transition-300 ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="p-4 mt-14">
                        <div className="grid grid-cols-4 gap-6 mb-6">
                            <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-box-color">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-box-color">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-box-color">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </p>
                            </div>
                            <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-box-color">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-11 gap-6 mb-6">
                        <div className="flex items-center justify-center col-span-5 h-72 rounded bg-gray-50 dark:bg-box-color">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </p>
                        </div>
                            <div className="flex items-center justify-center col-span-6 h-72 rounded bg-gray-50 dark:bg-box-color">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </p>
                            </div>
                        </div>
                        <div className="flex-grow items-center justify-center pb-4">
                            <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                                <h2 className="text-2xl font-light text-custom-grey font-outfit mb-4">Workflows History</h2>
                            <WorkflowHistoryTable workflows={workflows} maxColumns={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
