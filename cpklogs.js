var plugin = exports = module.exports = {};
var app;

plugin.name = "CPK Logs";
plugin.version = "1.0";
plugin.nav = {
    text: "CPK Logs",
    url: "/cpklogs/list"
};

plugin.load = function(app) {   
    var cpklogs = require('cpklogs')(app);
    cpklogs.registerRoutes(app);
}
