import React, { useState, useEffect, useRef } from 'react';
import { useWorkflowContext } from '/src/App/context/workflowContext.jsx';

const AutocompleteInput = ({ className, onChange, placeholder }) => {
    const { variables } = useWorkflowContext();
    const [inputValue, setInputValue] = useState('');
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);

    useEffect(() => {
        const lastIndex = inputValue.lastIndexOf('${');
        setSuggestionsVisible(lastIndex !== -1);
        setSelectedIndex(-1);
    }, [inputValue]);

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setSuggestionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleKeyDown = (event) => {
        if (!suggestionsVisible) return;

        switch (event.key) {
            case 'ArrowDown':
                setSelectedIndex(prevIndex => Math.min(prevIndex + 1, variables.length - 1));
                break;
            case 'ArrowUp':
                setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    const selectedVariable = variables[selectedIndex];
                    const lastIndex = inputValue.lastIndexOf('${');
                    const updatedValue = inputValue.substring(0, lastIndex) + '${' + selectedVariable.id + '}';
                    setInputValue(updatedValue);
                    onChange(updatedValue);
                }
                setSuggestionsVisible(false);
                break;
            default:
                break;
        }
    };

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={className}
                placeholder={placeholder}
            />
            {suggestionsVisible && (
                <ul className="absolute z-10 w-full bg-box-color border border-gray-300 rounded-md">
                    {variables.length > 0 ? (
                        variables.map((variable, index) => (
                            <li
                                key={variable.id}
                                className={`p-2 cursor-pointer ${selectedIndex === index ? 'text-light-purple' : ''}`}
                                onClick={() => {
                                    const lastIndex = inputValue.lastIndexOf('${');
                                    setInputValue(inputValue.substring(0, lastIndex) + '${' + variable.name + '}');
                                    setSuggestionsVisible(false);
                                }}
                            >
                                {variable.name}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No variable available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;
