// needed modules
http = require('http');
url = require('url');
query = require("./processQuery");
fileServer = require('./fileServer.js')

// Handles all client requests
function requestHandler(req, res){
    var path = url.parse(req.url).pathname; // get file path from URL
    var queryObj = url.parse(req.url,"true").query; // parse query in URL into an object

    // if given a path then call the module file server and passes it
    if (path && path.length > 1) { 
        fileServer.readAndSendFile(res, "public_html"+path);
    }
    
    // if given a query request then it will call the corresponding server funtion
    if (queryObj.request) {
        query.processQuery(queryObj, res);
    }
}

myserver = http.createServer(requestHandler); //create a server object
myserver.listen(8080);