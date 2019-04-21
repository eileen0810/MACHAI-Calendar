// needed Modules
var fs = require('fs');
var path = require('path');

// Serves files
exports.readAndSendFile = function (res, file) {
    var rs = fs.createReadStream(file);
    var ct = content_type_for_path(file);
    res.writeHead(200, { "Content-Type" : ct });

    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        return;
    });

    rs.on('readable', () => {
        var d = rs.read();
        if (d) {
            res.write(d);
        }
    });

    rs.on('end', () => {
        res.end();  // we're done!!!
    });
}

// returns content type based on file given
function content_type_for_path (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}