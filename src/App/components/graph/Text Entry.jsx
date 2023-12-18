import { useState, useEffect } from "react";

const TextEntry = ({ data, object, setObject }) => {
    const isParameter = data.type === "parameter";
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (isParameter) {
            // Set input value from parameters
            setInputValue(object.params?.[data.variableName] || "");
        } else {
            // Find the condition and set its value
            const condition = object.conditions?.find(cond => cond.key === data.variableName);
            setInputValue(condition ? condition.value : "");
        }
    }, [object, data.variableName, isParameter]);

    const handleChange = (text) => {
        setInputValue(text); // Update local state

        if (isParameter) {
            setObject({
                ...object,
                params: {
                    ...object.params,
                    [data.variableName]: text
                }
            });
        } else {
            const updatedConditions = object.conditions.map(cond =>
                cond.key === data.variableName ? { ...cond, value: text } : cond
            );

            setObject({
                ...object,
                conditions: updatedConditions
            });
        }
    };

    return (
        <div className="bg-background rounded-lg h-8">
            <input
                type="text"
                className="font-outfit text-[12px] font-medium text-white bg-transparent h-full w-full outline-none"
                onChange={(e) => handleChange(e.target.value)}
                value={inputValue}
                placeholder={data.placeholder}
            />
        </div>
    );
};

export default TextEntry;
