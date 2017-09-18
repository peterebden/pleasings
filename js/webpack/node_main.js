const process = require('process');
const webpack = require('webpack');
const WebPackConfig = require('./node_config.js');

const buildBundle = function() {
  const compiler = webpack(WebPackConfig());
  compiler.run(function(err, stats) {
    if (stats.compilation.errors.length > 0) {
      throw Error(stats.compilation.errors.join('\n'));
    }
  });
};

buildBundle();
