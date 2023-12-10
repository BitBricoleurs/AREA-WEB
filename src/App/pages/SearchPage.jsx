import { AppNavBar, PageNavigator, SearchBar}  from '../../components';
import React ,{useState} from "react";



const WorkflowTab = () => {

    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Workflows"}/>
                </div>
                <div className="flex flex-col flex-grow w-full pt-10">
                    <div className="flex bg-box-color border-contrast-box-color border w-full h-[529px] rounded-md">
                </div>
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
