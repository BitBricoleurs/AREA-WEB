import React, { useState, useEffect } from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

const DateSelector = ({ data, object, setObject }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    console.log("DateSelector", data, object);
    useEffect(() => {
        const startCondition = object?.conditions?.find(cond => cond.key === `${data.variableName}Start`);
        const endCondition = object?.conditions?.find(cond => cond.key === `${data.variableName}End`);

        if (startCondition) {
            setStartDate(startCondition.value);
        } else {
            setStartDate(object?.params?.[`${data.variableNameFirst}`] || "");
        }

        if (endCondition) {
            setEndDate(endCondition.value);
        } else {
            setEndDate(object?.params?.[`${data.variableNameSecond}`] || "");
        }
    }, [object]);

    const handleStartChange = (text) => {
        setStartDate(text);
        updateObject(`${data.variableNameFirst}`, text);
    };

    const handleEndChange = (text) => {
        setEndDate(text);
        updateObject(`${data.variableNameSecond}`, text);
    };

    const updateObject = (key, value) => {
        const conditionIndex = object?.conditions?.findIndex(cond => cond.key === key);
        if (conditionIndex > -1) {
            const updatedConditions = object?.conditions.map((cond, index) =>
                index === conditionIndex ? { ...cond, value: value } : cond
            );

            setObject({
                ...object,
                conditions: updatedConditions
            });
        } else {
            setObject({
                ...object,
                params: {
                    ...object.params,
                    [key]: value
                }
            });
        }
    };

    return (
        <div className="flex flex-row space-x-2 items-center">
            <div className="flex items-center">
                <div className="bg-black rounded-lg -ml-1.5 h-8 flex-1 my-0.5">
                    <AutocompleteInput
                        className="font-outfit text-[10px] pl-1 bg-transparent font-medium text-white h-full w-full outline-none"
                        onChange={handleStartChange}
                        placeholder={data.placeholderFirst}
                        value={startDate}
                    />
                </div>
            </div>
            <span className="text-white font-outfit text-[12px] font-medium">to</span>
            <div className="flex items-center">
                <div className="bg-black rounded-lg h-8 flex-1 my-0.5 mr-0.5">
                    <AutocompleteInput
                        className="font-outfit text-[10px] pl-1 bg-transparent font-medium text-white h-full w-full outline-none"
                        onChange={handleEndChange}
                        placeholder={data.placeholderSecond}
                        value={endDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateSelector;
