import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import url from 'rollup-plugin-url'
import progress from 'rollup-plugin-progress'
import pkg from './package.json'

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'styled-components'],
  plugins: [
    progress(),
    url({
      limit: 5 * 1024, // inline files smaller than 5k
      publicPath: '',
      include: ['**/*.svg', '**/*.png', '**/*.woff', '**/*.woff2'],
      emitFiles: true,
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
  ],
}
