import React, { useState, useEffect } from 'react';

// Define full names for the days to ensure unique keys and checks
const daysOfWeek = [
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' },
    { short: 'S', full: 'Sunday' }
];

const DayPicker = ({ object, setObject }) => {
    const [selectedDays, setSelectedDays] = useState([]);

    // Initialize the selectedDays state based on the object context
    useEffect(() => {
        const daysValue = object.params?.days || [];
        setSelectedDays(daysValue);
    }, [object]);

    // Update the context object when the selected days change
    const updateSelectedDays = (fullDayName) => {
        const newSelectedDays = selectedDays.includes(fullDayName)
            ? selectedDays.filter(day => day !== fullDayName)
            : [...selectedDays, fullDayName];

        // Update local state
        setSelectedDays(newSelectedDays);

        // Update context object
        setObject({
            ...object,
            params: {
                ...object.params,
                days: newSelectedDays
            }
        });
    };

    return (
        <div className="WeekDays mt-1 pt-2 font-outfit -ml-2 bg-box-color">
            <div className="flex flex-col h-full w-full p-2 bg-background rounded-lg">
            <div className="flex justify-center space-x-2 pl-4 pr-4 py-2">
                {daysOfWeek.map(day => (
                    <button
                        key={day.full}
                        className={`h-3 w-3 p-2 rounded-full font-outfit font-thin text-[10px] flex items-center justify-center text-white duration-300 transition-all ${
                            selectedDays.includes(day.full) ? 'bg-light-purple' : 'bg-box-color hover:bg-light-purple hover:bg-opacity-60'
                        }`}
                        onClick={() => updateSelectedDays(day.full)}
                        aria-label={day.full}
                    >
                        {day.short}
                    </button>
                ))}
            </div>
            </div>
        </div>
    );
};

export default DayPicker;
