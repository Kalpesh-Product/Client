function getCurrentTimePlus30Minutes(date = new Date()) {
    // Clone the passed date to avoid mutating the original
    const updatedTime = new Date(date);
    updatedTime.setMinutes(updatedTime.getMinutes() + 30);

    // Format time in local timezone
    const localTime = updatedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format; set to `true` for 12-hour format
    });

    return localTime;
}

export default getCurrentTimePlus30Minutes;
