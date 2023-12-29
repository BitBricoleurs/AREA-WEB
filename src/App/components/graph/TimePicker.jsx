import React, { useState, useEffect } from 'react';

const TimePicker = ({ data, object, setObject }) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    useEffect(() => {
        const timeValue = object.params?.[data.variableName] || '';
        if (timeValue) {
            const [hrs, mins] = timeValue.split(':');
            setHours(hrs);
            setMinutes(mins);
        }
    }, [object, data.variableName]);

    const updateTime = () => {
        let formattedHours = hours;
        let formattedMinutes = minutes;

        if (parseInt(hours, 10) > 23) {
            formattedHours = '23';
        }
        if (parseInt(minutes, 10) > 59) {
            formattedMinutes = '59';
        }

        setObject({
            ...object,
            params: {
                ...object.params,
                [data.variableName]: `${formattedHours.padStart(2, '0')}:${formattedMinutes.padStart(2, '0')}`
            }
        });
    };

    const handleHoursChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 2) {
            setHours(val);
        }
    };

    const handleMinutesChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 2) {
            setMinutes(val);
        }
    };

    // Ensuring the blur event doesn't cause any side effects other than updating the time
    const handleBlur = () => {
        updateTime();
    };

    return (
        <div className="bg-background rounded-lg flex flex-row items-center justify-between  py-1">
            <span className="text-[12px] text-white py-1">Time of day</span>
            <div className="flex flex-row rounded-lg justify-end bg-contrast-box-color items-center mr-2">
                <input
                    type="text"
                    name="hours"
                    value={hours}
                    onChange={handleHoursChange}
                    onBlur={handleBlur}
                    className="text-[12px] outline-none w-6 text-center bg-contrast-box-color text-white rounded-l-lg placeholder:text-[10px] stay-bg-color"
                    placeholder="HH"
                />
                <span className="text-[12px] text-white bg-contrast-box-color ">:</span>
                <input
                    type="text"
                    name="minutes"
                    value={minutes}
                    onChange={handleMinutesChange}
                    onBlur={handleBlur}
                    className="text-[12px] outline-none w-6  text-center bg-contrast-box-color text-white rounded-r-lg  placeholder:text-[10px] stay-bg-color"
                    placeholder="MM"
                />
            </div>
        </div>
    );
};

export default TimePicker;
