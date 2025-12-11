import { log } from 'node:console'
import { readFile } from 'node:fs/promises'
import type { Plugin } from 'esbuild'

const REACT_IMPORT_REGEXP = /^import\s+([^'"]+)\s+from\s*['"]react['"]\s*;?/gm

const REACT_ALL_TYPE_REGEXP =
  /^import\s*type\s*{[^'"]+}\s*from\s*['"]react['"](\s;)?/gm

const reactImportConvertPlugin = {
  name: 'react-import-converter',
  setup(build) {
    build.onLoad({ filter: /\.[tj]sx?$/ }, async (args) => {
      let text = await readFile(args.path, 'utf8')

      let convertedText = text

      const warnings = [] as {
        text: string
        location: null
      }[]

      if (REACT_IMPORT_REGEXP.test(text)) {
        convertedText = convertedText
          .replace(REACT_ALL_TYPE_REGEXP, '')
          .replace(REACT_IMPORT_REGEXP, (match) => {
            // warnings.push({
            //   text: `Imports from 'react' are not allowed. Use global React instead.`,
            //   location: null
            // });
            const _imports = /{([^'"]+)}/gm.exec(match)

            if (!_imports || !_imports[1]?.trim()) {
              return ''
            }

            const imports = _imports[1]
              .trim()
              .split(',')
              .map((i) => i.trim())
              .filter((i) => !i.includes(' '))

            if (!imports.length) {
              return ''
            }

            return `const {${imports.join(',').trim()}} = React;\n`
          })
      }

      return {
        contents: convertedText,
        loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
        warnings,
      }
    })
  },
} as Plugin

export default reactImportConvertPlugin
