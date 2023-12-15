import {Handle, Position} from "reactflow";
import React from "react";

function AddNode({onAddClick}) {
    return (
        <div className={"flex border border-contrast-box-color w-12 h-12 bg-box-color rounded-md hover:border-light-purple hover:border hover:bg-contrast-box-color group"}>
            <button onClick={onAddClick} className="rounded-full w-12 h-12 flex justify-center items-center group-hover:text-light-purple text-custom-grey">
                <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_197_2010)">
                        <path className="stroke-white stroke-1 group-hover:stroke-light-purple" d="M12.5 1.46143V24.6757" strokeLinecap="round" strokeLinejoin="round"/>
                        <path className="stroke-white stroke-1 group-hover:stroke-light-purple" d="M0.892578 12.9971H24.1069" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>

            </button>

            <Handle type="target" position={Position.Top} className="bg-light-purple w-4 rounded-md" />
        </div>
    );
}

export default AddNode;