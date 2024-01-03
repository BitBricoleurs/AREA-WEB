import whiteLogo from "../../assets/icons/whiteLogo.svg";
import React, {useState, useEffect, useMemo} from "react";
import { Link } from 'react-router-dom';
import {useContextLogin} from "../context/loginContext.jsx";

const AppNavBar = ({isSidebarExpanded, onToggleSidebar, currentPage}) => {
    const {tokenExists, logout, getMe, isLoading} = useContextLogin();


    const Dropdown = ({ buttonContent, children }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        const toggleDropdown = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };


        return (
            <div className="relative">
                <button
                    type="button"
                    className={`inline-flex items-center justify-center py-2 rounded-md text-gray-400 ${isDropdownOpen ? 'text-white' : 'hover:text-white'} group`}
                    onClick={toggleDropdown}
                >
                    {buttonContent}
                    <svg className={`group-hover:rotate-0 -rotate-90 group-hover: transition ease-linear ${isDropdownOpen ? 'stroke-white' : ''} group-hover:stroke-white`} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289Z" fill="#A9A9A9"/>
                    </svg>
                </button>
                <div
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className={`${
                        isDropdownOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
                    } absolute z-50 right-0 mt-2 w-48 transform transition duration-300 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
                    style={{ transitionProperty: 'opacity, transform' }}
                >
                        {children}
                    </div>
            </div>
        );
    }

    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const checkWindowSize = () => {
        if (!isWindowLarge()) {
            onToggleSidebar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', checkWindowSize);

        return () => window.removeEventListener('resize', checkWindowSize);
    }, []);

    const [userName, setUserName] = useState('Account');

    useMemo(() => {
        const fetchUser = async () => {
            if (tokenExists()) {
                try {
                    const userData = await getMe();
                    setUserName(userData.name);
                } catch (error) {
                    console.error("Error fetching user data", error);
                    logout();
                }
            } else {
                logout();
            }
        };
        fetchUser();
    }, []);




    const isCurrentPage = (page) => currentPage === page;

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-upside-bar dark:border-contrast-box-color">
                <div className="px-3 py-1.5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end select-none">
                            <Link className="flex items-center rtl:space-x-reverse group select-none space-x-3" to={"#"}>
                                <img src={whiteLogo} className="h-6" alt={"PurpleVideo"}/>
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white font-outfit">
                                <span className="font-light group-hover:text-light-purple transition duration-700">Bot</span>
                                <span className="font-medium">Butler</span>
                    <       /span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ">
                            <div className="flex items-center font-outfit text-md divide-x divide-custom-grey">
                                    <Link to="#" className="flex items-center space-x-3 mx-3 sm:mx-6 text-custom-grey hover:text-white font-thin">
                                        Help
                                    </Link>
                                    <Dropdown buttonContent={
                                        <div className="flex items-center space-x-3 mx-3 sm:mx-6 font-thin">
                                            {isLoading ? (
                                                <div>Chargement...</div>
                                            ) : (
                                                <span className="text-md">{userName}</span>
                                            )}
                                        </div>
                                    } >
                                        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                            <div className="py-1" role="none">

                                                <Link to="/settings" className="text-custom-grey block px-4 py-2 text-sm hover:text-light-purple" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</Link>
                                                <Link to="https://github.com/BitBricoleurs/AREA-WEB" className="text-custom-grey block px-4 py-2 text-sm hover:text-light-purple" role="menuitem" tabIndex="-1" id="menu-item-2">License</Link>
                                                    <button onClick={logout} className="text-custom-grey block w-full px-4 py-2 text-left text-sm hover:text-light-purple" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                                            </div>
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            </nav>
            <div className="flex">
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all ease-in-out duration-300 ${isSidebarExpanded ? 'w-40' : 'w-14'} bg-white dark:bg-box-color dark:border-gray-700 border-contrast-box-color border border-1 `} aria-label="Sidebar"
                   onMouseOver={() => isWindowLarge() && onToggleSidebar(true)}
                   onMouseLeave={() => isWindowLarge() && onToggleSidebar(false)}
            >
                <div className="h-full px-2 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <Link to="/dashboard" className={`flex items-center p-2 rounded-md ${isCurrentPage('dashboard') ? 'bg-dark-purple text-white' : 'text-custom-grey hover:bg-dark-purple hover:bg-opacity-30 hover:text-white group'}`}>
                            <li className="flex items-center">
                                <svg className={`${isCurrentPage('dashboard') ? "stroke-white" : 'stroke-custom-grey group-hover:stroke-white'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7.90634V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V7.90634M2 10.0001L10.8531 3.80294C11.5417 3.32089 12.4583 3.32089 13.1469 3.80294L22 10.0001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={`ml-3 transition-all ease-out duration-200 ${isSidebarExpanded ? 'visible' : 'invisible'}`}>Dashboard</div>

                            </li>
                        </Link>
                        <Link to={"/search"} className={`flex items-center p-2 rounded-md ${isCurrentPage('search') ? 'bg-dark-purple text-white' : 'text-custom-grey hover:bg-dark-purple hover:bg-opacity-30 hover:text-white group'}`}>
                            <li className="flex items-center">
                                <svg className={`${isCurrentPage('search') ? "stroke-white" : 'stroke-custom-grey group-hover:stroke-white'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11" cy="11" r="7"  strokeWidth="2"/>
                                    <path d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"  strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M20 20L17 17" strokeWidth="2" strokeLinecap="round"/>
                                </svg>

                                <span className={`ml-3 transition-all duration-200 ${isSidebarExpanded ? 'visible' : 'invisible'}`}>Search</span>
                            </li>
                        </Link>
                            <Link  to={{
                                    pathname: "/automate",
                                }}
                               state={{ workflowID: "new" }}
                               className={`flex items-center p-2 rounded-md ${isCurrentPage('automate') ? 'bg-dark-purple text-white' : 'text-custom-grey hover:bg-dark-purple hover:bg-opacity-60 hover:text-white group'}`}>
                            <li className="flex items-center">
                            <svg className={`${isCurrentPage('automate') ? "fill-white" : 'fill-custom-grey group-hover:fill-white'}`} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z" />
                                </svg>
                                <span className={`ml-3 transition-all duration-200 ${isSidebarExpanded ? 'visible' : 'invisible'}`}>Automate</span>
                            </li>
                        </Link>

                        <Link to="/analytics" className={`flex items-center p-2 rounded-md ${isCurrentPage('analytics') ? 'bg-dark-purple text-white' : 'text-custom-grey hover:bg-dark-purple hover:bg-opacity-30 hover:text-white group'}`}>
                            <li className="flex items-center">
                                <svg className={`${isCurrentPage('analytics') ? "fill-white" : 'fill-custom-grey group-hover:fill-white'}`} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 10C8.55228 10 9 10.4477 9 11L9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16L7 11C7 10.4477 7.44772 10 8 10Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16 12C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16L15 13C15 12.4477 15.4477 12 16 12Z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 7C12.5523 7 13 7.44772 13 8L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 8C11 7.44772 11.4477 7 12 7Z"/>
                                </svg>
                                <span className={`ml-3 transition-all duration-200 ${isSidebarExpanded ? 'visible' : 'invisible'}`}>Analytics</span>
                            </li>
                        </Link>
                        <Link to="/settings" className={`flex items-center p-2 rounded-md ${isCurrentPage('settings') ? 'bg-dark-purple text-white' : 'text-custom-grey hover:bg-dark-purple hover:bg-opacity-30 hover:text-white group'}`}>
                            <li className="flex items-center">
                                <svg className={`${isCurrentPage('settings') ? "fill-white" : 'fill-custom-grey group-hover:fill-white'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.72946 4.54104C8.72946 3.13766 9.86712 2 11.2705 2H12.7292C14.1325 2 15.2702 3.13766 15.2702 4.54104C15.2702 4.74442 15.4105 5.01577 15.7457 5.19782C15.8488 5.25384 15.9505 5.31209 16.0508 5.37252C16.3851 5.57406 16.6989 5.56113 16.8832 5.45569C18.107 4.75547 19.6665 5.17332 20.3763 6.39162L21.0807 7.60076C21.7918 8.8214 21.3721 10.3877 20.146 11.0892C19.9682 11.1909 19.801 11.4496 19.8092 11.8346C19.8104 11.8896 19.8109 11.9448 19.8109 12C19.8109 12.0552 19.8104 12.1104 19.8092 12.1654C19.801 12.5504 19.9682 12.8091 20.146 12.9108C21.3721 13.6123 21.7917 15.1786 21.0806 16.3992L20.3762 17.6084C19.6665 18.8267 18.107 19.2445 16.8832 18.5443C16.6989 18.4389 16.3851 18.4259 16.0508 18.6275C15.9505 18.6879 15.8488 18.7462 15.7457 18.8022C15.4105 18.9842 15.2702 19.2556 15.2702 19.459C15.2702 20.8623 14.1325 22 12.7292 22H11.2705C9.86712 22 8.72946 20.8623 8.72946 19.459C8.72946 19.2556 8.5892 18.9842 8.254 18.8022C8.15085 18.7462 8.04912 18.6879 7.94888 18.6275C7.61457 18.4259 7.30074 18.4389 7.11648 18.5443C5.89269 19.2445 4.3332 18.8267 3.62346 17.6084L2.91902 16.3992C2.20791 15.1786 2.62757 13.6123 3.8537 12.9108C4.03147 12.8091 4.19861 12.5504 4.19047 12.1654C4.1893 12.1104 4.18872 12.0553 4.18872 12C4.18872 11.9448 4.1893 11.8896 4.19046 11.8346C4.19861 11.4497 4.03146 11.191 3.85369 11.0892C2.62753 10.3877 2.20787 8.82141 2.91899 7.60077L3.62341 6.39163C4.33316 5.17333 5.89265 4.75548 7.11645 5.4557C7.30072 5.56113 7.61455 5.57407 7.94887 5.37253C8.04911 5.3121 8.15085 5.25384 8.254 5.19782C8.5892 5.01577 8.72946 4.74442 8.72946 4.54104ZM11.2705 4C10.9717 4 10.7295 4.24223 10.7295 4.54104C10.7295 5.64708 10.024 6.51246 9.20851 6.95535C9.13175 6.99703 9.05604 7.04039 8.98143 7.08537C8.18596 7.5649 7.08395 7.74134 6.1232 7.19163C5.85285 7.03694 5.50833 7.12925 5.35153 7.39839L4.64711 8.60754C4.49509 8.86848 4.58481 9.20332 4.84693 9.3533C5.80924 9.90391 6.20965 10.9487 6.19002 11.8769C6.18915 11.9178 6.18872 11.9589 6.18872 12C6.18872 12.0412 6.18915 12.0822 6.19002 12.1231C6.20966 13.0513 5.80925 14.0961 4.84695 14.6467C4.58484 14.7967 4.49513 15.1315 4.64714 15.3924L5.35158 16.6016C5.50837 16.8708 5.85288 16.9631 6.12323 16.8084C7.08397 16.2587 8.18597 16.4351 8.98143 16.9146C9.05605 16.9596 9.13176 17.003 9.20851 17.0447C10.024 17.4875 10.7295 18.3529 10.7295 19.459C10.7295 19.7578 10.9717 20 11.2705 20H12.7292C13.028 20 13.2702 19.7578 13.2702 19.459C13.2702 18.3529 13.9757 17.4875 14.7911 17.0447C14.8679 17.003 14.9436 16.9596 15.0182 16.9146C15.8137 16.4351 16.9157 16.2587 17.8764 16.8084C18.1468 16.9631 18.4913 16.8708 18.6481 16.6016L19.3525 15.3924C19.5045 15.1315 19.4148 14.7967 19.1527 14.6467C18.1904 14.0961 17.79 13.0513 17.8096 12.1231C17.8105 12.0822 17.8109 12.0412 17.8109 12C17.8109 11.9589 17.8105 11.9178 17.8096 11.8769C17.79 10.9487 18.1904 9.9039 19.1527 9.35329C19.4149 9.20331 19.5046 8.86848 19.3525 8.60753L18.6481 7.39839C18.4913 7.12924 18.1468 7.03693 17.8764 7.19162C16.9157 7.74134 15.8137 7.5649 15.0182 7.08536C14.9436 7.04039 14.8679 6.99703 14.7911 6.95535C13.9757 6.51246 13.2702 5.64708 13.2702 4.54104C13.2702 4.24223 13.028 4 12.7292 4H11.2705Z"/>
                                </svg>

                                <span className={`ml-3 transition-all duration-200 ${isSidebarExpanded ? 'visible' : 'invisible'}`}>Settings</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </aside>
            </div>

        </div>
    );
}

export default AppNavBar;