var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var lrserver = require('tiny-lr')();
var lrMiddleware = require('connect-livereload');
var webpackConf = require('./webpack.config');

var lrport = 8082;
var webport = 8080;
var compiler = webpack(webpackConf);
var app = express();

var triggerLiveReloadChanges = function() {
    lrserver.changed({
        body: {
            files: [webpackConf.output.filename]
        }
    });
};

lrserver.listen(lrport, triggerLiveReloadChanges);
compiler.plugin('done', triggerLiveReloadChanges);

app.use(lrMiddleware({ port: lrport }));
app.use(webpackMiddleware(compiler, { watchOptions: { poll: true }}));

app.get(/.+bundle.js$/, function (req, res) {
  res.redirect('/bundle.js')
});

app.get(/^(?!$|bundle.js$)/, function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(webport, function () {
  console.log('Listening on port 8080!');
});
