//Modules path/url/fs
fs = require('fs');
url = require('url');
path = require('path');

// Handles error
function error(res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404: resource not found.');            
    res.end();
}

// "exports.readAndSendFile" will export the function that is responsible for sending a file 
exports.readAndSendFile = function (res, fileName){
    //default as html for content type
    contentType = 'text/html';
    //This uses the method extname in the path module which will be used in the switch statement
    pathName = path.extname(fileName);
    //switch statements based on case in which content-type is defined
    switch(pathName){
        //creates cases in which we can either have js/css/text/images
        case ".js":{
           contentType =  'text/javascript';
           break;
        }
        case ".css":{
            contentType = 'text/css';
            break;
        }
        case ".jpg":{
            contentType = 'image/jpg';
            break;
        }
        case ".txt":{
            contentType = 'text/plain';
            break;
        }
    } 
    //'.readFile' is a callback function 
    fs.readFile(fileName, (err,data) => {
        //Calls error function
        if (err) {
            error(res);
        }
        //This part of the code will execute the clients request
        else {
            res.writeHead(200, {'Content-Type': contentType });
            res.write(data);
            res.end();
        }
    });
}