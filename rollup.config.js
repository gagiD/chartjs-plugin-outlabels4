import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

import fs from 'fs'
const packageJson = JSON.parse(fs.readFileSync('./package.json'))

const isDependency = v =>
  Object.keys(packageJson.dependencies || {}).some(
    e => e === v || v.startsWith(`${e}/`)
  )
const isPeerDependency = v =>
  Object.keys(packageJson.peerDependencies || {}).some(
    e => e === v || v.startsWith(`${e}/`)
  )

const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers',
}

const banner = `/*!
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.author.url}
 * (c) ${new Date().getFullYear()} ${packageJson.author.name}
 * @license ${packageJson.license}
 */`

const commonOutput = {
  sourcemap: true,
  banner,
  globals: globals,
}

const base = {
  input: './src/index.ts',
  external: v => isDependency(v) || isPeerDependency(v),
  plugins: [resolve(), typescript()],
}

export default [
  {
    ...base,
    output: {
      ...commonOutput,
      file: packageJson.module,
      format: 'esm',
    },
  },
  {
    ...base,
    output: {
      ...commonOutput,
      file: packageJson.require,
      format: 'cjs',
    },
  },
  {
    ...base,
    input: './src/index.umd.ts',
    output: [
      {
        ...commonOutput,
        file: packageJson.umd,
        format: 'umd',
        name: packageJson.global,
      },
      {
        ...commonOutput,
        file: packageJson.unpkg,
        format: 'umd',
        name: packageJson.global,
        plugins: [terser()],
      },
    ],
    external: v => isPeerDependency(v),
  },
  {
    ...base,
    output: {
      ...commonOutput,
      file: packageJson.types,
      format: 'es',
    },
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          skipLibCheck: true,
          skipDefaultLibCheck: true,
        },
      }),
    ],
  },
]
