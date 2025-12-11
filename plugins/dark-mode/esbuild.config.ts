import { build } from 'esbuild'
import tailwindPlugin from 'esbuild-plugin-tailwindcss'
import reactImportConvertPlugin from './plugins/importConvert.ts'
import tailwindcssPlugin from './plugins/tailwindcss.ts'

await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/main.js',

  legalComments: 'none',

  minify: true,
  // minifyWhitespace: true,
  // minifySyntax: true,

  // jsx
  jsx: 'transform',
  jsxFactory: '_h',
  jsxFragment: '_f',
  // external: ['react'],
  logLevel: 'info',
  plugins: [reactImportConvertPlugin, tailwindPlugin({}), tailwindcssPlugin],
})
console.log('done!')
