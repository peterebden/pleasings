// This is the config for building Webpack itself.
// It's distinct from the config that we use for building JS for the web.
const path = require('path');
const process = require('process');
const webpack = require('webpack');

// Map plz's standard build config names to something meaningful to webpack.
const buildConfig = process.env.BUILD_CONFIG;
const nodeEnv = buildConfig === 'opt' ? 'production' : 'development';

module.exports = {
    entry: process.env.SRCS_JS.split(' ').map(src => './' + src),
    target: 'node',
    output: {
	path: process.env.TMP_DIR,
        filename: path.basename(process.env.OUTS_JS),
    },
    module: {
	rules: [{
	    test: /main.js$/,
	    loaders: ['shebang-loader', 'babel-loader'],
	}, {
	    test: /\.(js|jsx)$/,
	    loader: 'babel-loader',
	    query: {
		presets: [
		    'es2015',
		],
		plugins: []
	    },
	}]
    },
    resolve: {
	modules: process.env.NODE_PATH.split(':'),
    },
    resolveLoader: {
	modules: process.env.NODE_PATH.split(':'),
    },
    plugins: [
	new webpack.DefinePlugin({
	    'process.env': {
		NODE_ENV: JSON.stringify(nodeEnv)
	    }
	})
    ],
};
