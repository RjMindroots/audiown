import moment from "moment"

function getdate(strDate, formatter = 'YY-MM-DD') {
    // Fri Feb 25 2022 00:00:00 GMT+0530 (India Standard Time)
    let dateString = '07-15-2016'
    dateString = strDate
    const momentObj = moment(dateString, 'YYYY-MM-DD HH:mm:ss')
    const momentString = momentObj.format(formatter)
    return momentString
}

function getDateObject(strDate, formatter = 'YY-MM-DD') {
    // Fri Feb 25 2022 00:00:00 GMT+0530 (India Standard Time)
    let dateString = '07-15-2016'
    dateString = strDate
    const momentObj = moment(dateString, 'YYYY-MM-DD HH:mm:ss')
    const momentString = momentObj.format(formatter)
    return momentObj
}

export { 
    getdate,
    getDateObject 
}