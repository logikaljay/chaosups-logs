var fs = require('fs')
  , path = require('path');

module.exports = function(app) {
    app.get('/cpklogs/list', app.libs.restrict, function(req, res) {
        _readLogsDataFile(function(logs) {
            res.render('../plugins/cpklogs/views/list.ejs', { logs: logs.reverse() });
        });
    });

    app.get('/cpklogs/view/:file', app.libs.restrict, function(req, res) {
        var file = req.params.file;
        fs.readFile(path.join(__dirname, 'upload', file), function(err, fileStr) {
            res.set('Content-Type', 'text/plain');
            res.send(fileStr);
        });
    });

    app.get('/cpklogs/upload', app.libs.restrict, function(req, res) {
        res.render('../plugins/cpklogs/views/upload.ejs')
    });

    app.post('/cpklogs/upload', app.libs.restrict, function(req, res) {
        var date = req.body.date || "";
        var title = req.body.title || "";
        var pov = req.body.pov || "";
        var file = req.files.file;

        var upload = {
            date: date,
            title: title,
            pov: pov,
            file: file.originalFilename
        };
        
        console.log(path.join(__dirname, 'upload', file.originalFilename));

        fs.rename(file.path, path.join(__dirname, 'upload', file.originalFilename), function(err) {
            if (err) {
                throw err;
            }

            _readLogsDataFile(function(logs) {
                logs.push(upload);
                _writeLogsDataFile(logs, function() {
                    res.redirect('/cpklogs/list');
                });
            });
        });

        console.log(upload);
    });

    function _readLogsDataFile(fn) {
        var logs = [];
        try {
            logs = require(path.join(__dirname, 'logs.json'));
        } catch (e) {}

        fn(logs);
    }

    function _writeLogsDataFile(logs, fn) {
        fs.writeFile(path.join(__dirname, 'logs.json'), JSON.stringify(logs), function(err) {
            fn();
        });
    }
}