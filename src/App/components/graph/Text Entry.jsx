import { useState, useEffect } from "react";

const TextEntry = ({ data, object, setObject }) => {
    const isParameter = data.type === "parameter";
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (isParameter) {
            setInputValue(object.params?.[data.variableName] || "");
        } else {
            const condition = object.conditions?.find(cond => cond.key === data.variableName);
            console.log("TextEntry.jsx condition: ", condition);
            setInputValue(condition ? condition.value : "");
        }
    }, [object, data.variableName, isParameter]);

    const handleChange = (text) => {
        setInputValue(text);

        if (isParameter) {
            setObject({
                ...object,
                params: {
                    ...object.params,
                    [data.variableName]: text
                }
            });
        } else {
            const currentConditions = object.conditions || [];

            const conditionIndex = currentConditions.findIndex(cond => cond.key === data.variableName);

            if (conditionIndex > -1) {
                const updatedConditions = currentConditions.map((cond, index) =>
                    index === conditionIndex ? { ...cond, value: text } : cond
                );

                setObject({
                    ...object,
                    conditions: updatedConditions
                });
            } else {
                const newCondition = {
                    key: data.variableName,
                    value: text,
                    type: data.conditionType
                };

                setObject({
                    ...object,
                    conditions: [...currentConditions, newCondition]
                });
            }
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
