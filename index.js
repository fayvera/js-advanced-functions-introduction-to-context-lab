// Your code here
let createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arr){
    return arr.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}


let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateWanted){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateWanted
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateWanted
    })
    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let hoursWorked = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
    return parseFloat(hoursWorked.toString())
}

let allWagesFor = function(employee){
    let totalDates = employee.timeInEvents.map(function(e){
        return e.date
    }) 
    let payable = totalDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}

let calculatePayroll = function(arrOfEmployees){
    return arrOfEmployees.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0) 
}

let findEmployeeByFirstName = function(src, firstName){
    return src.find(function(rec){
        return rec.firstName === firstName
    })
}

