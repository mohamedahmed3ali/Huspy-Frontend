// Format date from YYYY-MM-DD HH:mm to DD/MM
export function formatDate(date){
    const temp = date.split(' ')[0];
    const day = temp.split('-')[2];
    const month = temp.split('-')[1];
    return day + '/' + month;
}

//returns true if the date is today and false otherwise
export function isToday(date,isFormatted = false){
    const now = new Date();
    var formattedDate;
    if(!isFormatted)
        formattedDate = formatDate(date);
    else
        formattedDate = date;
    if(parseInt(formattedDate.split('/')[0]) !== now.getDate())return false;
    if(parseInt(formattedDate.split('/')[1]) !== (now.getMonth() + 1))return false;

    return true;
}

// Retrieves the time from the dateTime input
export function getTime(date){
    return date.split(' ')[1];
}

//Returns the string representation to now
export function getNowDateString(){
    const now = new Date();
    return now.getFullYear() + '-' +
                 ("0" +(now.getMonth() +1)).slice(-2) + '-' +
                 ("0" + now.getDate()).slice(-2) + ' ' +
                 ("0" + now.getHours()).slice(-2) + ':' + 
                 ("0" + now.getMinutes()).slice(-2);
}
