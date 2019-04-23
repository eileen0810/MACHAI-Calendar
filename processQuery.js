// needed modules
utils = require('./utils')
http = require('http');
fs = require('fs');

// decides what function handles each type of request
exports.processQuery = function(query,res) {
    if (query.request == 'schedule') 
        processSchedule(query, res);
    if (query.request == 'cancel') 
        processCancel(query,res);
}

// handles schedule request from client
function processSchedule(query, res) {
    console.log("Server received schedule request");
    var availability = "";
    date = formatEventDate(query);
    yearData = readFile(date.year); 
    availableTimes = yearData[date.year][date.month][date.day];
    
    for (index in availableTimes) {
        time = availableTimes[index];
        if (time == query.eventTime) {
            availability = "available";
            removeAppointment(date);
            break;
        } else {
            availability = "unavailable";
        }
    }
    utils.sendJSONOBJ(res,200, availability);
    console.log("Server responded");
}

// handles cancel request from client
function processCancel(query, res) {
    utils.sendJSONOBJ(res,200, "success");
}

// reads the year file
function readFile (year){
    fileName = year+"daysMachai.txt"
    var data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    return data;
}

// removes the appoinment from the database
function removeAppointment(date){
    console.log("removing apointment")
    fileName = date.year+"daysMachai.txt";
    yearData = readFile(date.year);
    apptMonth = 
    console.log(apptMonth);

    fs.readFile(fileName, 'utf8', function(err, data){
        if (err) {
            console.log('error')
        }
        console.log(data.indexOf("January"));
        console.log(data.indexOf("February"));
        console.log(data.indexOf(apptMonth));
        //var linesExceptFirst = data.split('\n').slice(1).join('\n');
        //fs.writeFile(filename, linesExceptFirst);
    });
  }

///////////////////////////////HELPER FUNCTIONS
function formatEventDate( quer ) {
    dateObj = {} 
    date = quer.eventDate;
    var splitted = date.split("-");
    //console.log("splitted", splitted)
    dateObj.year = splitted[0];
    dateObj.month = Number(splitted[1]).toFixed(0);
    dateObj.day = "day" + (Number(splitted[2]).toFixed(0)).toString();
    var months = [ "January", "February", "March", "April", "May", "June", 
             "July", "August", "September", "October", "November", "December"];
    
    var monthName = months[dateObj.month-1];
    dateObj.month = monthName;
    return dateObj;
  }

