import React, { useState, useEffect } from "react";
import AutocompleteInput from "./AutocompleteInput.jsx";

const TextEntry = ({ data, object, setObject }) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        console.log("Object:", object)
        console.log("Conditions:", object?.conditions)
        let condition;
        if (object?.conditions && object.conditions.length > 0) {
            condition = object.conditions.find(cond => cond.key == data.variableName);
        }
        if (condition) {
            setInputValue(condition.value);
        } else {
            console.log("Object:", object);
            console.log("Variable Name:", data);
            console.log("Value:", object?.params?.[data.variableName]);
            setInputValue(object?.params?.[data.variableName] || "");
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
                value={inputValue}
            />
        </div>
    );
};

export default TextEntry;
