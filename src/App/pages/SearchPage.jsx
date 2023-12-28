import { AppNavBar, PageNavigator, SearchBar}  from '../../Static/components';
import React ,{useState} from "react";
import WorkflowTable from "../components/WorkflowTable.jsx";
import {useNavigate} from "react-router-dom";
import WorkflowHistoryTable from "../components/WorkflowHistoryTable.jsx";

const mockWorkflows = [
    {
        "id": 1,
        "name": "Create branch on new ticket",
        "lastTimeStarted": "2022-07-21T08:21:00Z",
        "averageRuntime": "5min01s",
        "totalUse": 2,
        "state": "Active"
    },
    {
        "id": 2,
        "name": "Notify team on PR",
        "lastTimeStarted": "2022-07-28T14:02:00Z",
        "averageRuntime": "1min02s",
        "totalUse": 9,
        "state": "Disabled"
    },
    {
        "id": 3,
        "name": "Send email on job success",
        "lastTimeStarted": "2022-07-22T09:15:00Z",
        "averageRuntime": "2min15s",
        "totalUse": 5,
        "state": "Active"
    }
]


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

const WorkflowTab = () => {

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [workflows, setWorkflows] = useState(
        mockWorkflows.map(workflow => ({ ...workflow, isSelected: false }))
    );


    const filteredWorkflows = workflows.filter(workflow =>
        workflow.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toggleWorkflowSelection = (id) => {
        setWorkflows(currentWorkflows =>
            currentWorkflows.map(workflow =>
                workflow.id === id ? { ...workflow, isSelected: !workflow.isSelected } : workflow
            )
        );
    };

    const isAnyWorkflowSelected = workflows.some(workflow => workflow.isSelected);

    const handleNewWorkflow = () => {
        navigate('/automate');
    };

    const handleDeleteWorkflows = () => {
        const delete_workflows = workflows.filter(workflow => workflow.isSelected).map(workflow => workflow.id);
        console.log('Delete Workflows clicked', delete_workflows);
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Workflows deleted successfully');
            }, 500);
        })
            .then(response => {
                console.log(response);
                setWorkflows(currentWorkflows => currentWorkflows.filter(workflow => !workflow.isSelected));
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full pb-12">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Search name workflows..."} />
                </div>
                <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                    <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-light text-custom-grey font-outfit">Your Workflows</h2>
                    <div className="flex space-x-4">
                        <button
                            className="bg-light-purple text-white py-2 px-3 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-dark-purple"
                            onClick={handleNewWorkflow}
                        >
                            New Workflow
                        </button>
                        <button
                            className={`py-2 px-3 rounded-md shadow-md transition duration-300 ease-in-out ${isAnyWorkflowSelected ? 'bg-error-red hover:bg-error-red text-white' : 'bg-contrast-box-color text-black'}`}
                            onClick={handleDeleteWorkflows}
                            disabled={!isAnyWorkflowSelected}
                        >
                            Delete Workflows
                        </button>
                    </div>
                </div>

                <div className="flex flex-col flex-grow w-full pt-4">
                    <WorkflowTable workflows={filteredWorkflows} toggleWorkflowSelection={toggleWorkflowSelection} />
                </div>
            </div>
            </div>
        </>
    )
}

const HistoryTab = () => {
    const [searchInput, setSearchInput] = useState('');
    const [workflows, setWorkflows] = useState(mockHistory);

    const filteredWorkflows = workflows.filter(workflow =>
        workflow.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full pb-12">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Search name workflows..."} />
                </div>
                <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                    <h2 className="text-2xl font-light text-custom-grey font-outfit mb-4">Workflows History</h2>
                    <WorkflowHistoryTable workflows={filteredWorkflows} />
                </div>

            </div>
        </>
    )
}

export default function SearchPage() {

    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());
    const [activeTab, setActiveTab] = useState('workflow');
    const tabs = [
        { name: 'workflow', label: 'Workflow', component: <WorkflowTab />, barWidth: 100, barOffset: 128},
        { name: 'history', label: 'History', component: <HistoryTab /> , barWidth: 80, barOffset: 268},
    ];

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"search"}/>
                <div className={`flex flex-col transition-all transition-700 ease-in-out ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="flex p-4 mt-14 w-full">
                        <PageNavigator TitlePageNavigator={"SEARCH"} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </>
    );
}
