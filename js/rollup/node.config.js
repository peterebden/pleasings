const path = require('path');
const process = require('process');

import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default {
    input: process.env.SRCS_JS,
    external: [],
    plugins: [
	resolve(),
	json()
    ],
    output: {
	format: 'cjs',
	name: path.parse(process.env.OUTS_JS).name,
	banner: '#!/usr/bin/env node',
    }
};
