import { AppNavBar}  from '../../Static/components';
import React ,{useState, useEffect} from "react";
import WorkflowHistoryTable from "../components/WorkflowHistoryTable.jsx";

export default function DashboardPage() {


    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        const fetchWorkflowExecutions = async () => {
            try {
                console.log('Fetching workflow executions');
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}workflow-executions`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);

                if (!response.ok) {
                    console.error('Failed to fetch workflow executions');
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                const workflowExecutions = data.workflow;
                setWorkflows(workflowExecutions);
            } catch (error) {
                console.error('Error fetching workflow executions:', error);
            }
        };

        fetchWorkflowExecutions();
    }, []);

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
                            <WorkflowHistoryTable workflows={workflows} maxColumns={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
