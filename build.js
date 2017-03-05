var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var version = process.argv[2];

if (version) {
  var filename = path.join(__dirname, 'package.json');
  var contentString = fs.readFileSync(filename);
  var contentObject = JSON.parse(contentString);
  contentObject.version = version;

  var newContentString = JSON.stringify(contentObject);
  fs.writeFileSync(filename, newContentString);
}

var config = require('./webpack.config');
webpack(config, function (err, stats) {
  if (err) throw err;
  if (stats.hasErrors()) {
    console.log('WebPack compiler error!');
    console.log(stats.toString({colors: true}));
    process.exit(1);
  } else {
    console.log('WebPack compilation succeeded');
  }
});
