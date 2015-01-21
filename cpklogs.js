var path = require('path');

module.exports = function(app) {
    // app.set('views', path.join(__dirname, 'cpklogs/views'));

    app.locals.plugins = app.locals.plugins || [];

    app.locals.plugins.push({
        text: "CPK Logs",
        url: "/cpklogs/list"
    });

    require('./cpklogs/index.js')(app);
}