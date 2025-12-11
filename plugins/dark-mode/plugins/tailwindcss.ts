import type { Plugin } from 'esbuild'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

const tailwindcssPlugin = {
  name: 'tail',
  setup(build) {
    build.onEnd(async () => {
      const outfile = build.initialOptions.outfile

      if (!outfile) {
        return
      }

      const cssFile = outfile.substring(0, outfile.length - 2) + 'css'

      if (!existsSync(cssFile)) {
        console.log('no css found')

        return
      }

      let css = (await readFile(cssFile)).toString()

      // Remove single lines

      css = css.replace(
        /(@layer\s+[\w]+\s*(,\s*\w+)*;)|(@property[^}]*)}/gis,
        ''
      )

      // Remove @layer components { ... }
      css = css.replace(/@layer\s+components\s*\{[^}]*\}/gs, '')

      // Remove nested @layer base with proper bracket matching
      css = removeNestedLayer(css, 'theme')
      css = removeNestedLayer(css, 'base')
      css = removeNestedLayer(css, 'components')
      css = removeNestedLayer(css, 'properties')

      // Clean up multiple newlines
      css = css.replace(/\n{3,}/g, '\n\n')

      // Write back
      await writeFile(cssFile, css.trim())
    })
  },
} satisfies Plugin

// Helper to remove nested @layer blocks with proper bracket matching
const removeNestedLayer = (css: string, layerName: string) => {
  const regex = new RegExp(`@layer\\s+${layerName}\\s*\\{`, 'g')
  let match

  while ((match = regex.exec(css)) !== null) {
    const startIndex = match.index
    const openBrace = match.index + match[0].length - 1

    // Find matching closing brace
    let depth = 1
    let i = openBrace + 1

    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++
      if (css[i] === '}') depth--
      i++
    }

    // Remove the entire @layer block
    css = css.slice(0, startIndex) + css.slice(i)
    regex.lastIndex = startIndex
  }

  return css
}

export default tailwindcssPlugin
