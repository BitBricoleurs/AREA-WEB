import React, { useState, useEffect } from "react";

const Picker = ({ data, object, setObject }) => {
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const value = object.params?.[data.variableName] || "";
        setSelectedValue(value);
    }, [object, data.variableName]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setObject({
            ...object,
            params: {
                ...object.params,
                [data.variableName]: event.target.value
            }
        });
    };

    return (
        <div className="bg-transparent rounded-lg h-8">
            <select
                className="font-outfit text-[12px] font-medium text-custom-grey bg-transparent h-full w-full outline-none rounded-lg"
                value={selectedValue}
                onChange={handleChange}
                placeholder={data.placeholder}
                required={data.required === "true"}
            >
                {data.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Picker;
