import { AppNavBar}  from '../../Static/components';
import React ,{useState} from "react";
import { AnalyticsWorkflowFilterSection, AnalyticsWorkflowStatus, AnalyticsAverageRunTime, AnalyticsTriggeredWorkflow, AnalyticsLifeTime  } from "/src/App/components";
import { useEffect } from "react";

const AnalyticsContent = () => {

    const [selectedWorkflow, setSelectedWorkflow] = useState([]);
    const [workflows, setWorkflows] = useState([]);
    const minDate = "19/12/2023";
    const maxDate = "07/01/2024";
    const [selectedStartDate, setSelectedStartDate] = useState("19/12/2023");
    const [selectedEndDate, setSelectedEndDate] = useState("07/01/2024");

    useEffect(() => {
        const fetchWorkflows = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/get-user-workflows-ids`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }

                const data = await response.json();
                const workflowOptions = data.workflow.map(wf => ({
                    value: wf.id,
                    label: wf.name
                }));
                console.log("workflowOptions",workflowOptions);
                setWorkflows(workflowOptions);
                setSelectedWorkflow(workflowOptions[0].value);
            } catch (error) {
                console.error('Error fetching workflows:', error);
            }
        };

        fetchWorkflows();
    }, []);

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
                        className="flex flex-row col-span-3 bg-box-color border-contrast-box-color border h-[350px] rounded-md ">
                        <div className={"h-2/5 bg-vertical-card-purple-gradient w-1.5 rounded-lg my-4 ml-4"}/>
                        <div className="flex flex-col w-full h-full m-4">
                            <div className="flex flex-row w-full h-10">
                                <div className="flex flex-col">
                                    <p className="text-white font-outfit text-2xl font-light text-md pl-4 ">{"Triggered Workflow"}</p>
                                    <p className="text-white font-outfit text-sm font-thin pl-4 ">{"per Workflow"}</p>
                                </div>
                                <svg className={"ms-auto"} width="24" height="23" viewBox="0 0 24 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_202_330)">
                                        <path
                                            d="M12.8569 0.821289C13.6526 0.821289 14.4156 1.12419 14.9783 1.66336C15.5409 2.20252 15.8569 2.93379 15.8569 3.69629C15.8569 4.45879 15.5409 5.19005 14.9783 5.72922C14.4156 6.26839 13.6526 6.57129 12.8569 6.57129H0.856934"
                                            stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path
                                            d="M20.1425 17.25C20.9382 17.25 21.7012 16.9471 22.2638 16.4079C22.8264 15.8688 23.1425 15.1375 23.1425 14.375C23.1425 13.6125 22.8264 12.8812 22.2638 12.3421C21.7012 11.8029 20.9382 11.5 20.1425 11.5H3.42822"
                                            stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path
                                            d="M12.4284 22.1782C13.2241 22.1782 13.9871 21.8753 14.5498 21.3362C15.1124 20.797 15.4284 20.0657 15.4284 19.3032C15.4284 18.5407 15.1124 17.8095 14.5498 17.2703C13.9871 16.7311 13.2241 16.4282 12.4284 16.4282H2.57129"
                                            stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_202_330">
                                            <rect width="24" height="23" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>


                            </div>
                            <div className="flex flex-col w-full h-64 mt-8 -ml-2 items-center">
                                <AnalyticsTriggeredWorkflow workflowId={selectedWorkflow} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate}/>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-row col-span-3 bg-box-color border-contrast-box-color border h-[350px] rounded-md ">
                        <div className={"h-2/5 bg-vertical-card-purple-gradient w-1.5 rounded-lg my-4 ml-4"}/>
                        <div className="flex flex-col w-full h-full m-4">
                            <div className="flex flex-row w-full h-10">
                                <div className="flex flex-col">
                                    <p className="text-white font-outfit text-2xl font-light text-md pl-4 ">{"Average Runtime"}</p>
                                    <p className="text-white font-outfit text-sm font-thin pl-4 ">{"per Workflow"}</p>
                                </div>
                                <svg className={"ms-auto"} width="24" height="23" viewBox="0 0 24 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_202_316)">
                                        <path
                                            d="M0.856934 11.4999C0.856934 13.6119 1.51045 15.6765 2.73484 17.4326C3.95924 19.1886 5.69951 20.5573 7.7356 21.3656C9.77169 22.1738 12.0122 22.3853 14.1737 21.9733C16.3352 21.5612 18.3206 20.5442 19.879 19.0508C21.4373 17.5573 22.4986 15.6546 22.9285 13.5832C23.3585 11.5117 23.1378 9.36461 22.2944 7.41336C21.4511 5.4621 20.0229 3.79434 18.1904 2.62096C16.358 1.44758 14.2036 0.821296 11.9998 0.821296C8.80775 0.817911 5.73741 1.99487 3.42836 4.10701"
                                            stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.28537 0.821289L3.42822 4.107L6.85679 4.92843" stroke="#9A77EC"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11.9996 5.75V12.3214L7.54248 14.4571" stroke="#9A77EC"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_202_316">
                                            <rect width="24" height="23" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <div className="flex flex-col w-full h-64 mt-8 -ml-2 items-center">
                                <AnalyticsAverageRunTime workflowId={selectedWorkflow} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate}/>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-row col-span-3 bg-box-color border-contrast-box-color border h-[350px] rounded-md ">
                        <div className={"h-2/5 bg-vertical-card-purple-gradient w-1.5 rounded-lg my-4 ml-4"}/>
                        <div className="flex flex-col w-full h-full m-4">
                            <div className="flex flex-row w-full h-10">
                                <div className="flex flex-col">
                                    <p className="text-white font-outfit text-2xl font-light text-md pl-4 ">{"Workflow Status"}</p>
                                    <p className="text-white font-outfit text-sm font-thin pl-4 ">{"per Workflow"}</p>
                                </div>
                                <svg className={"ms-auto"} width="24" height="23" viewBox="0 0 24 23" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.4284 5.75H2.57122C1.62445 5.75 0.856934 6.48553 0.856934 7.39286V15.6071C0.856934 16.5145 1.62445 17.25 2.57122 17.25H21.4284C22.3751 17.25 23.1426 16.5145 23.1426 15.6071V7.39286C23.1426 6.48553 22.3751 5.75 21.4284 5.75Z"
                                        stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M5.99972 12.3216C6.47311 12.3216 6.85686 11.9538 6.85686 11.5001C6.85686 11.0465 6.47311 10.6787 5.99972 10.6787C5.52633 10.6787 5.14258 11.0465 5.14258 11.5001C5.14258 11.9538 5.52633 12.3216 5.99972 12.3216Z"
                                        stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path
                                        d="M11.1428 12.3216C11.6162 12.3216 11.9999 11.9538 11.9999 11.5001C11.9999 11.0465 11.6162 10.6787 11.1428 10.6787C10.6694 10.6787 10.2856 11.0465 10.2856 11.5001C10.2856 11.9538 10.6694 12.3216 11.1428 12.3216Z"
                                        stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16.2856 13.1431H18.8571" stroke="#9A77EC" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="flex flex-col w-full h-64 mt-8 -ml-2 items-center">
                                <AnalyticsWorkflowStatus workflowId={selectedWorkflow} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-box-color border-contrast-box-color border w-full h-96 rounded-md mt-6">
                    <div className="flex flex-col pt-4">
                        <p className="text-white font-outfit text-2xl font-light text-md pl-4 ">{"Lifetime"}</p>
                        <p className="text-white font-outfit text-sm font-thin pl-4 ">{"per Workflow"}</p>
                    </div>
                    <AnalyticsLifeTime/>
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
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded}
                           currentPage={"analytics"}/>
                <div className={`flex flex-col transition-all transition-300 ${sidebarExpanded ? 'ml-40' : 'ml-16'}`}>
                    <div className="p-4 mt-14">
                        <AnalyticsContent/>
                    </div>
                </div>
            </div>
        </>
    );
}
