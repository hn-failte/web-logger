import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'

const isDev = process.env.NODE_ENV !== 'production'

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/WebLogger.esm.js',
      format: 'es',
    },
    {
      file: 'dist/WebLogger.js',
      format: 'umd',
      name: 'WebLogger',
      exports: 'named',
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    resolve({
      extensions: ['.ts', '.tsx'],
      modulesOnly: true,
    }),
    json(),
    commonjs(),
    eslint({
      include: ['./src/**/**.ts'],
      exclude: ['node_modules/**'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    !isDev && terser(),
  ],
}
