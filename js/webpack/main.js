const process = require('process');
const webpack = require('webpack');
const Stats = require('webpack/lib/Stats');
const WebPackConfig = require('./config.js');
const Worker = require('./worker.js');

// Prints results after compilation completes.
// Function never returns, the process exits with an appropriate error code.
const handleResults = function(err, stats) {
    handleErrors(err);
    const info = stats.toJson();
    if (stats.hasErrors()) {
	console.error(info.errors.join('\n'));
	process.exit(1);
    }
    if (stats.hasWarnings()) {
	console.warn(info.warnings.join('\n'));
    }
    process.exit(0);
};

// Similarly handles errors. Exits if there is an error.
const handleErrors = function(err) {
    if (err) {
	console.error(err.stack || err);
	if (err.details) {
	    console.error(err.details);
	}
	process.exit(1);
    }
};

const worker = new Worker(function(params) {
    console.log('Received compile request for %s', JSON.stringify(params));
    return ['stuffed'];
});
worker.run();

const srcs = (process.env.SRCS_JS || process.env.SRCS).split(' ');
const out = process.env.OUTS_JS || 'dummy.js';
const compiler = webpack(WebPackConfig({
    srcs: srcs,
    out: out,
    srcsManifest: process.env.SRCS_MANIFEST ? process.env.SRCS_MANIFEST.split(' ') : [],
    srcsDll: process.env.SRCS_DLL ? process.env.SRCS_DLL.split(' ') : [],
    outManifest: process.env.OUTS_MANIFEST,
    tmpDir: process.env.TMP_DIR,
    pkg: process.env.PKG,
    buildConfig: process.env.BUILD_CONFIG,
}));

// Very temporary solution to try out incremental compilation.
if (process.env.LIB) {
    compiler.plugin('make', (compilation, callback) => {
	srcs.forEach((src, i) => {
	    const out = src + '.dummy.js';
	    const childCompiler = compilation.createChildCompiler(out, {
		filename: out
	    });
	    childCompiler.context = compiler.context;
	    childCompiler.apply(new webpack.PrefetchPlugin(src));
	    childCompiler.runAsChild((err, entries, childCompilation) => {
		callback(err);
	    });
	});
    });
}

compiler.run(handleResults);
