import React, {useEffect, useState} from "react";
import DayPicker from './WeekDays.jsx';
import Calendar from "./Calendar.jsx";

const ChoiceEntry = ({data, object, setObject}) => {

    const [selectedChoice, setSelectedChoice] = useState(1);

    const displayRevealComponent = () => {
        switch (data?.options[selectedChoice]?.reveal) {
            case "Calendar":
                return (
                    <Calendar
                        update={selectedChoice}
                        object={object}
                        setObject={setObject}
                   />
               );
            case "Weekdays":
               return <DayPicker object={object} setObject={setObject}/>;
            default:
                return null;
        }
    };

    const handleChoicePress = (index) => {
        let newIndex = index;
        if (data.required === "true" && index === selectedChoice) {
            return;
        } else if (data.required === "multi" && index === selectedChoice) {
            if (data.type === "condition") {
                object.conditions = object.conditions?.filter(cond => cond.key !== data.variableName) || [];
            } else {
                delete object.params[data.variableName];
            }
            newIndex = null;
        }

        if (data.type === "condition") {
            object.conditions = object.conditions || [];

            const conditionIndex = object.conditions.findIndex(cond => cond.key === data.variableName);
            const newCondition = {
                key: data.variableName,
                value: data.options[index].label.toLowerCase(),
                type: data.conditionType,
            };

            if (conditionIndex > -1) {
                object.conditions[conditionIndex] = newCondition;
            } else {
                object.conditions.push(newCondition);
            }
        } else {
            const variableNames = data.options.map(option => option.variableName);
            const objectParams = object.params || [];
            const newParams = Object.keys(objectParams).reduce((acc, key) => {
                if (!variableNames.includes(key) || key === data.options[index].variableName) {
                    acc[key] = object?.params[key];
                }
                return acc;
            }, {});

            if (data.required === "true" || (data.required === "multi" && index !== selectedChoice)) {
                if (data.options[index].variableName) {
                    newParams[data.options[index].variableName] = data.options[index].label.toLowerCase();
                }
                newParams[data.variableName] = data.options[index].label.toLowerCase();
            }
            object.params = newParams;
        }

        setObject({ ...object });
        setSelectedChoice(newIndex);
    };

    useEffect(() => {
        const choice = object.params?.[data.variableName];
        const choiceCondition = object.conditions?.[data.variableName];

        console.log("choice", choice);
        if (choice) {
            const choiceIndex = data.options.findIndex(option => option.label.toLowerCase() === choice);
            console.log("choiceIndex", choiceIndex);
            console.log("data.options", data.options);
            setSelectedChoice(choiceIndex);
        } else if (choiceCondition) {
            const choiceIndex = data.options.findIndex(option => option.label.toLowerCase() === choiceCondition.value);
            setSelectedChoice(choiceIndex);
        } else {
            setSelectedChoice(0);
        }
    }, []);

    return (
        <>
            <div className="flex flex-col rounded-xl">
                {data?.options &&
                    data?.options?.map((option, index) => (
                        <div key={index} className="flex flex-col">
                            {index !== 0 && (
                                <div className="w-full h-[1px] bg-gray-600" />
                            )}
                            <button
                                className="flex flex-row justify-between items-center h-8"
                                onClick={() => handleChoicePress(index)}
                            >
                                <div className="font-outfit text-[12px] font-medium text-white">
                                    {option?.label}
                                </div>
                                    <svg className={`w-4 h-4 mx-2 my-3 stroke-purple transition duration-300 ease-in-out ${index === selectedChoice ? 'opacity-100' : 'opacity-0'}`}
                                         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                           strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path  className={"stroke-light-purple"} d="M4 12.6111L8.92308 17.5L20 6.5"  strokeWidth="2"
                                                   strokeLinecap="round"  strokeLinejoin="round">
                                            </path>
                                        </g>
                                    </svg>
                            </button>
                        </div>
                    ))}
            </div>
            {displayRevealComponent()}
        </>
    );
};

export default ChoiceEntry;
