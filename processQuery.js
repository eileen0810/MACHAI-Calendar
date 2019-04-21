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
    name = query.name;
    eventName = query.eventName;
    eventDate = query.eventDate;
    eventTime = query.eventTime;
    
    utils.sendJSONOBJ(res,200, "available");
    console.log("Server responded");
}

// handles cancel request from client
function processCancel(query, res) {
    utils.sendJSONOBJ(res,200, "success");
}