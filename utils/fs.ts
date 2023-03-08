import { readFileSync, writeFileSync } from 'fs'

export const readFile = (path: string) => readFileSync(path, {encoding: 'utf-8'})

export const prependFileSync = (path: string, newContent: string) => writeFileSync(path, newContent + readFile(path))
