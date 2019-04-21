http = require('http');
url = require('url');
query = require("./processQuery");
fileServer = require('./fileServer.js')


function readAndSendFile(req, res){
    var path = url.parse(req.url).pathname; // get file path from URL
    var queryObj = url.parse(req.url,"true").query; // parse query in URL into an object

    //If given a path then call the module file server and passes it
    if (path && path.length > 1) { 
        fileServer.readAndSendFile(res, "public_html"+path);
    }
    
    //If given a query request then it will call a module myModule
    if (queryObj.request) {
        console.log("query request");
        query.processQuery(queryObj, res);
    }
}

myserver = http.createServer(readAndSendFile); //create a server object
myserver.listen(8080);