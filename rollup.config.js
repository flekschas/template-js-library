import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const basePlugins = [
  resolve({
    mainFields: ['module', 'main']
  }),
  commonjs({ sourceMap: false }),
  json()
];

const configurator = (file, format, plugins = []) => ({
  input: 'src/index.js',
  output: {
    name: 'createPackageName',
    format,
    file,
    globals: {}
  },
  plugins: [...basePlugins, ...plugins],
  external: []
});

const devConfig = configurator('dist/package-name.js', 'umd', [
  babel(),
  filesize(),
  visualizer()
]);

const prodConfig = configurator('dist/package-name.min.js', 'umd', [
  babel(),
  terser()
]);

const esmConfig = configurator('dist/package-name.esm.js', 'esm', [
  filesize()
]);

export default [devConfig, prodConfig, esmConfig];
