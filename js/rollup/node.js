const rollup = require('rollup');
const config = require('./node.config');


async function build() {
  // create a bundle
  const bundle = await rollup.rollup(config);
  // or write the bundle to disk
  await bundle.write(config.output);
}

build();