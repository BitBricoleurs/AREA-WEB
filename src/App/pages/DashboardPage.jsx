import { AppNavBar, DashboardCardStats, DashboardPreviewCarrousel, DashboardGraphTriggeredWorkflow } from '/src/App/components'
import React, { useState, useEffect } from "react";
import WorkflowHistoryTable from "../components/WorkflowHistoryTable.jsx";
import totalWorkflowSvg from '/src/assets/icons/totalworkflow.svg';
import averageTimeSvg from '/src/assets/icons/averagetime.svg';
import successRateSvg from '/src/assets/icons/successrate.svg';
import triggeredWorkflowSvg from '/src/assets/icons/triggeredworkflow.svg';
import Spinner from "../components/Spinner.jsx";
import {useContextLogin} from "../context/loginContext.jsx";

export default function DashboardPage() {


    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());
    const [globalStats, setGlobalStats] = useState({});
    const [workflows, setWorkflows] = useState([]);
    const [isLoadingStats, setIsLoadingStats] = useState(true)
    const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true)
    const {ip} = useContextLogin();

    useEffect(() => {
        const fetchWorkflowExecutions = async () => {
            try {
                console.log('Fetching workflow executions');
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}workflow-executions`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Failed to fetch workflow executions');
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                const workflowExecutions = data.workflow;
                setWorkflows(workflowExecutions);
                setIsLoadingWorkflows(false);
            } catch (error) {
                console.error('Error fetching workflow executions:', error);
            }
        };

        const fetchGlobalStats = async () => {
            try {
                console.log('Fetching global workflow statistics');
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}global-workflows-statistics`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    console.error('Failed to fetch global workflow statistics');
                    return;
                }

                const data = await response.json();
                setGlobalStats(data);
                console.log("SATA ", data);
            } catch (error) {
                console.error('Error fetching global workflow statistics:', error);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchWorkflowExecutions();
        fetchGlobalStats();
    }, []);

    return (
        <>
            <div className="bg-background h-full w-full min-h-screen">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"dashboard"} />
                <div className={`flex flex-col transition-all transition-300 h-full ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="p-4 mt-14 h-full">
                        <div className="grid grid-cols-4 gap-6 mb-6 h-full">
                            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-box-color">
                                {isLoadingStats ? (
                                    <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
                                        <Spinner />
                                    </div>

                                )
                                    :
                                    <DashboardCardStats
                                        title={"Total Workflows"}
                                        value={globalStats.total_workflows || 0}
                                        percentageLastWeek={globalStats.trend_total_workflows?.percentage_diff || 0}
                                        icon={<img src={totalWorkflowSvg} alt="total workflow icon" />}
                                    />
                                }
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                {isLoadingStats ? (
                                    <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
                                        <Spinner />
                                    </div>

                                )
                                    :
                                    <DashboardCardStats
                                        title={"Triggered Workflows"}
                                        value={globalStats.total_triggered || 0}
                                        percentageLastWeek={globalStats.trend_total_triggered?.percentage_diff || 0}
                                        icon={<img src={triggeredWorkflowSvg} alt="triggered workflow icon" />}
                                    />
                                }
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                {isLoadingStats ? (
                                    <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
                                        <Spinner />
                                    </div>

                                )
                                    :
                                    <DashboardCardStats
                                        title={"Success Rate"}
                                        value={`${globalStats.success_rate || 0}%`}
                                        percentageLastWeek={globalStats.trend_success_rate?.percentage_diff || 0}
                                        icon={<img src={successRateSvg} alt="success rate icon" />}
                                    />
                                }
                            </div>
                            <div className="flex items-center justify-center  rounded bg-gray-50 dark:bg-box-color">
                                {isLoadingStats ? (
                                    <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
                                        <Spinner />
                                    </div>

                                )
                                    :
                                    <DashboardCardStats
                                        title={"Average Time"}
                                        value={globalStats.average_execution_time + ' m/s' || 'N/A'}
                                        percentageLastWeek={globalStats.trend_average_execution_time?.percentage_diff || 0}
                                        icon={<img src={averageTimeSvg} alt="average time icon" />}
                                    />
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-11 gap-6 mb-6">
                            <div
                                className="flex items-center justify-center col-span-5 h-full rounded-lg bg-gray-50 dark:bg-box-color">
                                <DashboardPreviewCarrousel />
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
                                                stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <DashboardGraphTriggeredWorkflow />
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow items-center justify-center pb-4">
                            <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                                <h2 className="text-2xl font-light text-custom-grey font-outfit mb-4">Workflows
                                    History</h2>
                                {
                                    isLoadingWorkflows ? (
                                        <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color hover:border-light-purple duration-300 transition-colors ">
                                            <Spinner />
                                        </div>
                                    ) : <WorkflowHistoryTable workflows={workflows} maxColumns={3} /> 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
