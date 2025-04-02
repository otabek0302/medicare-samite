import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeSlotSelector = ({ selectedDate }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedDate) {
            fetchTimeSlots(selectedDate);
        }
    }, [selectedDate]);

    const fetchTimeSlots = async (date) => {
        try {
            setError('');

            // https://api.medicare.samit.global/api/time-slots?date=2023-10-01
            const response = await axios.get(`/api/time-slots?date=${date}`);

            if (response.data && response.data.length > 0) {
                setTimeSlots(response.data);
            } else {
                setTimeSlots([]);
                setError('Sorry, no available time slots were found for the selected date.');
            }
        } catch (err) {
            setTimeSlots([]);
            setError('Failed to fetch time slots. Please try again later.');
        }
    };

    return (
        <div>
            <h3>Select Time Slot</h3>
            {error && <p className="error">{error}</p>}
            <div className="time-slots">
                {timeSlots?.map((slot, index) => (
                    <button key={index} className="time-slot">
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSlotSelector;
