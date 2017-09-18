const rollup = require('rollup');
import 'config';

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(config);

  console.log(bundle.imports); // an array of external dependencies
  console.log(bundle.exports); // an array of names exported by the entry point
  console.log(bundle.modules); // an array of module objects

  // or write the bundle to disk
  await bundle.write(config.output);
}

build();
