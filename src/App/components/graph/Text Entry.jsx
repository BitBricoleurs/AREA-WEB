import {useState} from "react";
import {useWorkflowContext} from "/src/App/context/workflowContext.jsx"

const TextEntry = ({data, object, setObject}) => {
    const {variables} = useWorkflowContext();

    const handleChange = (text) => {
        const element = data.type === "parameter" ? "params" : "conditions";

        if (data.type === "parameter") {
            // Directly update the params object.
            setObject({
                ...object,
                params: {
                    ...object.params,
                    [data.variableName]: text
                }
            });
        } else {
            // Update the conditions array.
            const variableId = variables.find(
                (variable) => variable.name === data.variableName
            )?.id;

            if (variableId === undefined) {
                console.warn("No corresponding variableId");
                return;
            }

            const index = object.conditions.findIndex(
                (condition) => condition.key === variableId
            );

            if (text === "") {
                // Remove the condition if text is empty
                if (index !== -1) {
                    setObject({
                        ...object,
                        conditions: object.conditions.filter((_, idx) => idx !== index)
                    });
                }
            } else {
                // Update or add the condition
                const newCondition = { key: variableId, value: text };
                let newConditions = [...object.conditions];
                if (index !== -1) {
                    newConditions[index] = newCondition;
                } else {
                    newConditions.push(newCondition);
                }
                setObject({
                    ...object,
                    conditions: newConditions
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
                value={object?.params?.[data.variableName]}
                placeholder={data.placeholder}
            />
        </div>
    );
};

export default TextEntry;
