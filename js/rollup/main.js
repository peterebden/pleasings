const path = require('path');
const process = require('process');
const rollup = require('rollup');

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// see below for details on the options
const inputOptions = {
    input: process.env.SRCS_JS,
    external: [],
    plugins: [
	resolve(),
	commonjs()
    ]
};
const outputOptions = {
    format: 'iife',
    name: path.parse(process.env.OUTS_JS).name,
    sourcemap: true,
    sourcemapFile: process.env.OUTS_MAP
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.imports); // an array of external dependencies
  console.log(bundle.exports); // an array of names exported by the entry point
  console.log(bundle.modules); // an array of module objects

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();
