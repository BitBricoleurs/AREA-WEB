import React, {useEffect, useState} from 'react';
import { useWorkflowContext } from '../../context/workflowContext.jsx';
import Spinner from "../SucessSpinner.jsx";
import Draggable from 'react-draggable';


const InteractBurger = () => {

    const [showBox, setShowBox] = useState(false);
    const [saveStatus, setSaveStatus] = useState('idle');



    const handleToggle = () => {
        setShowBox(!showBox);
    };

    const {workflowName, workflowDescription, setWorkflowName, setWorkflowDescription, workflow, variables, editWorkflow} = useWorkflowContext();

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
        setSaveStatus('loading');
        try {
            await editWorkflow();
            setSaveStatus('success');
        } catch (error) {
            setSaveStatus('failed');
        }
    }


    return (
        <Draggable>
        <div
            className={`fixed right-0 mt-4 mr-4 z-10 transition-all duration-500 ease-in-out w-80 bg-custom-dark-blue rounded-lg`}>
            <button className="flex flex-row items-center w-full py-1.5 px-3 group"
                    onClick={handleToggle}>
                <svg className={"h-6 w-6"} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
                          fill="#898A8A"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M8.72995 4.54104C8.72995 3.13766 9.86761 2 11.271 2H12.7296C14.133 2 15.2707 3.13766 15.2707 4.54104C15.2707 4.74442 15.4109 5.01577 15.7461 5.19782C15.8493 5.25384 15.951 5.31209 16.0513 5.37252C16.3856 5.57406 16.6994 5.56113 16.8837 5.45569C18.1075 4.75547 19.667 5.17332 20.3767 6.39162L21.0812 7.60076C21.7923 8.8214 21.3726 10.3877 20.1465 11.0892C19.9687 11.1909 19.8015 11.4496 19.8097 11.8346C19.8108 11.8896 19.8114 11.9448 19.8114 12C19.8114 12.0552 19.8108 12.1104 19.8097 12.1654C19.8015 12.5504 19.9687 12.8091 20.1464 12.9108C21.3726 13.6123 21.7922 15.1786 21.0811 16.3992L20.3767 17.6084C19.6669 18.8267 18.1074 19.2445 16.8837 18.5443C16.6994 18.4389 16.3856 18.4259 16.0513 18.6275C15.951 18.6879 15.8493 18.7462 15.7461 18.8022C15.4109 18.9842 15.2707 19.2556 15.2707 19.459C15.2707 20.8623 14.133 22 12.7296 22H11.271C9.86761 22 8.72995 20.8623 8.72995 19.459C8.72995 19.2556 8.58969 18.9842 8.25449 18.8022C8.15134 18.7462 8.04961 18.6879 7.94937 18.6275C7.61506 18.4259 7.30123 18.4389 7.11697 18.5443C5.89318 19.2445 4.33369 18.8267 3.62394 17.6084L2.9195 16.3992C2.2084 15.1786 2.62806 13.6123 3.85419 12.9108C4.03196 12.8091 4.1991 12.5504 4.19095 12.1654C4.18979 12.1104 4.18921 12.0553 4.18921 12C4.18921 11.9448 4.18979 11.8896 4.19095 11.8346C4.1991 11.4497 4.03195 11.191 3.85417 11.0892C2.62802 10.3877 2.20836 8.82141 2.91948 7.60077L3.6239 6.39163C4.33365 5.17333 5.89314 4.75548 7.11694 5.4557C7.30121 5.56113 7.61504 5.57407 7.94936 5.37253C8.0496 5.3121 8.15133 5.25384 8.25449 5.19782C8.58969 5.01577 8.72995 4.74442 8.72995 4.54104ZM11.271 4C10.9722 4 10.7299 4.24223 10.7299 4.54104C10.7299 5.64708 10.0245 6.51246 9.209 6.95535C9.13224 6.99703 9.05653 7.04039 8.98192 7.08537C8.18645 7.5649 7.08444 7.74134 6.12369 7.19163C5.85333 7.03694 5.50882 7.12925 5.35202 7.39839L4.6476 8.60754C4.49558 8.86848 4.58529 9.20332 4.84742 9.3533C5.80973 9.90391 6.21014 10.9487 6.19051 11.8769C6.18964 11.9178 6.18921 11.9589 6.18921 12C6.18921 12.0412 6.18964 12.0822 6.19051 12.1231C6.21014 13.0513 5.80974 14.0961 4.84744 14.6467C4.58533 14.7967 4.49562 15.1315 4.64763 15.3924L5.35207 16.6016C5.50886 16.8708 5.85337 16.9631 6.12372 16.8084C7.08446 16.2587 8.18646 16.4351 8.98192 16.9146C9.05654 16.9596 9.13224 17.003 9.209 17.0447C10.0245 17.4875 10.7299 18.3529 10.7299 19.459C10.7299 19.7578 10.9722 20 11.271 20H12.7296C13.0285 20 13.2707 19.7578 13.2707 19.459C13.2707 18.3529 13.9762 17.4875 14.7916 17.0447C14.8684 17.003 14.9441 16.9596 15.0187 16.9146C15.8142 16.4351 16.9162 16.2587 17.8769 16.8084C18.1473 16.9631 18.4918 16.8708 18.6486 16.6016L19.353 15.3924C19.505 15.1315 19.4153 14.7967 19.1532 14.6467C18.1909 14.0961 17.7905 13.0513 17.8101 12.1231C17.811 12.0822 17.8114 12.0412 17.8114 12C17.8114 11.9589 17.811 11.9178 17.8101 11.8769C17.7905 10.9487 18.1909 9.9039 19.1532 9.35329C19.4153 9.20331 19.5051 8.86848 19.353 8.60753L18.6486 7.39839C18.4918 7.12924 18.1473 7.03693 17.8769 7.19162C16.9162 7.74134 15.8142 7.5649 15.0187 7.08536C14.9441 7.04039 14.8684 6.99703 14.7916 6.95535C13.9762 6.51246 13.2707 5.64708 13.2707 4.54104C13.2707 4.24223 13.0285 4 12.7296 4H11.271Z"
                          fill="#898A8A"/>
                </svg>
                <p className={"text-custom-grey font-outfit text-[20px] pl-2 font-light"}>Graph Settings</p>
                <div
                    className="flex flex-col ms-auto justify-center  bg-contrast-box-color rounded-lg dark:bg-box-color"

                >
                    <svg className={` -rotate-90 group-hover:rotate-0 transition-all duration-500`} width="22"
                         height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289Z"
                              fill="#A9A9A9"/>
                    </svg>
                </div>
            </button>
            <div
                className={`flex flex-col bg-custom-darker-blue pt-1 overflow-hidden transition-all duration-1000 ease-in-out items-center ${showBox ? 'max-h-[350px]' : 'max-h-0'}`}>
                <div className="flex flex-row space-x-2 p-4">
                    <div className="flex flex-col w-[120px]">
                        <p className="text-custom-grey font-outfit text-[14px] pl-2 font-light pt-2">Workflow Name</p>
                        <p className="text-custom-grey font-outfit text-[14px] pl-2 font-light pt-8">Workflow Description</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <input
                            className="rounded-lg font-outfit text-[14px] font-medium  bg-custom-light-blue h-9 w-40 outline-none text-custom-grey pl-2"
                            value={workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                            disabled={!showBox}
                        />
                        <input
                            className="rounded-lg font-outfit text-[14px] font-medium  bg-custom-light-blue h-20 w-40 outline-none text-custom-grey pl-2"
                            value={workflowDescription}
                            onChange={(e) => setWorkflowDescription(e.target.value)}
                            disabled={!showBox}
                        />
                    </div>
                </div>
                <button
                    className="flex flex-col justify-center items-center w-1/3 h-8 mt-2 hover:bg-contrast-box-color rounded-lg bg-light-purple group transition-all duration-300"
                    onClick={handleSave}>
                    {saveStatus !== 'idle' ? (
                        <Spinner contrast="white" status={saveStatus}/>
                    ) : (
                        <span
                            className="font-outfit text-sm font-medium text-background group-hover:text-light-purple group-focus:text-light-purple">
                                 {"Save"}
                            </span>
                    )}
                </button>
                <button
                    className={"flex flex-row justify-center items-center w-1/3 group mt-1 mb-2 transition-all duration-300 space-x-1"}
                    onClick={downloadJson}>
                    <svg className="opacity-60 fill-light-purple group-hover:opacity-100" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path  fillRule="evenodd" clipRule="evenodd"
                              d="M1.5 7.125C1.70711 7.125 1.875 7.2929 1.875 7.5C1.875 8.2177 1.8758 8.71825 1.92658 9.09595C1.9759 9.46285 2.06613 9.6571 2.20451 9.7955C2.34289 9.9339 2.53718 10.0241 2.90406 10.0735C3.28174 10.1242 3.7823 10.125 4.5 10.125H7.5C8.2177 10.125 8.71825 10.1242 9.09595 10.0735C9.46285 10.0241 9.6571 9.9339 9.7955 9.7955C9.9339 9.6571 10.0241 9.46285 10.0735 9.09595C10.1242 8.71825 10.125 8.2177 10.125 7.5C10.125 7.2929 10.2929 7.125 10.5 7.125C10.7071 7.125 10.875 7.2929 10.875 7.5V7.52745C10.875 8.21125 10.875 8.7624 10.8167 9.1959C10.7562 9.64595 10.6268 10.0248 10.3258 10.3258C10.0248 10.6268 9.64595 10.7562 9.1959 10.8167C8.7624 10.875 8.21125 10.875 7.52745 10.875H4.47257C3.78877 10.875 3.23761 10.875 2.80413 10.8167C2.35407 10.7562 1.97514 10.6268 1.67418 10.3258C1.37322 10.0248 1.24377 9.64595 1.18326 9.1959C1.12498 8.7624 1.12499 8.21125 1.125 7.52745C1.125 7.5183 1.125 7.50915 1.125 7.5C1.125 7.2929 1.2929 7.125 1.5 7.125Z"
                             />
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M6 8.375C6.1053 8.375 6.2057 8.33075 6.27675 8.25305L8.27675 6.06555C8.4165 5.9127 8.4059 5.6755 8.25305 5.53575C8.1002 5.396 7.863 5.4066 7.72325 5.55945L6.375 7.0341V1.5C6.375 1.2929 6.2071 1.125 6 1.125C5.7929 1.125 5.625 1.2929 5.625 1.5V7.0341L4.27677 5.55945C4.13702 5.4066 3.89982 5.396 3.74697 5.53575C3.59412 5.6755 3.58349 5.9127 3.72324 6.06555L5.72325 8.25305C5.7943 8.33075 5.8947 8.375 6 8.375Z"
                             />
                    </svg>

                    <p className={"font-outfit text-[12px] font-medium text-light-purple opacity-60 group-hover:opacity-100"}>Download</p>
                </button>

            </div>
        </div>
        </Draggable>
    );
};

export default InteractBurger;
