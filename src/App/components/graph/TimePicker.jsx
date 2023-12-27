import React, { useState, useEffect } from 'react';

const TimePicker = ({ value, onChange }) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    useEffect(() => {
        if (value) {
            const [hrs, mins] = value.split(':');
            setHours(hrs);
            setMinutes(mins);
        }
    }, [value]);

    const handleHoursChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 2) {
            const hrs = Math.max(0, Math.min(23, parseInt(val, 10) || 0));
            setHours(hrs.toString());
            onChange(`${hrs}:${minutes}`);
        }
    };

    const handleMinutesChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 2) {
            const mins = Math.max(0, Math.min(59, parseInt(val, 10) || 0));
            setMinutes(mins.toString());
            onChange(`${hours}:${mins}`);
        }
    };

    return (
        <div className="bg-background rounded-lg flex flex-row items-center justify-center space-x-6">
            <span className="text-[12px] text-white py-1 ">Time of day</span>
            <div className=" flex flex-row rounded-lg p-2">
                <input
                    type="text"
                    name="hours"
                    value={hours}
                    onChange={handleHoursChange}
                    className="text-[12px]  outline-none w-6 pl-2 py-1 bg-contrast-box-color text-white rounded-l-lg"
                    placeholder="HH"
                />
                <span className="text-[12px] text-white bg-contrast-box-color py-1">:</span>
                <input
                    type="text"
                    name="minutes"
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="text-[12px] outline-none w-6 bg-contrast-box-color text-white rounded-r-lg py-1 pl-1"
                    placeholder="MM"
                />
            </div>
        </div>
    );
};

export default TimePicker;

