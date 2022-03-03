function createEmployeeRecord(employeeArray) {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesArray) {
  const recordArray = [];

  employeesArray.forEach(array => {
    const recordObject = createEmployeeRecord(array);
    recordArray.push(recordObject);
  });

  return recordArray;
}

function createTimeInEvent(timeString) {
  // Pull the hour and date from timeString
  const hour = parseInt(timeString.slice(-4));
  const date = timeString.slice(0, 10);

  this.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date,
  });

  return this;
}

function createTimeOutEvent(timeString) {
  // Pull the hour and date from timeString
  const hour = parseInt(timeString.slice(-4));
  const date = timeString.slice(0, 10);

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date,
  });

  return this;
}

function hoursWorkedOnDate(dateString) {
  let hourIn = this.timeInEvents.find(function (e) {
    return e.date === dateString;
  });

  let hourOut = this.timeOutEvents.find(function (e) {
    return e.date === dateString;
  });

  return (hourOut.hour - hourIn.hour) / 100;
}

function wagesEarnedOnDate(dateString) {
  // Retrieve # of hours from hoursWorkedOnDate.
  const hours = hoursWorkedOnDate.call(this, dateString);

  // Multiply this number by the records payPerHour
  // and return result.
  return hours * this.payPerHour;
}

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

function calculatePayroll(allEmployeesArray) {
  return allEmployeesArray.reduce(function (memo, rec) {
    return memo + allWagesFor.call(rec);
  }, 0);
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
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
