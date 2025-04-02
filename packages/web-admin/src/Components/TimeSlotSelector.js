const fetchTimeSlots = async (date) => {
    try {
        setError('');
        // Use the full API URL
        const response = await axios.get(`https://api.medicare.samit.global/api/time-slots?date=${date}`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            setTimeSlots(response.data);
        } else {
            setTimeSlots([]);
            setError('Sorry, no available time slots were found for the selected date.');
        }
    } catch (err) {
        console.error('Error fetching time slots:', err); // Log the error for debugging
        setTimeSlots([]);
        setError('Failed to fetch time slots. Please try again later.');
    }
};
