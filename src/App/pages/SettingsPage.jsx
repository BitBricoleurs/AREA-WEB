import {AppNavBar, PageNavigator, SearchBar} from '../../components';
import React ,{useState} from "react";

const AdminTab = () => {

    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Users"}/>
                </div>
                <div className="flex flex-col flex-grow w-full pt-10">
                    <div className="flex bg-box-color border-contrast-box-color border w-full h-[529px] rounded-md">
                    </div>
                </div>
            </div>
        </>
    )
}

const GlobalTab = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-col flex-grow w-full pt-14">
                    <div className="flex bg-box-color border-contrast-box-color border w-1/2 h-[623px] rounded-md">
                    </div>
                </div>
            </div>
        </>
    )
}

export default function SettingsPage() {

    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());
    const [activeTab, setActiveTab] = useState('admin');

    const tabs = [
        { name: 'admin', label: 'Admin', component: <AdminTab />, barWidth: 75, barOffset: 122},
        { name: 'global', label: 'Global', component: <GlobalTab /> , barWidth: 80 , barOffset: 235},
    ];

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"settings"}/>
                <div className={`flex flex-col transition-all transition-700 h-full ease-in-out ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="flex p-4 mt-14 w-full h-full">
                        <PageNavigator TitlePageNavigator={"GLOBAL"} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </>
    );
}
