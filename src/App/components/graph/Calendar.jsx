import React, { useState } from 'react';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2023, 11));

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const selectDay = (day) => {
        console.log(`Day selected: ${day}`);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    return (
        <div className="calendar mt-1 pt-2 font-outfit -ml-2 bg-box-color">
            <div className="flex flex-col h-full w-full p-2 bg-background rounded-lg">
            <div className="header flex justify-between items-center mb-2 text-white text-[10px]">
                <button className="text-white" onClick={prevMonth}>&lt;</button>
                <div className="flex flex-row space-x-2">
                    <span>{`${currentMonth.toLocaleString('default', {month: 'long'})}`}</span>
                    <span>{`${currentMonth.getFullYear()}`}</span>
                </div>
                <button className="text-white" onClick={nextMonth}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(day => (
                    <div key={day} className="h-3 w-3 p-2 text-white text-[10px] font-thin flex items-center justify-center">
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex flex-col h-full w-full mb-2 ">
                <div className="w-full h-[1px] bg-custom-grey"/>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({length: firstDayOfMonth}, (_, i) => i).map(index => (
                    <div key={index} className="h-3 w-3 p-2"/>
                ))}
                {Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => (
                    <button
                        key={day}
                        className="h-3 w-3 p-2 rounded-full text-[10px] font-thin flex items-center justify-center text-white duration-300 transition-all bg-box-color hover:bg-light-purple focus:bg-light-purple"
                        onClick={() => selectDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            </div>
        </div>
    );
};

export default Calendar;
