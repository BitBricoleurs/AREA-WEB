import React, { useState, useEffect } from 'react';

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
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);

    useEffect(() => {
        if (object.params?.weekdays === "weekly") {
            setSelectedWeekdays([]);
            return;
        }
        const weekdaysValue = object.params?.weekdays || [];
        setSelectedWeekdays(weekdaysValue);
    }, [object]);

    const updateSelectedWeekdays = (dayIndex) => {
        const newSelectedWeekdays = selectedWeekdays.includes(dayIndex)
            ? selectedWeekdays.filter(index => index !== dayIndex)
            : [...selectedWeekdays, dayIndex];

        setSelectedWeekdays(newSelectedWeekdays);

        setObject({
            ...object,
            params: {
                ...object.params,
                weekdays: newSelectedWeekdays,
            }
        });
    };

    return (
        <div className="WeekDays mt-1 pt-2 font-outfit -ml-2 bg-box-color">
            <div className="flex flex-col h-full w-full px-2 py-1 bg-background rounded-lg">
                <span className="text-white text-[12px] font-medium text-center">Days of the week</span>
                <div className="w-full h-[0.5px] bg-white my-1"/>
                <div className="flex justify-center space-x-2 pl-4 pr-4 py-2">
                    {daysOfWeek.map((day, index) => (
                        <button
                            key={day.full}
                            className={`h-3 w-3 p-2 rounded-full font-outfit font-thin text-[10px] flex items-center justify-center text-white duration-300 transition-all ${
                                selectedWeekdays.includes(index) ? 'bg-light-purple' : 'bg-box-color hover:bg-light-purple hover:bg-opacity-60'
                            }`}
                            onClick={() => updateSelectedWeekdays(index)}
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
