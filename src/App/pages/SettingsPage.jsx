import {AppNavBar, PageNavigator, SearchBar} from '../../App/components/index.js';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserTable from "../components/UserTable.jsx";
import microsoftIcon from '../../assets/icons/MicrosoftIcon.svg';
import githubIcon from '../../assets/icons/githubIcon.svg';
import {useContextLogin} from "../context/loginContext.jsx";
import jenkinsIcon from '../../assets/icons/jenkinsIcon.svg';
import jiraIcon from '../../assets/icons/jiraIcon.svg';
import Modal from "../components/Modal.jsx";

const AdminTab = () => {

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);
    const {ip} = useContextLogin();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}users`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
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
                fetch(`${ip}delete-user/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        "ngrok-skip-browser-warning": true,
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

const GlobalTab = () => {
    const [jiraUsername, setJiraUsername] = useState('');
    const [jiraToken, setJiraToken] = useState('');
    const [microsoftAuthUrl, setMicrosoftAuthUrl] = useState('');
    const [githubAuthUrl, setGithubAuthUrl] = useState('');
    const [jenkinsUsername, setJenkinsUsername] = useState('');
    const [jenkinsApiKey, setJenkinsApiKey] = useState('');
    const [openAiApiKey, setOpenAiApiKey] = useState('');
    const [servicesStatus, setServicesStatus] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const {ip} = useContextLogin();

    const placeholderToken =
    {
        "dark_mode": null,
        "github_token": null,
        "jenkins_token": null,
        "jira_token": null,
        "jira_username": null,
        "microsoft_token": "eyJ******ksA",
        "openai_token": null
    }

    const defaultServices = {
        'microsoft' : false,
        'github' : false,
        'jira' : false,
        'jenkins' : false,
        'openai' : false
    }

    useEffect(() => {
        fetchServicesStatus();
    } ,[])

    const fetchServicesStatus = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`${ip}check-settings`, {
                method: 'GET',
                headers: {
                    "ngrok-skip-browser-warning": true,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setServicesStatus(data.status || defaultServices);
                setJiraUsername(data.settings.jira_username || '');
                setJiraToken(data.settings.jira_token || '');
                setJenkinsUsername(data.settings.jenkins_username || '');
                setJenkinsApiKey(data.settings.jenkins_token || '');
                setOpenAiApiKey(data.settings.openai_token || '');

            } else {
                console.error('Failed to fetch services status');
            }
        } catch (error) {
            console.error('Error fetching services status:', error);
        }
    }

    const renderStatusIcon = (serviceName) => {
        if (servicesStatus[serviceName]) {
            return (
                <svg  viewBox="0 0 1024 1024" className="icon w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z"
                            fill="#43A047"></path>
                    </g>
                </svg>
            );
        } else {
            return null;
        }
    };

        const handleSubmitJira = async (e) => {
        e.preventDefault();

        const jiraLoginEndpoint = `${import.meta.env.VITE_REACT_APP_API_URL}jira-login`;

        try {
            const response = await fetch(jiraLoginEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jira_username: jiraUsername,
                    jira_token: jiraToken
                })
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage('Jira settings updated successfully.');
            } else {
                setResponseMessage(`Error: ${data.message || 'Failed to update Jira settings.'}`);
            }
        } catch (error) {
            console.error('Error updating Jira settings:', error);
            setResponseMessage('Error updating Jira settings.');
        }
    };

    const handleSubmitJenkins = async (e) => {
        e.preventDefault();

        // API endpoint
        const jenkinsLoginEndpoint = `${import.meta.env.VITE_REACT_APP_API_URL}jenkins-login`;

        try {
            const response = await fetch(jenkinsLoginEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jenkins_username: jenkinsUsername, // Assuming your API also expects a username field
                    jenkins_token: jenkinsApiKey
                })
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage('Jenkins settings updated successfully.');
            } else {
                setResponseMessage(`Error: ${data.error || 'Failed to update Jenkins settings.'}`);
            }
        } catch (error) {
            console.error('Error updating Jenkins settings:', error);
            setResponseMessage('Error updating Jenkins settings.');
        }
    };
    const handleSubmitOpenAI = async (e) => {
        e.preventDefault();

        // API endpoint
        const openAiLoginEndpoint = `${import.meta.env.VITE_REACT_APP_API_URL}openai-login`;

        try {
            const response = await fetch(openAiLoginEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    openai_token: openAiApiKey
                })
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage('OpenAI settings updated successfully.');
            } else {
                setResponseMessage(`Error: ${data.error || 'Failed to update OpenAI settings.'}`);
            }
        } catch (error) {
            console.error('Error updating OpenAI settings:', error);
            setResponseMessage('Error updating OpenAI settings.');
        }
    };

    useEffect(() => {
        const fetchMicrosoftAuthUrl = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}microsoft-login`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMicrosoftAuthUrl(data.authorization_url);
                } else {
                    console.error('Failed to fetch Microsoft auth URL');
                }
            } catch (error) {
                console.error('Error fetching Microsoft auth URL:', error);
            }
        };

        const fetchGithubAuthUrl = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await fetch(`${ip}github-login`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setGithubAuthUrl(data.authorization_url);
                } else {
                    console.error('Failed to fetch Github auth URL');
                }
            } catch (error) {
                console.error('Error fetching Github auth URL:', error);
            }
        }

        fetchMicrosoftAuthUrl();
        fetchGithubAuthUrl();
    }, []);



    const handleMicrosoftConnect = () => {
        const width = 600, height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const url = microsoftAuthUrl;
        const windowFeatures = `width=${width},height=${height},top=${top},left=${left},status=yes,toolbar=no,menubar=no,location=no`;

        window.open(url, 'MicrosoftLogin', windowFeatures);
    };

    const handleGithubConnect = () => {
        console.error(githubAuthUrl)
        const width = 600, height = 600;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const url = githubAuthUrl;
        console.log(url)
        const windowFeatures = `width=${width},height=${height},top=${top},left=${left},status=yes,toolbar=no,menubar=no,location=no`;

        window.open(url, 'MicrosoftLogin', windowFeatures);
    }
    

    return (
        <div className="flex flex-col w-full p-10 bg-background">
            <h2 className="text-3xl font-light text-custom-grey font-outfit mb-10">Integration Settings</h2>
            <div className="space-y-8">

                {/* Microsoft OAuth */}
                <div>
                    <div className="flex flex-row space-x-2">
                        <h3 className="mb-3 text-xl text-custom-grey font-outfit">Microsoft</h3>
                        {renderStatusIcon('microsoft')}
                    </div>
                    <button
                        className="flex items-center justify-center bg-[#0078D4] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#005A9E] transition duration-300 ease-in-out text-lg w-80"
                        onClick={handleMicrosoftConnect}
                    >
                        <img src={microsoftIcon} alt="Microsoft" className="mr-3 h-8"/>
                        Connect to Microsoft
                    </button>
                </div>

                {/* GitHub OAuth */}
                <div>
                    <div className="flex flex-row space-x-2">
                        <h3 className="mb-3 text-xl text-custom-grey font-outfit">GitHub</h3>
                        {renderStatusIcon('github')}
                    </div>
                    <button
                        onClick={handleGithubConnect}
                        className="flex items-center justify-center bg-[#24292E] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#1B1E23] transition duration-300 ease-in-out text-lg w-80">
                        <img src={githubIcon} alt="GitHub" className="mr-3 h-8"
                        />
                        Connect to GitHub
                    </button>
                </div>

                {/* Jenkins API Key Input */}
                <div>
                    <div className="flex flex-row space-x-2">
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">Jenkins</h3>
                    {renderStatusIcon('jenkins')}
                    </div>
                    <form onSubmit={handleSubmitJenkins} className="flex flex-col space-y-4">
                        <div className="flex flex-row space-x-4">
                            <input
                                type="text"
                                placeholder="Jenkins Username"
                                value={jenkinsUsername}
                                onChange={(e) => setJenkinsUsername(e.target.value)}
                                className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full outline-none focus:ring-1 focus:ring-[#D24939]"
                            />
                            <input
                                type="text"
                                placeholder="Jenkins API Key"
                                value={jenkinsApiKey}
                                onChange={(e) => setJenkinsApiKey(e.target.value)}
                                className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full outline-none focus:ring-1 focus:ring-[#D24939]"
                            />
                        </div>
                        <button type="submit"
                                className="flex items-center justify-center bg-[#D24939] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#C13030] transition duration-300 ease-in-out text-lg">
                            Submit Jenkins Credentials
                        </button>
                    </form>
                </div>

                {/* OpenAI API Key Input */}
                <div>
                    <div className="flex flex-row space-x-2">
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">OpenAI</h3>
                    {renderStatusIcon('openai')}
                    </div>
                    <form onSubmit={handleSubmitOpenAI} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="OpenAI API Key"
                            value={openAiApiKey}
                            onChange={(e) => setOpenAiApiKey(e.target.value)}
                            className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full outline-none focus:ring-1 focus:ring-magic-color"
                        />
                        <button type="submit" className="flex items-center justify-center bg-magic-color text-white py-3 px-6 rounded-md shadow-md   hover:bg-opacity-80 transition duration-300 ease-in-out text-lg">
                            Submit OpenAI API Key
                        </button>
                    </form>
                </div>
                {/* Jira OAuth */}
                <div>
                    <div className="flex flex-row space-x-2">
                    <h3 className="mb-3 text-xl text-custom-grey font-outfit">Jira</h3>
                    {renderStatusIcon('jira')}
                    </div>
                    <form onSubmit={handleSubmitJira} className="flex flex-col space-y-4">
                        <div className="flex flex-row space-x-4">
                        <input
                            type="text"
                            placeholder="Jira Username"
                            value={jiraUsername}
                            onChange={(e) => setJiraUsername(e.target.value)}
                            className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full outline-none focus:ring-1 focus:ring-[#0052cc]"
                        />
                        <input
                            type="text"
                            placeholder="Jira Token"
                            value={jiraToken}
                            onChange={(e) => setJiraToken(e.target.value)}
                            className="bg-box-color text-white py-3 px-6 rounded-md border border-contrast-box-color w-full outline-none focus:ring-1 focus:ring-[#0052cc]"
                        />
                        </div>
                        <button type="submit"
                                className="flex items-center justify-center bg-[#0052cc] text-white py-3 px-6 rounded-md shadow-md   hover:bg-opacity-80 transition duration-300 ease-in-out text-lg">
                            Submit Jira Credentials
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
    const {ip} = useContextLogin();

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch(`${ip}me`, {
                    method: 'GET',
                    headers: {
                        "ngrok-skip-browser-warning": true,
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
            <div className="bg-background h-full w-full min-h-screen">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"settings"}/>
                <div className={`flex flex-col transition-all transition-700 h-full ease-in-out ${sidebarExpanded ? 'ml-40' : 'ml-16'}`}>
                    <div className="flex p-4 mt-14 w-full h-full">
                        <PageNavigator TitlePageNavigator={"SETTINGS"} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </>
    );
}