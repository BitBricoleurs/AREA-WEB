import React, {useEffect, useState} from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

import { useWorkflowContext } from '../../context/workflowContext.jsx';

const TextArrayEntry = ({ data, object, setObject }) => {
    const [selected, setSelected] = useState(false);
    const [emailEntries, setEmailEntries] = useState([""]);

    useEffect(() => {
        let existingEntries = [];
        const prefix = `${data.variableName}_`;
        if (object?.params) {
            for (const key of Object.keys(object.params)) {
                console.log("key: ", key)
                if (key.startsWith(prefix)) {
                    existingEntries.push(object.params[key]);
                }
            }
        }
        if (object?.conditions) {
            object.conditions.forEach((cond) => {
                console.log("cond: ", cond)
                if (cond.key.startsWith(prefix)) {
                    existingEntries.push(cond.value);
                }
            });
        }
        if (existingEntries.length > 0) {
            setSelected(true);
            setEmailEntries([...existingEntries, ""]);
        }
    }, []);

    const updateObject = (newEntries) => {
        let updatedConditions = [];
        let updatedParams = { ...object.params };
        newEntries.forEach((entry, index) => {
            const entryKey = `${data.variableName}_${index}`;
            if (entry.trim() !== "") {
                if (data.type === 'condition') {
                    updatedConditions.push({
                        key: entryKey,
                        value: entry,
                        type: data.conditionType
                    });
                } else {
                    updatedParams[entryKey] = entry;
                }
            }
        });
        if (data.type === 'condition') {
            setObject({
                ...object,
                conditions: updatedConditions,
            });
        } else {
            setObject({
                ...object,
                params: updatedParams,
            });
        }
    };

    const handleSelectPress = () => {
        setSelected(!selected);

        if (!selected) {
            setObject({
                ...object,
                conditions: []
            });
        }
    };

    const handleChange = (text, index) => {

        let updatedEntries = [...emailEntries];
        updatedEntries[index] = text;

        if (index === emailEntries.length - 1 && text.trim() !== "") {
            updatedEntries.push("");
        }

        if (text === "" && emailEntries.length > 1) {
            updatedEntries.splice(index, 1);
        }
        setEmailEntries(updatedEntries);
        updateObject(updatedEntries);
        console.log("emailEntries: ", emailEntries)
    };
    const handleRemoveEntry = (index) => {
        if (emailEntries.length > 1) {
            let updatedEntries = [...emailEntries];
            updatedEntries[index] = "";
            updatedEntries = emailEntries.filter((_, i) => i !== index);
            setEmailEntries(updatedEntries);
            updateObject(updatedEntries);
        }
    };

    console.log("emailEntries: ", emailEntries)

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
                             className="flex flex-row justify-between items-center h-8">
                            <AutocompleteInput
                                className="text-custom-grey w-full placeholder:text-custom-grey bg-background text-[10px] pl-2 outline-none"
                                onChange={(text) => handleChange(text, index)}
                                placeholder={data.placeholder}
                                value={entry}
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
