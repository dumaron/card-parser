import { flow } from 'fp-ts/function'
import { filter, map } from 'fp-ts/ReadonlyArray'
import { __, cond, forEach } from 'ramda'
import { isTodoCommand, isWaitCommand, takeCommandStrings, toCommands } from './commands';
import { format } from 'date-fns'
import { prependFileSync, readFileLines } from "./fs";


const handleCommands = flow(
    readFileLines,
    filter(takeCommandStrings),
    map(toCommands),
    forEach(cond([
        [isTodoCommand, console.log],
        [isWaitCommand, console.log],
    ]))
)

const markFileAsParsed = prependFileSync(`@parsed_at:${format(new Date(), 'yyyy-MM-dd')}\n`)

const main = (fileName: string): void => {
    handleCommands(fileName)
    markFileAsParsed(fileName)
}

main('test.txt')
