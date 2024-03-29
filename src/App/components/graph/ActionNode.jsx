import React, {useEffect, useState} from "react";
import {Handle, Position} from "reactflow";
import NodeHeader from "./NodeHeader.jsx";
import renderSections from "./RenderForm.jsx";
import SelectBox from "./SelectBox.jsx";
import {useWorkflowContext} from "../../context/workflowContext.jsx";
const findService = (serviceName, services) => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return null;
    return service;
}
const findAction = (serviceName, actionName, actionServices) => {
    const service = findService(serviceName, actionServices);
    if (!service) return null;
    const action = service.actions.find((a) => a.name === actionName);
    if (!action) return null;
    return action;
};

const isActionHasOptions = (action) => {
    return action?.options?.length > 0;
}


function actionNode({ data }) {

    console.log("data showing",data)
    const { updateWorkflowNode, actions, workflow } = useWorkflowContext();

    const [selectedAction, setSelectedAction] = useState(null);
    const [hasOptions, setHasOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const [currentSections, setCurrentSections] = useState([]);

    const getWorkflowNodeByDataId = (dataId) => {
        return workflow.find(node => node.id == dataId);
    }

    useEffect(() => {
        const selectAction = findAction(data.serviceName, data.serviceAction, actions);
        setSelectedAction(selectAction);
        setHasOptions(isActionHasOptions(selectAction));
        const node = getWorkflowNodeByDataId(data.id);
        if (node.params?.options) {
            const option = selectAction?.options.find((option) => option.name == node.params.options);
            setSelectedOption(option);
            setCurrentSections(option?.sections);
            return;
        }
        if (node.params?.option) {
            const option = selectAction?.options.find((option) => option.name == node.params.option);
            setSelectedOption(option);
            setCurrentSections(option?.sections);
            return;
        }
        if (!hasOptions) {
            setCurrentSections(selectAction?.sections);
        }
    }, []);

    console.log("currentSections: ", currentSections);
    const handleOptionsChange = (e) => {
        const option = selectedAction?.options.find((option) => option.name === e.target.value);
        setSelectedOption(option);
        setCurrentSections(option?.sections);
        const newParams = {
            ...data.params,
            option: option.name
        };
        updateWorkflowNode(data.id, { params: newParams });
    };


    if (!selectedAction) return null;

    return (
        <div className="w-48 rounded-md bg-box-color border border-contrast-box-color">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-full w-full p-2">
                    <NodeHeader triggerName={data.serviceAction} logo={data.logo} color={data.color}/>
                    {(hasOptions &&
                        <div className={"w-full h-full justify-center items-center flex flex-col"}>
                            <SelectBox placeholder={"Select a action"} onChange={handleOptionsChange} options={selectedAction?.options} value={selectedOption?.name} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full h-full">
                    {(currentSections && renderSections(currentSections, data.id))}
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="bg-light-purple w-8 rounded-md" />
            <Handle type="target" position={Position.Top} className="bg-light-purple w-8 rounded-md" />
        </div>
    );
}

export default actionNode;
