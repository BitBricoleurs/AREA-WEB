import React, { useState } from 'react';
import { useWorkflowContext } from '../../context/workflowContext.jsx';

const InteractBurger = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleToggle = () => {
        if (isExpanded) {
            setIsClosing(true);
            const animationDuration = 500;
            setTimeout(() => {
                setIsExpanded(false);
                setIsClosing(false);
            }, animationDuration);
        } else {
            setIsExpanded(true);
        }
    };

    const { workflowName, workflowDescription, workflow, variables, editWorkflow } = useWorkflowContext();

    const downloadJson = () => {
        const data = {
            workflowName,
            workflowDescription,
            workflow,
            variables,
        };

        const jsonStr = JSON.stringify(data, null, 2);

        const blob = new Blob([jsonStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${workflowName}.json`;
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleSave = async () => {
        await editWorkflow();
    }

    return (
        <div className={`fixed right-0 mt-4 mr-4 z-50 transition-all duration-500 ease-in-out ${isExpanded ? 'w-1/4 h-1/4 bg-box-color bg-opacity-95 rounded-lg' : 'w-10 h-10'} ${isClosing ? 'opacity-100 scale-95' : 'opacity-100 scale-100'}`}>
        <div
            className={`fixed z-50 right-0 w-10 h-10 mr-4 ${isExpanded ? 'mt-0 ' : ''} `}
        >
            <button
                className="flex flex-col justify-center items-center w-full h-full bg-contrast-box-color rounded-lg dark:bg-box-color"
                onClick={handleToggle}
            >
                <svg className={"w-6 h-6"} viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="4" rx="2" fill="#3F3F3F"/>
                    <rect y="8" width="32" height="4" rx="2" fill="#3F3F3F"/>
                    <rect y="16" width="32" height="4" rx="2" fill="#3F3F3F"/>
                </svg>
            </button></div>
            {(isExpanded) && (
                <div className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-row  items-center w-full h-full">
                        <span className="font-outfit text-2xl font-bold text-custom-grey pt-2 pl-8">{workflowName}</span>
                    </div>
                <div className="flex flex-col justify-end pb-4 items-center w-full h-full">

                    <button className="flex flex-col justify-center items-center w-1/3 h-10 mt-4 bg-contrast-box-color rounded-lg dark:bg-box-color border border-light-purple hover:bg-light-purple group transition-all duration-300"
                    onClick={downloadJson}>
                        <span className="font-outfit text-sm font-medium text-light-purple group-hover:text-background">{"Download"}</span>
                    </button>
                    <button className="flex flex-col justify-center items-center w-1/3 h-10 mt-4 hover:bg-contrast-box-color rounded-lg bg-light-purple group transition-all duration-300"
                    onClick={handleSave}>
                        <span className="font-outfit text-sm font-medium group-hover:text-light-purple text-background">{"Save"}</span>
                    </button>
                </div>
                </div>)}
            </div>
    );
};

export default InteractBurger;
