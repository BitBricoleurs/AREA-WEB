import { AppNavBar}  from '../../components';
import React ,{useState} from "react";

export default function AnalyticsPage() {
    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"analytics"}/>
                <div className={"p-40"}>
                    Analytics Page
                </div>
            </div>
        </>
    );
}
