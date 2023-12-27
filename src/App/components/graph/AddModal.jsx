import React, {useState} from "react";
import SearchBar from "../SearchBar.jsx";
import {actions, cardServicesStyles} from "/src/constants/index.js";
import Draggable from 'react-draggable';


const ActionCard = ({serviceName, description, onSelect}) => {

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


const ActionModal = ({onClose, onSelectAction, onSelectCondition, clickedNode}) => {

    const [searchInput, setSearchInput] = useState("");
    return (
        <div className="flex fixed z-50 md:inset-0 w-full h-full">
            <div className="flex justify-center items-center relative p-4 w-full h-full">
                <Draggable>
                <div className="flex relative bg-white rounded-lg self-center hadow dark:bg-background w-3/4 h-3/4 border border-contrast-box-color">
                    <div className="flex flex-row w-full h-full pl-8 pt-4">
                        <div className={`w-1 h-2/4 rounded-md bg-vertical-purple-gradient`}></div>
                        <div className="flex flex-col w-full h-full">
                            <div className="flex flex-row w-full">
                                <span className="font-outfit text-2xl font-bold text-custom-grey pt-2 pl-8">{"Select New Action"}</span>
                                <button onClick={onClose} type="button" className="text-custom-grey bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-light-purple dark:hover:bg-background mr-4" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="flex flex-col w-full h-full items-center justify-center mb-8 pl-8 pr-6">
                                <SearchBar searchPlaceHolder={"Actions"}  searchInput={searchInput} setSearchInput={setSearchInput} />
                                <div className="overflow-y-scroll h-full w-full my-4 mb-14 rounded-lg">
                                    <div className={"grid gap-6 grid-cols-3"}>
                                        {actions.map((service, index) => (
                                            <div key={index}
                                                 className="flex items-center justify-center h-full rounded bg-gray-50 dark:bg-box-color border border-contrast-box-color w-full hover:border-light-purple transition-all duration-300">
                                                <ActionCard serviceName={service.serviceName}
                                                            description={service.description}
                                                            onSelect={() => onSelectAction(service, clickedNode)}/>
                                            </div>
                                        ))}
                                        <div key={"system"}
                                             className="flex items-center justify-center h-full rounded bg-gray-50 dark:bg-box-color border border-contrast-box-color w-full hover:border-light-purple transition-all duration-300">
                                            <ActionCard serviceName={"System"}
                                                        description={"Conditions"}
                                                        onSelect={() => onSelectCondition({serviceName: "System", description : "Conditions"}, clickedNode)}/>
                                        </div>
                                    </div>
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

export default ActionModal;