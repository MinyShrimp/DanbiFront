
const getDate = ( day ) => {
    if( typeof(day) !== typeof(new Date) ) {
        return "";
    }
    
    const year  = day.getFullYear(); 
    const month = day.getMonth() + 1; 
    const date  = day.getDate();

    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
}

export default getDate;