import { AppNavBar}  from '../../components';
import React ,{useState} from "react";

export default function SearchPage() {

    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"search"}/>
                <div className={"p-40"}>
                Search Page
                </div>
            </div>
        </>
    );
}
