export function dateStringToTime(dateString){
    const time = new Date(dateString).toLocaleTimeString();
    return time;
}

export function dateStringToLocalString(dateString){
    return new Date(dateString).toLocaleString();
}