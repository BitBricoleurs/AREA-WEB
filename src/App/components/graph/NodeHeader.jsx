import React from "react";

function NodeHeader({ color, triggerName, logo }) {
    return (
        <div className={"flex flex-col w-full h-full"}>
            <div className={`w-2/4 h-1 rounded-md ${color}`}></div>
            <div className="flex flex-row justify-between items-center space-x-12">
                <div className="flex w-1/2 flex-col" >
                    <img className="w-8 h-8 rounded-full" src={logo} alt="Logo"/>
                </div>
                <div className="flex flex-row w-3/4 p-4">
                    <span className="text-sm font-thin font-outfit text-custom-grey">{triggerName}</span>
                </div>
            </div>
        </div>
    )

}

export default NodeHeader;