// This is a webpack config used for bundling Webpack and other third-party modules.
const path = require('path');
const process = require('process');
const requireDynamic = require('./require_dynamic.js');
const FileReplacePlugin = require("replace-in-file-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: process.env.SRCS_MAIN.split(' ').map(src => './' + src),
    target: 'node',
    module: {
	rules: [{
	    test: /\.json$/,
	    use: [{ loader: 'json-loader' }],
	}],
    },
    plugins: [
        new FileReplacePlugin([{
            dir: 'third_party/js/webpack/webpack/lib/node',
            files: ['NodeSourcePlugin.js'],
            rules: [{
                search: '/require.resolve\("..\/..\/(buildin\/global.js")\)/',
                replace: (match, p1) => '"' + p1 + '"',
            }]
        }]),
	new webpack.BannerPlugin({banner: `#!${process.env.TOOLS_NODE}`, raw: true}),
    ],
    node: {
	__dirname: true,
	__filename: true,
	process: false,
	stream: true,
	zlib: true,
	Buffer: false,
    },
    output: {
	path: path.dirname(process.env.OUT),
        filename: path.basename(process.env.OUT),
    },
    resolve: {
	modules: ['./', './third_party/js/webpack'],
    },
    resolveLoader: {
	modules: ['./', './third_party/js/webpack'],
    },
};
