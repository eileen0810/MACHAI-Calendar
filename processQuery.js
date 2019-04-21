utils = require('./utils')
http = require('http');
fs = require('fs');

//Process query from form if given an eventDate
exports.processQuery= function(query, res) {
    switch (query.request) {
        case "schedule":
            console.log("schedule");
            response(query, res);
            break;
        default:
            console.log("error");
            var errObj = {message: "Query not supported"};
            utils.sendJSONappt(res,500,errObj);
            break;
    }   
}

function response(query, res) {

    //Recieves 
   name = query.name;
   eventName = query.eventName;
   eventDate = query.eventDate;
   eventTime = query.eventTime;

   utils.sendJSONOBJ(res,200, name + "'s " + eventName+ " "+ eventDate+ " "+eventTime);
}

