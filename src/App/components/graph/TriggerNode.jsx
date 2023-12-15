import React, {useEffect, useState} from "react";
import {Handle, Position} from "reactflow";
import NodeHeader from "./NodeHeader.jsx";
import renderSections from "./RenderForm.jsx";
import SelectBox from "./SelectBox.jsx";
import TriggerServices from "/src/constants/Triggers.json";
const findService = (serviceName, services) => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return null;
    return service;
}
const findTrigger = (serviceName, triggerName, triggerServices) => {
    const service = findService(serviceName, triggerServices);
    if (!service) return null;
    const trigger = service.triggers.find((a) => a.name === triggerName);
    if (!trigger) return null;
    return trigger;
};

const isTriggerHasOptions = (trigger) => {
    return trigger?.options?.length > 0;
}


function TriggerNode({ data }) {
    const [selectedTrigger, setSelectedTrigger] = useState(null);
    const [hasOptions, setHasOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const [currentSections, setCurrentSections] = useState([]);


    useEffect(() => {
        const selectTrigger = findTrigger(data.serviceName, data.serviceTrigger, TriggerServices);
        setSelectedTrigger(selectTrigger);
        setHasOptions(isTriggerHasOptions(selectTrigger));
        if (!hasOptions) {
            setCurrentSections(selectTrigger?.sections);
        }
    }, []);

    const handleOptionsChange = (e) => {
        const option = selectedTrigger?.options.find((option) => option.value === e.target.value);
        setSelectedOption(option);
        setCurrentSections(option?.section);
    };


    if (!selectedTrigger) return null;

    return (
        <div className="w-48 rounded-md bg-box-color border border-contrast-box-color">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-full w-full p-2">
                    <NodeHeader triggerName={data.serviceTrigger} logo={data.logo} color={data.color}/>
                    {(hasOptions &&
                        <div className={"w-full h-full justify-center items-center flex flex-col"}>
                            <SelectBox placeholder={"Select a trigger"} onChange={handleOptionsChange} options={selectedTrigger?.options} />
                        </div>
                    )}
                </div>
                <span className="text-outfit text-sm text-white ml-2">{"When"}</span>
                <div className="flex flex-col w-full h-full">
                    {(currentSections && renderSections(currentSections))}
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="bg-light-purple w-8 rounded-md" />
        </div>
    );
}

export default TriggerNode;
