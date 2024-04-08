import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve'

const IS_DEV_MODE = process.env.NODE_ENV === 'development';
const LIBRARY_NAME = 'skygl';
const OUTPUT_DIR = 'dist/';
const OUTPUT_ESM = {
  file: `${OUTPUT_DIR}bundle.esm.js`,
  format: 'esm',
  sourcemap: true,
};
const OUTPUT_CJS = {
  file: `${OUTPUT_DIR}bundle.cjs.js`,
  format: 'cjs',
  sourcemap: true,
};
const OUTPUT_IIFE = {
  file: `${OUTPUT_DIR}bundle.iife.js`,
  format: 'iife',
  name: LIBRARY_NAME,
  sourcemap: true,
};
const OUTPUT_UMD = {
  file: `${OUTPUT_DIR}bundle.umd.js`,
  format: 'umd',
  name: LIBRARY_NAME,
  sourcemap: true,
};

const output = [];
const plugins = [resolve(), commonjs()];


if (IS_DEV_MODE) {
  output.push(OUTPUT_IIFE);
  plugins.push(serve({
    contentBase: ['dist', 'examples'],
    port: 3000,
  }));
  // plugins.push(html());
} else {
  output.push(OUTPUT_ESM, OUTPUT_CJS, OUTPUT_IIFE, OUTPUT_UMD);
}

export default {
  input: 'src/index.mjs',
  output,
  plugins,
};
