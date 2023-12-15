import React, {useState, useRef, useEffect} from "react";

import {useWorkflowContext} from "/src/App/context/workflowContext.jsx"

const ChoiceTextEntry = ({data, object, setObject}) => {
    const [selected, setSelected] = useState(false);
    const inputHeight = useRef(0);

    const {variables} = useWorkflowContext();

    const handleSelectPress = () => {
        setSelected(!selected);
        const element = data.type === "parameter" ? "params" : "conditions";
        let elementData = data.type === "parameter" ? {} : [];
        if (!selected === false) {
            if (element === "params") {
                elementData = {...object.params};
                delete elementData[data.variableName];
            } else {
                const variableId = variables.find(
                    (variable) => variable.name === data.variableName
                ).id;
                elementData = [...object.conditions];
                const index = elementData.findIndex(
                    (condition) => condition.key === variableId
                );
                elementData.splice(index, 1);
            }
            setObject({
                ...object,
                [element]: elementData,
            });
        }
    };

    const handleChange = (text) => {
        let element = data.type === "parameter" ? "params" : "conditions";
        let elementData = data.type === "parameter" ? {} : [];
        if (text === "") {
            if (element === "params") {
                elementData = {...object.params};
                elementData[data.variableName];
            } else {
                const variableId = variables.find(
                    (variable) => variable.name === data.variableName
                ).id;
                elementData = [...object.conditions];
                const index = elementData.findIndex(
                    (condition) => condition.key === variableId
                );
                elementData.splice(index, 1);
            }
        } else {
            if (element === "params") {
                elementData = {
                    ...object.params,
                    [data.variableName]: text,
                };
            } else {
                const variableId = variables.find(
                    (variable) => variable.name === data.variableName
                ).id;
                elementData = [...object.conditions];

                const conditionIndex = elementData.findIndex(
                    (condition) => condition.key === variableId
                );

                if (conditionIndex !== -1) {
                    elementData[conditionIndex] = {
                        ...elementData[conditionIndex],
                        value: text,
                    };
                } else {
                    elementData.push({
                        key: variableId,
                        type: data.conditionType,
                        value: text,
                    });
                }
            }
        }
        setObject({
            ...object,
            [element]: elementData,
        });
    };


    useEffect(() => {
        inputHeight.current = selected ? 48 : 0;
    }, [selected]);
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
                    <input
                        className=" text-custom-grey w-full placeholder:text-custom-grey bg-background text-[10px] pl-2 outline-none"
                        type="text"
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder={data.placeholder}
                    />
                )}
            </div>
        </div>
    );
};

export default ChoiceTextEntry;
