const path = require('path');
const process = require('process');

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: process.env.SRCS_JS,
    external: [],
    plugins: [
	resolve(),
	commonjs()
    ],
    output: {
	format: 'cjs',
	name: path.parse(process.env.OUTS_JS).name,
	banner: '#!/usr/bin/env node',
    }
};
