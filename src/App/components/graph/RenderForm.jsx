import {useWorkflowContext} from "../../context/workflowContext.jsx";
import {ChoiceEntry, ChoiceTextEntry, TextArrayEntry, TextEntry, TimePicker, DateSelector, Picker} from "../index.js";
import React from "react";

const renderSections = (sections, nodeId) => {
    return (
        <>
            {sections ? sections.map((section, index) => (
                    <Section key={index} section={section} nodeId={nodeId} />
                ))
                : null}
        </>
    );
};

const Section = ({ section, nodeId }) => {

    const { workflow, updateNodeInWorkflow } = useWorkflowContext();

    const currentNode = workflow.find(node => node.id == nodeId);

    const setObject = (newObjectData) => {
        updateNodeInWorkflow(nodeId, newObjectData);
    };

    const sectionDispatch = (blockItem, index) => {
        switch (blockItem.name) {
            case "timeEntry":
                return <TimePicker data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "choice":
                return <ChoiceEntry data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "choiceTextEntry":
                return <ChoiceTextEntry data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "textArrayEntry":
                return <TextArrayEntry data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "basicTextEntry":
            case "textEntry":
                return <TextEntry data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "dateRange":
                return <DateSelector data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            case "picker":
                return <Picker data={blockItem} key={index} object={currentNode} setObject={setObject} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col bg-background rounded-md m-2 pl-2">
            {section?.block?.map((blockItem, index) => (
                <div key={index} className={`${index < section.block.length - 1 ? 'border-b border-gray-600' : ''}`}>
                    {sectionDispatch(blockItem, index)}
                </div>
            ))}
        </div>
    );
};

export default renderSections;