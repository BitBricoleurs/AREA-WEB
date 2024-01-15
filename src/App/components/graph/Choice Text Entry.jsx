import React, {useState, useRef, useEffect} from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

import { useWorkflowContext } from '../../context/workflowContext.jsx';

const ChoiceTextEntry = ({ data, object, setObject }) => {
    const [selected, setSelected] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputHeight = useRef(0);

    useEffect(() => {
        const paramValue = object?.params?.[data.variableName];
        const conditionValue = object?.conditions?.find(cond => cond.key === data.variableName)?.value;

        if (paramValue !== undefined) {
            setInputValue(paramValue);
            setSelected(true);
        } else if (conditionValue !== undefined) {
            setInputValue(conditionValue);
            setSelected(true);
        }
    },[]);

    useEffect(() => {
        inputHeight.current = selected ? 48 : 0;
    }, [selected]);

    if (!object) {
        console.error("Object is undefined in ChoiceTextEntry");
        return null;
    }

    const params = object.params || [];
    const condition = object.conditions || [];

    const handleSelectPress = () => {
        setSelected(!selected);
        if (data.type === "parameter") {
            if (selected) {
                delete object.params[data.variableName];
            } else {
                object.params[data.variableName] = "";
            }
        } else {
            if (selected) {
                    const index = object.conditions.findIndex(cond => cond.key === data.variableName);
                    if (index !== -1) {
                        object.conditions.splice(index, 1);
                    }
                } else {
                    object.conditions.push({ key: data.variableName, value: "", type: data.conditionType });
                }
            }

            setObject({ ...object });
        };

    const handleChange = (text) => {
        if (data.type === "parameter") {
            object.params[data.variableName] = text;
        } else {
            const conditionIndex = object.conditions.findIndex(cond => cond.key === data.variableName);
            if (conditionIndex !== -1) {
                object.conditions[conditionIndex] = { ...object.conditions[conditionIndex], value: text };
            } else {
                object.conditions.push({ key: data.variableName, value: text, type: data.conditionType });
            }
        }
        setObject({ ...object });
    };


    return (
        <div className="flex flex-col rounded-xl">
            <button
                className="flex flex-row justify-between items-center h-8"
                onClick={handleSelectPress}
            >
                <div className="font-outfit text-[12px] font-medium text-white">
                    {data.label}
                </div>
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
            {selected && <div className="w-full h-[1px] bg-gray-600" />}
            <div className={`transition-height duration-300 ease-in-out flex items-center ${selected ? 'h-8' : 'h-0' } overflow-hidden`}>
                {selected && (
                    <AutocompleteInput
                        className="text-custom-grey w-full placeholder:text-custom-grey bg-background text-[10px] pl-2 outline-none"
                        onChange={handleChange}
                        placeholder={data.placeholder}
                        value={inputValue}
                    />
                )}
            </div>
        </div>
    );
};

export default ChoiceTextEntry;
