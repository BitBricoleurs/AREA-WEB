import React from "react";

const SelectBox = ({ placeholder, value, onChange, options }) => {
    if (!options) return null;
    return (
        <div className="flex flex-col w-full items-center">
            <select
                className={"placeholder:text-custom-grey text-[12px] pl-1 bg-background rounded-lg h-8 font-outfit w-full py-0.5 text-custom-grey border border-contrast-box-color dark:border-contrast-box-color dark:placeholder-gray-400 dark:text-custom-grey ring-background outline-none focus:border-light-purple"}
                value={value}
                onChange={onChange}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option key={option.name} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};


export default SelectBox;