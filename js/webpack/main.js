const process = require('process');
const webpack = require('webpack');

const buildBundle = function() {
  // TODO(peter): This is a horrific hack to get around webpack overriding require().
  //              There is bound to be a nicer way once I have internet to look it up...
  const WebPackConfig = eval("require(process.env.TOOLS_CONFIG);");
  const compiler = webpack(WebPackConfig(webpack));
  compiler.run(function(err, stats) {
    if (stats.compilation.errors.length > 0) {
      throw Error(stats.compilation.errors.join('\n'));
    }
  });
};

buildBundle();
