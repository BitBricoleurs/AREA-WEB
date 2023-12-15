import {useWorkflowContext} from "../../context/workflowContext.jsx";
import {ChoiceEntry, ChoiceTextEntry, TextArrayEntry, TextEntry} from "../index.js";
import React from "react";

const renderSections = (sections) => {
    return (
        <>
            {sections ? sections.map((section, index) => (
                    <Section key={index} section={section} />
                ))
                : null}
        </>
    );
};

function Section({ section }) {

    const { trigger, setTrigger } = useWorkflowContext();
    const sectionDispatch = (section, index) => {
        switch (section.name) {
            case "timeEntry":
                return (
                    <TimeEntry
                        data={section}
                        key={index}
                        object={trigger}
                        setObject={setTrigger}
                    />
                );
            case "choice":
                return (
                    <ChoiceEntry
                        data={section}
                        key={index}
                        object={trigger}
                        setObject={setTrigger}
                    />
                );
            case "choiceTextEntry":
                return (
                    <ChoiceTextEntry
                        data={section}
                        key={index}
                        object={trigger}
                        setObject={setTrigger}
                    />
                );
            case "textArrayEntry":
                return (
                    <TextArrayEntry
                        data={section}
                        key={index}
                        object={trigger}
                        setObject={setTrigger}
                    />
                );
            case "textEntry":
                return (
                    <TextEntry
                        data={section}
                        key={index}
                        object={trigger}
                        setObject={setTrigger}
                    />
                );
            default:
                return null;
        }
    };

    console.log(section)
    return (
        <div className="flex flex-col bg-background rounded-md m-2 pl-2">
            {section?.block?.map((blockItems, index2) => (

                <div key={index2} className={`${index2 < section.block.length - 1 ? 'border-b border-gray-600' : ''}`}>
                    {sectionDispatch(blockItems, index2)}
                </div>
            ))}
        </div>
    );
}

export default renderSections;