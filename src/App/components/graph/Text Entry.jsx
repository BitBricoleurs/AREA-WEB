import React, { useState, useEffect } from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

const TextEntry = ({ data, object, setObject }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const condition = object.conditions?.find(cond => cond.key === data.variableName);
        if (condition) {
            setInputValue(condition.value);
        } else {
            setInputValue(object.params?.[data.variableName] || "");
        }
    }, [object, data.variableName]);

    const handleChange = (text) => {
        setInputValue(text);
        const conditionIndex = object.conditions?.findIndex(cond => cond.key === data.variableName);

        if (conditionIndex > -1) {
            const updatedConditions = object.conditions.map((cond, index) =>
                index === conditionIndex ? { ...cond, value: text } : cond
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
                    [data.variableName]: text
                }
            });
        }
    };

    return (
        <div className="bg-background rounded-lg h-8">
            <AutocompleteInput
                className="font-outfit text-[12px] font-medium text-white bg-transparent h-full w-full outline-none"
                onChange={(text) => handleChange(text)}
                placeholder={data.placeholder}
            />
        </div>
    );
};

export default TextEntry;
