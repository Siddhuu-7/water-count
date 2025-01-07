export function getRecords(waterTaken) {
    
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
    const currentDate = new Date();
    const newRecord = {
        water: waterTaken,
        time: formatTime(currentDate),
        date: formatDate(currentDate)
    };
console.log(newRecord)
    return newRecord;
}


export function totalConsume(randomTakenWAter){
    
}