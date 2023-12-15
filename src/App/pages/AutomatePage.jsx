import {AppNavBar, SearchBar, LittleInputBox, LargeInputBox, GraphEditor} from '../../Static/components';
import React, {useEffect, useState} from "react";
import {cardServicesStyles, triggers} from '/src/constants';
import { useLocation } from 'react-router-dom';
import {useWorkflowContext} from "../context/workflowContext.jsx";


const TriggerCard = ({serviceName, description, onSelect}) => {

    const styles = cardServicesStyles[serviceName] || cardServicesStyles['default'];

    return (
        <div className="h-full w-full flex">
            <div className="flex flex-row w-full h-full pl-4 pt-4">
                <div className={`w-1 h-2/4 rounded-md ${styles.backgroundColor}`}></div>
                <div className="flex flex-col w-full h-full pl-4 items-center">
                    <div className="flex flex-row w-full h-full space-x-5 items-center">
                        <img className={"w-10 h-10"} src={styles.iconPath} alt={serviceName}/>
                        <div className="font-outfit text-xl font-regular text-custom-grey">{serviceName}</div>
                    </div>

                    <div className="flex mt-6 mb-8 -ml-10 w-3/4 h-12">
                        <div className="font-outfit text-lg text-custom-grey">{description}</div>
                    </div>
                    <div className="flex mt-4 justify-center w-full pb-4">
                        <button onClick={onSelect}
                            className={`flex items-center transition-all duration-700 justify-center -ml-10 w-2/3 h-10 rounded-md border ${styles.borderColor} ${styles.hoverBackColor} group`}
                        >
                        <span
                            className={`font-outfit transition-all duration-700 font-medium group-hover:text-black ${styles.textColor}`}>
                            {"Select"}
                        </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SelectTrigger = ({onTriggerSelect, isModalOpen}) => {

    const [searchInput, setSearchInput] = useState('');
    const getMatchingTriggers = () => {
        return triggers
            .filter(service => service.serviceName.toLowerCase().includes(searchInput.toLowerCase()) || service.description.toLowerCase().includes(searchInput.toLowerCase()))
            .sort((a, b) => {
                let aMatch = a.serviceName.toLowerCase().indexOf(searchInput.toLowerCase());
                let bMatch = b.serviceName.toLowerCase().indexOf(searchInput.toLowerCase());
                return aMatch - bMatch;
            });
    };

    const getNonMatchingTriggers = () => {
        return triggers
            .filter(service => !service.serviceName.toLowerCase().includes(searchInput.toLowerCase()) && !service.description.toLowerCase().includes(searchInput.toLowerCase()));
    };

    const displayedTriggers = getMatchingTriggers();
    const nonDisplayedTriggers = getNonMatchingTriggers();

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
                    {displayedTriggers.map((service, index) => (
                        <div key={index} className="flex items-center justify-center h-60 rounded bg-gray-50 dark:bg-box-color border border-contrast-box-color w-full hover:border-light-purple hover:scale-105 transition-all duration-300">
                            <TriggerCard serviceName={service.serviceName} description={service.description} onSelect={() => onTriggerSelect(service)} />
                        </div>
                    ))}
                    {nonDisplayedTriggers.map((service, index) => (
                        <div key={index} className="flex items-center justify-center h-60 rounded bg-black text-white dark:bg-box-color border border-contrast-box-color w-full opacity-50">
                            <TriggerCard serviceName={service.serviceName} description={service.description} onSelect={() => onTriggerSelect(service)}/>
                        </div>
                    ))}
            </div>
        </div>
    )
}

const TriggerModal = ({trigger, onClose, onCreate}) => {

    const [workflowName, setWorkflowName] = useState('');
    const [workflowDescription, setWorkflowDescription] = useState('');

    return (
        <div className="flex fixed z-50 md:inset-0 w-full h-full">
            <div className="flex justify-center items-center relative p-4 w-full h-full">
                <div className="flex relative bg-white rounded-lg shadow dark:bg-background w-1/2 h-1/2 border border-contrast-box-color">
                    <div className="flex flex-row w-full h-full pl-8 pt-4">
                        <div className={`w-1 h-2/4 rounded-md bg-vertical-purple-gradient`}></div>
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-row w-full">
                                <span className="font-outfit text-2xl font-bold text-custom-grey pt-2 pl-8">{"Create Workflow"}</span>
                                <button onClick={onClose} type="button" className="text-custom-grey bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-light-purple dark:hover:bg-background mr-4" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="flex flex-col w-full h-full items-center justify-center mb-8">
                                <div className="space-y-4">
                                <LittleInputBox placeholder={"Name"} value={workflowName} onChange={setWorkflowName}/>
                                <LargeInputBox placeholder={"Description"} value={workflowDescription} onChange={setWorkflowDescription}/>
                                </div>
                                <div className="absolute flex flex-row space-x-8 items-center bottom-6">
                                <button onClick={() => onCreate(trigger, workflowName, workflowDescription)} className="flex items-center w-28 h-10 rounded-md border border-light-purple bg-light-purple hover:bg-contrast-box-color group justify-center transition-all duration-300">
                                    <span className="font-outfit transition-all duration-300 font-medium text-dark-purple group-hover:text-white">{"Create"}</span>
                                </button>
                                <button onClick={onClose} className="flex items-center w-28 h-10 rounded-md border border-light-purple hover:bg-light-purple bg-contrast-box-color group justify-center transition-all duration-300">
                                    <span className="font-outfit transition-all duration-300 font-medium group-hover:text-dark-purple text-white">{"Cancel"}</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AutomateContent()
{
    const location = useLocation();const [isSelectingTrigger, setIsSelectingTrigger] = useState(false);
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workflowName, setWorkflowName] = useState('');
    const [workflowDescription, setWorkflowDescription] = useState('');
    const {workflowId, setWorkflowId} = useWorkflowContext();


    useEffect(() => {
        const id = location.state?.workflowID;
        if (id && id !== 'new') {
            setWorkflowId(id);
            // Fetch API
        } else {
            setIsSelectingTrigger(true);
        }
    }, [location.state]);

    const handleTriggerSelect = (trigger) => {
        setSelectedTrigger(trigger);
        setIsModalOpen(true);
    };

    const handleCreateWorkflow = (trigger, newWorkflowName, newWorkFlowDescription) => {
        setWorkflowId('0');
        setIsSelectingTrigger(false);
        setIsModalOpen(false);
        setWorkflowName(newWorkflowName);
        setWorkflowDescription(newWorkFlowDescription);

        console.log(newWorkflowName, newWorkFlowDescription)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (workflowId) {
        console.log(workflowName, workflowDescription)
        return (
                <div className="flex mt-14 w-full h-full">
                <GraphEditor startingTrigger={selectedTrigger} workflowId={workflowId} workflowName={workflowName} workflowDescription={workflowDescription} />
                </div>
        );
    }

    if (isSelectingTrigger) {
        return (
            <div className="flex p-4 mt-14 w-full h-full">
                <SelectTrigger onTriggerSelect={handleTriggerSelect} isModalOpen={isModalOpen}/>
                {isModalOpen && (<TriggerModal trigger={selectedTrigger} onClose={handleCloseModal} onCreate={handleCreateWorkflow}/>)}
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
            <div className="bg-background h-full w-full">
                <AppNavBar isSidebarExpanded={sidebarExpanded} onToggleSidebar={setSidebarExpanded} currentPage={"automate"}/>
                <div className={`flex flex-col transition-all transition-300 ${sidebarExpanded ? 'ml-40' : 'ml-14'}`}>
                   <AutomateContent/>
                </div>
            </div>
        </>
    );
}
