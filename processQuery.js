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
    //console.log("Formatted date");
    yearData = readFile(date.year); 
    //console.log("year data", yearData)

    console.log(yearData[date.year][date.month]);
    //console.log("Read file");
    availableTimes = yearData[date.year][date.month][date.day];
    console.log("times array", availableTimes);
    for (index in availableTimes) {
        time = availableTimes[index]
        console.log("timeeeee", time);
        if ( time == query.eventTime) {
            availability = "available";
        } else {
            availability = "unavailable";
        }
    }
    utils.sendJSONOBJ(res,200, availability);
    //selectedDate = yearData.eventM.eventD;
    //console.log(selectedDate);
    
    
    console.log("Server responded");
}

// handles cancel request from client
function processCancel(query, res) {
    utils.sendJSONOBJ(res,200, "success");
}

// reads year file
function readFile (year){
    fileName = year+"daysMachai.txt"
    var data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    return data;
}

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
