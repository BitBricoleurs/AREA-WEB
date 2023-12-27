import React, { useEffect, useRef, useState } from 'react';
import VariableTable from "./graph/VariableTable.jsx";
import { useWorkflowContext } from '../context/workflowContext.jsx';


const SideBarSettings = ({ onClose, startClosing, node, updateNodePosition }) => {

    const truncateToTwoDecimals = (num) => Math.floor(num * 100) / 100;
    const {workflow } = useWorkflowContext();
    const currentNodeWorkflow = workflow.find((n) => n.id === node.id);

    const [position, setPosition] = useState({
        x: truncateToTwoDecimals(node.position.x),
        y: truncateToTwoDecimals(node.position.y),
    });

    useEffect(() => {
        setPosition(node.position);
    }, [node]);

    const handlePositionChange = (axis, value) => {
        const numValue = truncateToTwoDecimals(parseFloat(value));
        setPosition((prev) => ({
            ...prev,
            [axis]: isNaN(numValue) ? '' : numValue,
        }));

        const newPosition = { ...position, [axis]: isNaN(numValue) ? 0 : numValue };
        updateNodePosition(node.id, newPosition);
    };

    const sidebarRef = useRef();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (startClosing) {
            setIsAnimating(false);
            setTimeout(() => {
                onClose();
            }, 700);
        } else {
            setIsAnimating(true);
        }
    }, [startClosing, onClose]);

    return (
        <div
            ref={sidebarRef}
            className={`fixed top-0 right-0 z-50 mt-14 w-64 h-full p-4 overflow-y-auto bg-white dark:bg-box-color transform transition-transform ease-in-out duration-700 border border-contrast-box-color ${
                isAnimating ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row w-full ">
                    <button onClick={() => {console.log('damn')}} type="button" className="text-custom-grey bg-transparent rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:text-light-purple dark:hover:bg-background" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    <span className="flex text-xl font-light text-custom-grey pl-6 ">{"Node Settings"}</span>
                </div>
                <div className="flex flex-col w-full mt-24 pb-24 group">
                    <div className="flex flex-row w-full items-center pb-8">
                        <span className="flex text-sm font-light text-custom-grey group-hover:text-light-purple mr-4">{"Position"}</span>
                        <div className="bg-contrast-box-color h-0.5 w-full"/>
                    </div>
                    <div className="flex flex-row w-full items-center">
                        <div className="flex flex-col w-1/2">
                            <span className="flex text-sm font-light text-custom-grey mr-4 mb-1">{"X"}</span>
                            <input className="text-custom-grey bg-background text-[10px] pl-2 outline-none px-4 py-2 w-3/4 rounded-lg" placeholder="0"
                                   value={position.x}
                                   onChange={(e) => handlePositionChange('x', e.target.value)}/>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span className="flex text-sm font-light text-custom-grey mr-4 mb-1">{"Y"}</span>
                            <input className="text-custom-grey bg-background text-[10px] pl-2 outline-none px-4 py-1.5 w-3/4 rounded-lg" placeholder="0"
                                      value={position.y}
                                   onChange={(e) => handlePositionChange('y', e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full group pb-64">
                    <div className="flex flex-row w-full items-center pb-8">
                        <span className="flex text-sm font-light text-custom-grey group-hover:text-light-purple mr-4">{"Variables"}</span>
                        <div className="bg-contrast-box-color h-0.5 w-full"/>
                    </div>
                    <div className="flex flex-row w-full items-center">
                        <VariableTable nodeId={node.id}  currentWorkflow={currentNodeWorkflow}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SideBarSettings;
