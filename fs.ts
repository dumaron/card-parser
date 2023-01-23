import { __, curry } from "ramda";
import { readFileSync, writeFileSync} from "fs";
import {flow} from "fp-ts/function";
import {split} from "fp-ts/string";

export const readFile = curry(readFileSync)(__, { encoding: 'utf-8' })
export const readFileLines = flow(readFile, split('\n'))
export const prependFileSync = (newContent: string) => (fileName: string): void => {
    const oldContent = readFile(fileName)
    writeFileSync(fileName, newContent + oldContent)
}
