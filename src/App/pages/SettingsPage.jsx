import {AppNavBar, PageNavigator, SearchBar} from '../../Static/components';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserTable from "../components/UserTable.jsx";
import azureIcon from '../../assets/icons/azureIcon.svg';
import githubIcon from '../../assets/icons/githubIcon.svg';
import jenkinsIcon from '../../assets/icons/jenkinsIcon.svg';
import jiraIcon from '../../assets/icons/jiraIcon.svg';

const AdminTab = () => {

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching users: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.users.map(user => ({ ...user, isSelected: false })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);


    const filteredUsers = users.filter(users =>
        users.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toggleUsersSelection = (id) => {
        setUsers(currentWorkflows =>
            currentWorkflows.map(users =>
                users.user_id === id ? { ...users, isSelected: !users.isSelected } : users
            )
        );
    };

    const isAnyWorkflowSelected = users.some(users => users.isSelected);

    const handleDeleteUsers = async () => {
        const selectedUserIds = users.filter(user => user.isSelected).map(user => user.user_id);

        try {
            await Promise.all(selectedUserIds.map(userId =>
                fetch(`${import.meta.env.VITE_REACT_APP_API_URL}delete-user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                        'Content-Type': 'application/json'
                    }
                })
            ));

            setUsers(currentUsers => currentUsers.filter(user => !user.isSelected));
            console.log('Users deleted successfully');
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex pt-8 w-full pb-12">
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Users"}/>
                </div>
                <div className="bg-box-color border border-contrast-box-color rounded-lg pt-5 pb-5 px-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-light text-custom-grey font-outfit">BotButler Users</h2>
                        <div className="flex space-x-4">
                            <button
                                className={`py-2 px-3 rounded-md shadow-md transition duration-300 ease-in-out ${isAnyWorkflowSelected ? 'bg-error-red hover:bg-error-red text-white' : 'bg-contrast-box-color text-black'}`}
                                onClick={handleDeleteUsers}
                                disabled={!isAnyWorkflowSelected}
                            >
                                Delete User(s)
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col flex-grow w-full pt-4">
                        <UserTable users={filteredUsers} toggleUserSelection={toggleUsersSelection} />
                    </div>
                </div>
            </div>
        </>
    )
}

const logos = {
    microsoft: 'assets/icons/MicrosoftIcon.svg',
    github: 'path/to/github-logo.png',
    jenkins: 'path/to/jenkins-logo.png',
};



const GlobalTab = () => {
    const [jiraUsername, setJiraUsername] = useState('');
    const [jiraToken, setJiraToken] = useState('');

    const handleSubmitJira = (e) => {
        e.preventDefault();
        // Handle Jira submission logic here
        console.log('Jira Username:', jiraUsername, 'Jira Token:', jiraToken);
    };

    return (
        <div className="flex flex-col w-full p-10 bg-background">
            <h2 className="text-3xl font-light text-custom-grey font-outfit mb-10">Integration Settings</h2>
            <div className="space-y-8">

                {/* Azure OAuth */}
                <div>
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">Azure</h3>
                    <button className="flex items-center bg-[#0078D4] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#005A9E] transition duration-300 ease-in-out text-lg">
                        <img src={azureIcon} alt="Azure" className="mr-3 h-8" />
                        Connect to Azure
                    </button>
                </div>

                {/* GitHub OAuth */}
                <div>
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">GitHub</h3>
                    <button className="flex items-center bg-[#24292E] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#1B1E23] transition duration-300 ease-in-out text-lg">
                        <img src={githubIcon} alt="GitHub" className="mr-3 h-8" />
                        Connect to GitHub
                    </button>
                </div>

                {/* Jenkins OAuth */}
                <div>
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">Jenkins</h3>
                    <button className="flex items-center bg-[#D33833] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#C13030] transition duration-300 ease-in-out text-lg">
                        <img src={jenkinsIcon} alt="Jenkins" className="mr-3 h-8" />
                        Connect to Jenkins
                    </button>
                </div>

                {/* Jira Inputs */}
                <div>
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">Jira</h3>
                    <form onSubmit={handleSubmitJira} className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Jira Username"
                                value={jiraUsername}
                                onChange={(e) => setJiraUsername(e.target.value)}
                                className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full"
                            />
                            <input
                                type="password"
                                placeholder="Jira Token"
                                value={jiraToken}
                                onChange={(e) => setJiraToken(e.target.value)}
                                className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full"
                            />
                        </div>
                        <button type="submit" className="flex items-center justify-center bg-[#0052CC] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#003C8A] transition duration-300 ease-in-out text-lg">
                            <img src={jiraIcon} alt="Jira" className="mr-3 h-8" />
                            Connect to Jira
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default function SettingsPage() {
    const isWindowLarge = () => window.innerWidth > 640;
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());
    const [activeTab, setActiveTab] = useState('global');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}me`, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': true,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.role === 'admin') {
                        setIsAdmin(true);
                        setActiveTab('admin');
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    console.error('Failed to fetch user data');
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAdmin(false);
            }
        };

        checkAdminRole();
    }, []);


    const tabs = [
        { name: 'admin', label: 'Admin', component: <AdminTab />, barWidth: 75, barOffset: 144, disabled: !isAdmin},
        { name: 'global', label: 'Global', component: <GlobalTab />, barWidth: 80, barOffset: 255, disabled: false},
    ];

    return (
        <>
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"settings"}/>
                <div className={`flex flex-col transition-all transition-700 h-full ease-in-out ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                    <div className="flex p-4 mt-14 w-full h-full">
                        <PageNavigator TitlePageNavigator={"SETTINGS"} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </>
    );
}