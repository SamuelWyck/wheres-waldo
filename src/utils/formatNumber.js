import {format} from "date-fns";



function formatDate(date) {
    const formatString = "MMM dd yyyy";
    return format(date, formatString); 
};


function formatTime(milliseconds) {
    const timeConversion = 60;

    const totalSeconds = Math.round(milliseconds / 1000);
    const seconds = totalSeconds % timeConversion;
    const totalMinutes = Math.floor(
        totalSeconds / timeConversion
    );
    const minutes = totalMinutes % timeConversion;
    const hours = Math.floor(totalMinutes / timeConversion);

    const secondsStr = (seconds > 0) ? `${seconds}sec` : "";
    const minutesStr = (minutes > 0) ? `${minutes}min` : "";
    const hoursStr = (hours > 0) ? `${hours}hr` : "";

    return `${hoursStr}${minutesStr}${secondsStr}`;
};



export {
    formatDate,
    formatTime
};