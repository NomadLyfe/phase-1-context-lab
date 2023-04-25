function createEmployeeRecord(employee) {
    const employeeRecord = {
        'firstName': employee[0],
        'familyName': employee[1],
        'title': employee[2],
        'payPerHour': employee[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return employeeRecord;
}
function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
}
function createTimeInEvent(dateTimeStamp) {
    if (dateTimeStamp.length === 15 && dateTimeStamp[10] === ' ') {
        this.timeInEvents = [...this.timeInEvents, {
            'type': 'TimeIn',
            'date': dateTimeStamp.split(' ')[0],
            'hour': Number(dateTimeStamp.split(' ')[1])
        }]
        return this;
    } else {
        alert('Wrong date/time format!')
    }
}
function createTimeOutEvent(dateTimeStamp) {
    if (dateTimeStamp.length === 15 && dateTimeStamp[10] === ' ') {
        this.timeOutEvents = [...this.timeOutEvents, {
            'type': 'TimeOut',
            'date': dateTimeStamp.split(' ')[0],
            'hour': Number(dateTimeStamp.split(' ')[1])
        }]
        return this;
    } else {
        alert('Wrong date/time format!')
    }
}
function hoursWorkedOnDate(dateStamp) {
    let timeIn, timeOut;
    const timeInElements = this.timeInEvents;
    const timeOutElements = this.timeOutEvents;
    for (const timeInElement of timeInElements) {
        for (const timeOutElement of timeOutElements) {
            if (timeInElement.date === dateStamp && timeOutElement.date === dateStamp) {
                timeIn = timeInElement.hour;
                timeOut = timeOutElement.hour;
            }
        }
    }
    return (timeOut - timeIn)/100;
}
function wagesEarnedOnDate(dateStamp) {
    const hours = hoursWorkedOnDate.call(this, dateStamp);
    return hours * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {return employee.firstName === firstName});
}
function calculatePayroll(employees) {
    let sum = 0;
    for (const employee of employees) {
        sum += allWagesFor.call(employee);
    }
    return sum;
}
