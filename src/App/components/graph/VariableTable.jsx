import React, { useState, useRef, useEffect } from 'react';
import { useWorkflowContext } from '/src/App/context/workflowContext.jsx';
const DropdownMenu = ({ onSelect, selectedOutput, options }) => {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option) => {
        onSelect(option === "None" ? "" : option);
        setShow(false);
    };

    return (
        <div className="relative w-full h-full flex">
            <button ref={buttonRef} onClick={() => setShow(!show)}
                    className="flex justify-center h-8 w-full text-light-purple rounded-md focus:outline-none items-center">
                {selectedOutput || ''}
            </button>
            {show && (
                <div ref={dropdownRef} className="absolute z-50 bg-white divide-y divide-custom-grey rounded-lg shadow w-44 dark:bg-background border border-contrast-box-color -translate-y-full">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {options.map(option => (
                            <li key={option}>
                                <a href="#" className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-box-color dark:hover:text-white"
                                   onClick={() => handleSelect(option)}>
                                    {option}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TableRow = ({ row, index, handleInteraction, getNextId, availableVariables }) => {
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const transitionClasses = isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5";

    const handleChange = (key, value) => {
        if (key === 'output' && !row.id) {
            handleInteraction(index, 'id', getNextId());
        }
        handleInteraction(index, key, value);
    };

    return (
        <tr className={`bg-box-color border-b border-custom-grey transition duration-500 ease-in-out transform ${transitionClasses}`}>
            <td className="border-r border-custom-grey hover:bg-contrast-box-color">
                <DropdownMenu
                    selectedOutput={row.output}
                    onSelect={(value) => handleChange('output', value)}
                    options={availableVariables}
                />
            </td>
            <td className="">
                <input
                    type="text"
                    value={row.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-2 w-full bg-box-color hover:bg-contrast-box-color text-custom-grey rounded-md h-8 outline-none"
                />
            </td>
        </tr>
    );
};


const VariableTable = ({ nodeId, currentWorkflow }) => {
    const getNextId = () => {
        return variables.length + 1;
    };

    const { variables, setVariables } = useWorkflowContext();

    const [rows, setRows] = useState(variables.filter(v => v.refers === nodeId));

    const getNodeKeys = () => {
        const conditionKeys = currentWorkflow?.conditions?.map(conditions => conditions.key) || [];
        const paramKeys = Object.keys(currentWorkflow?.params || {});
        return ["None", ...conditionKeys, ...paramKeys];
    };

    const availableVariables = getNodeKeys();
    console.log("VariableTable.jsx availableVariables: ", availableVariables);

    useEffect(() => {
        setRows(variables.filter(v => v.refers === nodeId));
    }, [nodeId, variables]);

    const handleInteraction = (index, key, value) => {
        let newRows = [...rows];

        if (key === 'output' && value === '' && !newRows[index].name) {
            newRows = newRows.filter((_, idx) => idx !== index);
        } else {
            if (index < rows.length) {
                newRows[index] = { ...newRows[index], [key]: value };
            } else {
                newRows.push({ id: getNextId(), [key]: value, refers: nodeId });
            }
        }

        setRows(newRows);

        let updatedVariables = variables.filter(v => v.refers !== nodeId);
        updatedVariables = [...updatedVariables, ...newRows.map(row => ({
            id: row.id,
            name: row.name,
            output: row.output,
            refers: nodeId
        }))];

        setVariables(updatedVariables);
    };



    return (
        <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-custom-grey">
                <thead className="text-xs text-custom-grey uppercase bg-gray-50 dark:bg-box-color dark:text-custom-grey">
                <tr className="border-b border-custom-grey">
                    <th scope="col" className="px-6 py-3 border-r border-custom-grey">
                        Variable
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name as
                    </th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <TableRow
                        key={index}
                        row={row}
                        index={index}
                        handleInteraction={handleInteraction}
                        getNextId={getNextId}
                        availableVariables={availableVariables}
                    />
                ))}
                <TableRow
                    key="new-variable"
                    row={{ id: null, output: '', name: '', refers: nodeId }}
                    index={rows.length}
                    handleInteraction={handleInteraction}
                    getNextId={getNextId}
                    availableVariables={availableVariables}
                />
                </tbody>
            </table>
        </div>
    );
}

export default VariableTable;
