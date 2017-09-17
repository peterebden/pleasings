const process = require('process');
const webpack = require('webpack');
const WebPackConfig = require(process.env.TOOLS_CONFIG);

const buildBundle = function() {
  const compiler = webpack(WebPackConfig());
  compiler.run(function(err, stats) {
    if (stats.compilation.errors.length > 0) {
      throw Error(stats.compilation.errors.join('\n'));
    }
  });
};

buildBundle();
