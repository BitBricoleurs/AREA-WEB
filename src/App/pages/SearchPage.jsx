import { AppNavBar}  from '../../components';
import React ,{useState} from "react";

export default function SearchPage() {

    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

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