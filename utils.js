exports.sendJSONOBJ = function(res,status,data) {
    res.writeHead(status, { "Content-Type" : "application/json" });
    res.write(JSON.stringify(data));
    res.end();
}

