import { readFile, readdir, writeFile } from 'fs/promises'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import merge from 'lodash.merge'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = resolve(__dirname, './locales')
const enJsonName = '/en.json'
try {
  const contents = await readFile(filePath + enJsonName, { encoding: 'utf8' })
  const enjson = JSON.parse(contents)
  const files = await readdir(filePath)
  for (const file of files) {
    if (file === enJsonName) continue
    let langjson = JSON.parse(await readFile(resolve(filePath, file), { encoding: 'utf8' }))
    // Make sure the key of the language file is the same as en.json.
    langjson = merge(enjson, langjson)
    await writeFile(resolve(filePath, file), JSON.stringify(langjson, null, 2))
  }
} catch (error) {
  console.log(error)
}
