import { AppNavBar}  from '../../components';
import React ,{useState} from "react";

export default function SettingsPage() {

    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"settings"}/>
                <div className={"p-40"}>
                    Settings Page
                </div>
            </div>
        </>
    );
}
