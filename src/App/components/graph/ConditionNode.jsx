import React, {useState, memo, useEffect} from "react";
import { Handle, Position } from "reactflow";
import NodeHeader from "./NodeHeader.jsx";
import SelectBox from "./SelectBox.jsx";
import { useWorkflowContext } from "../../context/workflowContext.jsx";
import AutocompleteInput from "./AutocompleteInput.jsx";

const ConditionInput = memo(({ handleChange, inputValue, placeholder }) => (
    <div className="bg-background rounded-lg h-8">
        <AutocompleteInput
            className="pl-1 font-outfit text-[12px] font-medium text-white bg-transparent h-full w-full outline-none"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
        />
    </div>
));

function ConditionNode({ data }) {
    const conditionsTypes = ["is", "is not", "contains", "does not contain", "starts with", "ends with"];
    const nodeId = data.id;

    const [selectedCondition, setSelectedCondition] = useState(null);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const handleConditionChange = (e) => {
        setSelectedCondition(e.target.value);
        updateWorkflowNode(nodeId, { type_condition: e.target.value });
    };

    const handleKeyChange = (newKey) => {
        setKey(newKey);
    };

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    const { updateWorkflowNode } = useWorkflowContext();

    useEffect(() => {
        updateWorkflowNode(nodeId, { key, value });
    }, [key, value]);


    return (
        <div className="w-48 rounded-md bg-box-color border border-contrast-box-color relative">
            <div className="flex flex-col h-full w-full p-2">
                <NodeHeader triggerName={data.serviceAction} logo={data.logo} color={data.color}/>
                <span className="text-outfit text-sm text-white mt-4 font-normal pb-2">{"If"}</span>
                <div className="w-full h-full justify-center flex flex-col space-y-4">
                    <ConditionInput handleChange={handleValueChange} inputValue={value} placeholder={"Value"}/>
                    <SelectBox
                        placeholder={"Select Condition"}
                        onChange={handleConditionChange}
                        options={conditionsTypes.map(condition => ({name: condition}))}
                    />
                    <ConditionInput handleChange={handleKeyChange} inputValue={key} placeholder={"Key"}/>
                </div>
            </div>
            <div className="bg-contrast-box-color h-0.5 w-full"/>
            <div className="flex flex-row w-full justify-center space-x-[70px]">
                <span className="text-outfit font-thin text-[12px] text-custom-grey mt-3  pb-1 ">{"True"}</span>
                <span className="text-outfit font-thin text-[12px] text-custom-grey mt-3  pb-1 ">{"False"}</span>
            </div>
            <div className="flex justify-between w-full">
                <Handle
                    type="source"
                    id="true"
                    position={Position.Bottom}
                    style={{left: '25%'}}
                    className="bg-light-purple w-8 rounded-md"
                />
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="false"
                    style={{left: '75%'}}
                    className="bg-light-purple w-8 rounded-md"
                />
            </div>
            <Handle type="target" position={Position.Top} className="bg-light-purple w-8 rounded-md"/>
        </div>
    );
}

export default ConditionNode;
