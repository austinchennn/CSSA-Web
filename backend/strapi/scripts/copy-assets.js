/**
 * Copies non-TypeScript assets (schema.json, .graphql) from src/ to dist/
 * after TypeScript compilation. Run this after `tsc` to ensure Strapi can
 * find content type schemas and GraphQL extensions at runtime.
 */
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const src = path.join(root, 'src')
const dist = path.join(root, 'dist', 'src')

function copyRecursive(srcDir, destDir, filter) {
  if (!fs.existsSync(srcDir)) return
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath, filter)
    } else if (filter(entry.name)) {
      fs.mkdirSync(destDir, { recursive: true })
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: dist/src/${path.relative(src, srcPath)}`)
    }
  }
}

// Copy schema.json and .graphql files from src/ to dist/src/
copyRecursive(src, dist, (name) => name.endsWith('.json') || name.endsWith('.graphql'))
