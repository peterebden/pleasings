const path = require('path');
const process = require('process');

import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: process.env.SRCS_JS,
    external: [],
    plugins: [
	resolve(),
	json(),
	commonjs(),
	babel({
	    presets: [ 'es2015-rollup' ],
	    exclude: [ 'third_party/**' ],
	}),
    ],
    output: {
	format: 'cjs',
	name: path.parse(process.env.OUTS_JS).name,
	banner: '#!/usr/bin/env node',
    }
};