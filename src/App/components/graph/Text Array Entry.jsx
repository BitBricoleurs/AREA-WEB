import React, {useState} from "react";

import {useWorkflowContext} from "/src/App/context/workflowContext.jsx"

const TextArrayEntry = ({data, object, setObject}) => {
    const [selected, setSelected] = useState(false);
    const [emailEntries, setEmailEntries] = useState([""]);
    const {variables} = useWorkflowContext();

    const updateObjectParams = (newEntries) => {
        const emails = newEntries.filter((entry) => entry.trim() !== "");
        setObject({
            ...object,
            params: {
                ...object.params,
                [data.variableName]: emails,
            },
        });
    };

    const handleSelectPress = () => {
        setSelected(!selected);
        const element = data.type === "parameter" ? "params" : "conditions";

        if (!selected === false) {
            let newElementData;
            if (element === "params") {
                newElementData = {...object.params};
                delete newElementData[data.variableName];
            } else {
                const variableId = variables.find(
                    (variable) => variable.name === data.variableName
                ).id;
                newElementData = object.conditions.filter(
                    (condition) => condition.key !== variableId
                );
            }
            setObject({
                ...object,
                [element]: newElementData,
            });
        }
    };

    const handleChange = (text, index) => {
        const updatedEntries = [...emailEntries];
        updatedEntries[index] = text;

        if (index === emailEntries.length - 1 && text.trim() !== "") {
            updatedEntries.push("");
        }
        if (text === "") {
            updatedEntries.splice(index, 1);
        }
        setEmailEntries(updatedEntries);
        updateObjectParams(updatedEntries);
    };

    const handleRemoveEntry = (index) => {
        const updatedEntries = emailEntries.filter((_, i) => i !== index);
        setEmailEntries(updatedEntries);
        updateObjectParams(updatedEntries);
    };

    return (
        <div className="flex flex-col rounded-xl">
            <button className="flex flex-row justify-between items-center h-8" onClick={handleSelectPress}>
                <div className="font-outfit text-[12px] font-medium text-white">{data.label}</div>
                <svg className={`w-4 h-4 mx-2 my-3 stroke-purple transition duration-300 ease-in-out ${selected ? 'opacity-100' : 'opacity-0'}`}
                     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                       strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path  className={"stroke-light-purple"} d="M4 12.6111L8.92308 17.5L20 6.5"  strokeWidth="2"
                               strokeLinecap="round"  strokeLinejoin="round">
                        </path>
                    </g>
                </svg>
            </button>
                <div className={`flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${selected ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <div className="w-full h-[1px] bg-gray-600"/>
                    {emailEntries.map((entry, index) => (
                        <div key={index}
                             className="flex flex-row justify-between items-center h-8 ml-2">
                            <input
                                className="text-custom-grey bg-background text-[10px] flex-1 pl-2 outline-none"
                                type="email"
                                onChange={(e) => handleChange(e.target.value, index)}
                                value={entry}
                                placeholder="Email"
                            />
                            {index < emailEntries.length - 1 && (
                                <button className="self-center" onClick={() => handleRemoveEntry(index)}>
                                    <svg  className="w-4 h-4 resize-contain mx-2 my-3 text-white group hover:bg-contrast-box-color rounded-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6 12L18 12" className={"stroke-custom-grey group-hover:stroke-light-purple"} strokeWidth="2" strokeLinecap="round"
                                                  strokeLinejoin="round">
                                            </path>
                                        </g>
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default TextArrayEntry;
