module.exports = function(app) {
    app.get('/cpklogs/list', app.libs.restrict, function(req, res) {
        res.send("hello world!");
    });
}