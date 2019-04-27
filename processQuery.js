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
            removeAppointment(date, time);
            saveNewAppointment(query);
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
function removeAppointment(date, time){
    fileName = date.year+"daysMachai.txt";
    yearData = readFile(date.year);
    var index = yearData[date.year][date.month][date.day].indexOf(time);
    yearData[date.year][date.month][date.day].splice(index, 1);
    FINALyearData = JSON.stringify(yearData);
    fs.writeFile(fileName, FINALyearData, function(err){
        if (err) throw err;
    });
  }

function saveNewAppointment(query){
    appointments = JSON.parse(fs.readFileSync("appointments.txt", 'utf8'));
    
    //create an appointment object
    appointments['appointments'].push(query);
    updatedAppts = JSON.stringify(appointments);
    fs.writeFile("appointments.txt", updatedAppts, function(err){
        if (err) throw err;
        console.log('appointment saved!');
    });
}

///////////////////////////////HELPER FUNCTIONS
function formatEventDate( quer ) {
    dateObj = {} 
    date = quer.eventDate;
    var splitted = date.split("-");
    dateObj.year = splitted[0];
    dateObj.month = Number(splitted[1]).toFixed(0);
    dateObj.day = "day" + (Number(splitted[2]).toFixed(0)).toString();
    var months = [ "January", "February", "March", "April", "May", "June", 
             "July", "August", "September", "October", "November", "December"];
    
    var monthName = months[dateObj.month-1];
    dateObj.month = monthName;
    return dateObj;
  }

