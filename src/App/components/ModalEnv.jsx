import React, {useState} from "react";
import {useWorkflowContext} from "../context/workflowContext.jsx";
import Draggable from "react-draggable";
import {useContextLogin} from "../context/loginContext.jsx";

const ModalEnv = ({onClose}) => {

    const {ip, setIp} = useContextLogin()

    return (
        <Draggable handle=".handle">
        <div className="flex fixed z-20 md:inset-0 w-full h-full">
            <div className="flex justify-center items-center relative p-4 w-full h-full">
                    <div className="flex relative rounded-lg self-center shadow bg-background w-1/3 h-1/3 border border-contrast-box-color ">
                        <div className="handle flex flex-row w-full h-full pl-8 pt-4">
                            <div className={`w-1 h-2/4 rounded-md bg-vertical-purple-gradient`}></div>
                            <div className="flex flex-col w-full h-full">
                                <div className="flex flex-row w-full">
                                    <span className="font-outfit text-2xl font-bold text-white pt-2 pl-8">{"Select API URL"}</span>
                                    <button onClick={onClose} type="button" className="text-custom-grey bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-light-purple dark:hover:bg-background mr-4" data-modal-hide="default-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="flex flex-col w-full h-full items-center mt-24 pl-8 pr-6">
                                    <input
                                        className="w-3/4 h-10 rounded-md bg-box-color text-custom-grey border border-contrast-box-color pl-4 mb-16 outline-none focus:ring-1 focus:ring-light-purple"
                                        type="text" placeholder="Enter API URL" value={ip}
                                        onChange={(e) => setIp(e.target.value)}/>
                                    <button onClick={onClose} type="button"
                                            className="group text-black bg-light-purple rounded-lg text-sm w-1/4 h-10 m-6 inline-flex justify-center items-center hover:text-light-purple hover:bg-background border border-light-purple"
                                            data-modal-hide="default-modal">
                                        <span
                                            className="font-outfit text-sm font-medium text-box-color group-hover:text-light-purple group-focus:text-light-purple"
                                        >{"Save"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </Draggable>
    )
}

export default ModalEnv;