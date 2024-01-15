import React, { useState, useEffect } from 'react';

// Define full names for the days to ensure unique keys and checks
const daysOfWeek = [
    { short: 'S', full: 'Sunday' },
    { short: 'M', full: 'Monday' },
    { short: 'T', full: 'Tuesday' },
    { short: 'W', full: 'Wednesday' },
    { short: 'T', full: 'Thursday' },
    { short: 'F', full: 'Friday' },
    { short: 'S', full: 'Saturday' },
];

const DayPicker = ({ object, setObject }) => {
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(() => {
        const daysValue = object.params?.weekdays || [];
        setSelectedDays(daysValue);
    }, [object]);

    const updateSelectedDays = (fullDayName) => {
        const newSelectedDays = selectedDays.includes(fullDayName)
            ? selectedDays.filter(day => day !== fullDayName)
            : [...selectedDays, fullDayName];

        setSelectedDays(newSelectedDays);

        setObject({
            ...object,
            params: {
                ...object.params,
                weekdays: newSelectedDays
            }
        });
    };

    return (
        <div className="WeekDays mt-1 pt-2 font-outfit -ml-2 bg-box-color">
            <div className="flex flex-col h-full w-full px-2 py-1 bg-background rounded-lg">
                <span className="text-white text-[12px] font-medium text-center">Days of the week</span>
                <div className="w-full h-[0.5px] bg-white my-1"/>
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
