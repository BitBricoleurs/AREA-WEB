import {
    AppNavBar,
    SearchBar,
    LittleInputBox,
    LargeInputBox,
    GraphEditor,
    CustomCard,
    NotificationManager
} from '/src/App/components';
import React, {useEffect, useState} from "react";
import {cardServicesStyles} from '/src/constants';
import {useLocation} from 'react-router-dom';
import {useWorkflowContext} from "../context/workflowContext.jsx";
import Draggable from 'react-draggable';
import {GraphEditorContextProvider} from "../context/graphEditorContext.jsx";
import Spinner from "../components/SucessSpinner.jsx";
import {useNotification} from "../context/notificationContext.jsx";


const SelectTrigger = ({onTriggerSelect, isModalOpen}) => {

    const {fetchTriggers, fetchActions, triggers} = useWorkflowContext();
    const [isLoading, setIsLoading] = useState(true);
    const [displayedTriggers, setDisplayedTriggers] = useState([]);
    const [nonDisplayedTriggers, setNonDisplayedTriggers] = useState([]);

    useEffect(() => {
        fetchTriggers().then(fetchedTriggers => {
            const usedTriggers = transformTriggers(fetchedTriggers);
            setDisplayedTriggers(getMatchingTriggers(usedTriggers));
            setNonDisplayedTriggers(getNonMatchingTriggers(usedTriggers));
            setIsLoading(false);
        });
        fetchActions();
    }, []);

    const transformTriggers = (services) => {
        let transformedTriggers = [];

        services.forEach(service => {
            service.triggers.forEach(trigger => {
                transformedTriggers.push({
                    name: service.name,
                    description: trigger.name
                });
            });
        });
        console.log("Transformed triggers", transformedTriggers)
        return transformedTriggers;
    };

    const [searchInput, setSearchInput] = useState('');
    const getMatchingTriggers = (usedTriggers) => {
        return usedTriggers
            .filter(trigger =>
                trigger.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                trigger.description.toLowerCase().includes(searchInput.toLowerCase())
            )
            .sort((a, b) => {
                let aMatch = a.name.toLowerCase().indexOf(searchInput.toLowerCase());
                let bMatch = b.name.toLowerCase().indexOf(searchInput.toLowerCase());
                return aMatch - bMatch;
            });
    };

    const getNonMatchingTriggers = (usedTriggers) => {
        return usedTriggers
            .filter(trigger =>
                !trigger.name.toLowerCase().includes(searchInput.toLowerCase()) &&
                !trigger.description.toLowerCase().includes(searchInput.toLowerCase())
            );
    };


    const containerClasses = isModalOpen
        ? "flex flex-col w-full blur-sm brightness-50"
        : "flex flex-col w-full";

    return (
        <div className={containerClasses}>
            <span className="text-2xl font-bold font-outfit mt-2 text-custom-grey">{"AUTOMATE"}</span>
            <div className="flex w-full pt-10">
                <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} searchPlaceHolder={"Trigger"}/>
            </div>
            <div className="flex flex-col flex-grow w-full mt-10">
            </div>
            <div className={"grid lg:grid-cols-5 gap-6 grid-cols-2 sm:grid-cols-3"}>
                {!isLoading &&
                displayedTriggers.map((service, index) => (
                    <div key={index}
                         className="flex items-center justify-center h-60 rounded bg-gray-50 dark:bg-box-color border border-contrast-box-color w-full hover:border-light-purple hover:scale-105 transition-all duration-300">
                        <CustomCard serviceName={service.name} description={service.description}
                                    onSelect={() => onTriggerSelect(service)}/>
                    </div>
                ))}
                {!isLoading &&
                    nonDisplayedTriggers.map((service, index) => (
                    <div key={index}
                         className="flex items-center justify-center h-60 rounded bg-black text-white dark:bg-box-color border border-contrast-box-color w-full opacity-50">
                        <CustomCard serviceName={service.name} description={service.description}
                                    onSelect={() => onTriggerSelect(service)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

const TriggerModal = ({trigger, onClose, onCreate, spinnerStatus}) => {

    const {workflowName, setWorkflowName} = useWorkflowContext();
    const {workflowDescription, setWorkflowDescription} = useWorkflowContext();

    const handleWorkflowNameChange = (event) => {
        setWorkflowName(event.target.value);
    };

    const handleWorkflowDescriptionChange = (event) => {
        setWorkflowDescription(event.target.value);
    };

    return (
        <div className="flex fixed z-50 md:inset-0 w-full h-full">
            <div className="flex justify-center items-center relative p-4 w-full h-full">
                <Draggable>
                    <div
                        className="flex relative bg-white rounded-lg shadow dark:bg-background w-1/2 h-1/2 border border-contrast-box-color">
                        <div className="flex flex-row w-full h-full pl-8 pt-4">
                            <div className={`w-1 h-2/4 rounded-md bg-vertical-purple-gradient`}></div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex flex-row w-full">
                                    <span
                                        className="font-outfit text-2xl font-bold text-custom-grey pt-2 pl-8">{"Create Workflow"}</span>
                                    <button onClick={onClose} type="button"
                                            className="text-custom-grey bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-light-purple dark:hover:bg-background mr-4"
                                            data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="flex flex-col w-full h-full items-center justify-center mb-8">
                                    <div className="space-y-4">
                                        <LittleInputBox placeholder={"Name"} value={workflowName}
                                                        onChange={handleWorkflowNameChange}/>
                                        <LargeInputBox placeholder={"Description"} value={workflowDescription}
                                                       onChange={handleWorkflowDescriptionChange}/>
                                    </div>
                                    <div className="absolute flex flex-row space-x-8 items-center bottom-6">
                                        <button onClick={() => onCreate(trigger, workflowName, workflowDescription)}
                                                disabled={!workflowName.trim()}
                                                className={`flex items-center w-28 h-10 rounded-md border ${
                                                    workflowName.trim() ? 'border-light-purple bg-light-purple hover:bg-contrast-box-color focus:bg-contrast-box-color' : 'bg-box-color text-background border-box-color'
                                                } group justify-center transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-light-purple`}>
                                                <span className={`font-outfit transition-all duration-300 font-medium ${
                                                    workflowName.trim() ? 'text-dark-purple group-hover:text-white group-focus:text-white' : 'text-background'
                                                    }`}>
                                                    {`${spinnerStatus === 'idle' ? 'Create' : ''}`}
                                                        <Spinner contrast={"none"} status={spinnerStatus}/>
                                                </span>
                                        </button>

                                        <button onClick={onClose}
                                                className="flex items-center w-28 h-10 rounded-md border border-light-purple hover:bg-light-purple bg-contrast-box-color group justify-center transition-all duration-300">
                                        <span
                                            className="font-outfit transition-all duration-300 font-medium group-hover:text-dark-purple text-white">{"Cancel"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable>
            </div>
        </div>
    )
}

function AutomateContent() {
    const location = useLocation();
    const [isSelectingTrigger, setIsSelectingTrigger] = useState(false);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workflowName, setWorkflowName] = useState('');
    const [workflowDescription, setWorkflowDescription] = useState('');
    const {workflowId, setWorkflowId} = useWorkflowContext();
    const {createWorkflow, setWorkflow} = useWorkflowContext();
    const [spinnerStatus, setSpinnerStatus] = useState('idle');
    const {setNotification} = useNotification();


    useEffect(() => {
        const id = location.state?.workflowID;
        if (id && id !== 'new') {
            setWorkflowId(id);
        } else {
            setIsSelectingTrigger(true);
        }
    }, []);

    const handleTriggerSelect = (trigger) => {
        setSelectedTrigger(trigger);
        setIsModalOpen(true);
    };

    const handleCreateWorkflow = async (trigger, newWorkflowName, newWorkFlowDescription) => {
        setWorkflowName(newWorkflowName);
        setWorkflowDescription(newWorkFlowDescription);
        setSpinnerStatus('loading');
        try {
            const workflowData = await createWorkflow(trigger, workflowName, workflowDescription);
            setSpinnerStatus('success');
        } catch (error) {
            setSpinnerStatus('failed');
            setNotification({
                notificationState: 'Error',
                message: error.message
            });
            console.error("Erreur lors de la création du workflow:", error);
        }
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    if (workflowId) {
        return (
            <div className="flex mt-14 w-full h-full">
                <GraphEditorContextProvider startingTrigger={selectedTrigger}>
                    <GraphEditor startingTrigger={selectedTrigger} workflowId={workflowId}/>
                </GraphEditorContextProvider>
            </div>
        );
    }

    if (isSelectingTrigger) {
        return (
            <div className="flex p-4 mt-14 w-full h-full">
                <SelectTrigger onTriggerSelect={handleTriggerSelect} isModalOpen={isModalOpen}/>
                {isModalOpen && (
                    <TriggerModal trigger={selectedTrigger} onClose={handleCloseModal} onCreate={handleCreateWorkflow}
                                  spinnerStatus={spinnerStatus}/>)}
            </div>
        );
    }

    return <div>Loading...</div>;
}

export default function AutomatePage() {
    const isWindowLarge = () => {
        return window.innerWidth > 640;
    }
    const [sidebarExpanded, setSidebarExpanded] = useState(isWindowLarge());

    return (
        <>
            <div className="bg-background h-full w-full min-h-screen">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded}
                           currentPage={"automate"}/>
                <div className={`flex flex-col transition-all transition-300 ${sidebarExpanded ? 'ml-40' : 'ml-16'}`}>
                    <NotificationManager/>
                    <AutomateContent/>
                </div>
            </div>
        </>
    );
}
