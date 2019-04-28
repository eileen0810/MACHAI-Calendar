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
    if (query.request == 'clickDate')
        processClickDate(query, res);
}

/////////////////////////////////////////////// SCHEDULE REQUEST
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
            deleteTimeFromDB(date, time);
            saveNewAppointment(query);
            break;
        } else {
            availability = "unavailable";
        }
    }
    utils.sendJSONOBJ(res,200, availability);
    console.log("Server responded");
}

/////////////////////////////////////////////// CANCEL REQUEST
function processCancel(query, res) {
    console.log("Server received cancel request");
    appointFile = JSON.parse(fs.readFileSync("appointments.txt", 'utf8'));
    apptArray = appointFile['appointments'];
    var apptStatus = "";
    for (i = 0; i < apptArray.length; i++) {
        appt = apptArray[i];
        if (appt.eventDate == query.eventDate && 
            appt.eventTime == query.eventTime &&
            appt.name == query.name){
            console.log("Found appointment");
            apptStatus = "success";
            deleteAppointmentFromAppts(i);
            addTimeToTheDataBase(query);
            console.log("Deleted appointment");
        } else {
            console.log("Couldn't find appt");
            apptStatus == "unsuccessful";
        }
    }
    utils.sendJSONOBJ(res,200, apptStatus);
    console.log("Server responded");
}

/////////////////////////////////////////////// CLICK DATE REQUEST
function processClickDate(query, res) {
    console.log("Server received click date request");
    appts = []
    console.log("hi");
    console.log(query);
    date = formatEventDate(query);
    yearData = readFile(date.year); 
    availableTimes = yearData[date.year][date.month][date.day];
    availableTimes = availableTimes.toString().replace(/[',']+/g, ', ');

    utils.sendJSONOBJ(res,200, availableTimes);
    console.log("Server responded");
}


/////////////////////////////// HELPER FUNCTIONS
// reads the year file
function readFile (year){
    fileName = year+"daysMachai.txt"
    var data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    return data;
}

// removes the appoinment from the database
function deleteTimeFromDB(date, time){
    fileName = date.year+"daysMachai.txt";
    yearData = readFile(date.year);
    var index = yearData[date.year][date.month][date.day].indexOf(time);
    yearData[date.year][date.month][date.day].splice(index, 1);
    FINALyearData = JSON.stringify(yearData);
    fs.writeFile(fileName, FINALyearData, function(err){
        if (err) throw err;
    });
  }

function addTimeToTheDataBase(quer){
    date = formatEventDate(quer);
    time = quer.eventTime;
    fileName = date.year+"daysMachai.txt";
    yearData = readFile(date.year);
    yearData[date.year][date.month][date.day].push(time);
    FINALyearData = JSON.stringify(yearData);
    fs.writeFile(fileName, FINALyearData, function(err){
        if (err) throw err;
    });

}

function saveNewAppointment(query){
    appointments = JSON.parse(fs.readFileSync("appointments.txt", 'utf8'));
    appointments['appointments'].push(query);
    updatedAppts = JSON.stringify(appointments);
    fs.writeFile("appointments.txt", updatedAppts, function(err){
        if (err) throw err;
    });
}

function deleteAppointmentFromAppts(index){
    appointments = JSON.parse(fs.readFileSync("appointments.txt", 'utf8'));
    apptArray = appointments['appointments'];
    appt = apptArray[index];
    appointments['appointments'].pop(appt);
    updatedAppts = JSON.stringify(appointments);
    fs.writeFile("appointments.txt", updatedAppts, function(err){
        if (err) throw err;
    });
}


function formatEventDate( quer ) {
    dateObj = {} 
    date = quer.eventDate;
    console.log(date);
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

