import { flow } from 'fp-ts/function'
import { filter, map, some } from 'fp-ts/ReadonlyArray'
import { cond, forEach } from 'ramda'
import { isTodoCommand, isWaitCommand, takeCommandStrings, toCommands, TodoCommand, WaitCommand } from './commands'
import { format } from 'date-fns'
import { prependFileSync, readFileLines } from './fs'
import { appendFileSync } from 'fs'
import { WAITING_FILE_PATH } from './constants'
import * as childProcess from 'child_process'
import { startsWith } from 'fp-ts/string'


const appendWait = flow(
   ({command}: WaitCommand) => `- [${ format(new Date(), 'yyyy-MM-dd') }] ${ command }\n`,
   str => appendFileSync(WAITING_FILE_PATH, str, {flag: 'a'}),
)

const sendToTaskWarrior = (todo: TodoCommand): void => {
   childProcess.execSync('task ' + todo.command)
}


const handleCommands = flow(
   filter(takeCommandStrings),
   map(toCommands),
   forEach(cond([
      [ isTodoCommand, sendToTaskWarrior ],
      [ isWaitCommand, appendWait ],
   ])),
)

const isAlreadyParsed = some(startsWith('@parsed_at'))

const parseCommandFile = (fileName: string): void => {
   const content = readFileLines(fileName)

   if (isAlreadyParsed(content)) {
      console.log('File already parses, nothing to do')
      return
   }
   handleCommands(content)
}


const markFileAsParsed = prependFileSync(`@parsed_at:${ format(new Date(), 'yyyy-MM-dd') }\n`)

const main = (fileName: string): void => {
   parseCommandFile(fileName)
   markFileAsParsed(fileName)
}

main('test.txt')
