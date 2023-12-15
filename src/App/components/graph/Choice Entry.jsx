import React, {useEffect, useState} from "react";
//import Weekdays from "./weekdays";
//import Calendar from "./calendar";

const ChoiceEntry = ({data, object, setObject}) => {
    const [selectedChoice, setSelectedChoice] = useState(1);

    const displayRevealComponent = () => {
        switch (data?.options[selectedChoice]?.reveal) {
            //case "Calendar":
            //    return (
            //        <Calendar
            //            update={selectedChoice}
            //            object={object}
            //            setObject={setObject}
            //       />
            //   );
            //case "Weekdays":
            //   return <Weekdays object={object} setObject={setObject}/>;
            default:
                return null;
        }
    };

    const handleChoicePress = (index) => {
        let newIndex = index;
        if (data.required === "true" && index === selectedChoice) {
            return;
        } else if (data.required === "multi" && index === selectedChoice) {
            delete object.params[data.variableName];
            newIndex = null;
        }
        const variableNames = data.options.map((option) => option.variableName);
        const objectParams = object.params || {};
        const newParams = Object.keys(objectParams).reduce((acc, key) => {
            if (
                !variableNames.includes(key) ||
                key === data.options[index].variableName
            ) {
                acc[key] = object?.params[key];
            }
            return acc;
        }, {});

        if (
            data.required === "true" ||
            (data.required === "multi" && index !== selectedChoice)
        ) {
            if (data.options[index].variableName) {
                newParams[data.options[index].variableName] =
                    data.options[index].label.toLowerCase();
            }
            newParams[data.variableName] = data.options[index].label.toLowerCase();
        }
        setObject({
            ...object,
            params: newParams,
        });
        setSelectedChoice(newIndex);
    };

    useEffect(() => {
        handleChoicePress(0);
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
