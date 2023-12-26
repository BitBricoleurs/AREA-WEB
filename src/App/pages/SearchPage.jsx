import { AppNavBar, PageNavigator, SearchBar}  from '../../Static/components';
import React ,{useState} from "react";
import WorkflowTable from "../components/WorkflowTable.jsx";

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


const WorkflowTab = () => {

    const [searchInput, setSearchInput] = useState('');
    const [workflows, setWorkflows] = useState(mockWorkflows);

    const filteredWorkflows = workflows.filter(workflow =>
        workflow.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"name workflows..."} />
                </div>
                <div className="flex flex-col flex-grow w-full pt-10">
                    <WorkflowTable workflows={filteredWorkflows} />
                </div>
            </div>
        </>
    )
}

const HistoryTab = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"History"}/>
                </div>
                <div className="flex flex-col flex-grow w-full pt-10">
                    <div className="flex bg-box-color border-contrast-box-color border w-full h-[529px] rounded-md">
                    </div>
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
