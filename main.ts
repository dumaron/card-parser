import { flow } from 'fp-ts/function'
import * as RA from 'fp-ts/ReadonlyArray'
import { commands, toCommands } from './commands'
import { readFileLines } from './fs'
import * as O from 'fp-ts/Option'
import { log } from './misc'
import { isAlreadyParsed, markFileAsParsed } from './card'


const handleCommands = flow(
   RA.map(toCommands),
   RA.compact,
   RA.map(
      command => {
         for (const definition of commands) {
            if (definition.is(command)) {
               // @ts-ignore TODO learn how to fix this type
               definition.handle(command)
               return
            }
         }
      }
   )
)


const parseCommandFile = flow(
   readFileLines,
   O.fromPredicate(isAlreadyParsed),
   O.fold(
      log('File already parsed, nothing to do'),
      handleCommands,
   ),
)

const main = (fileName: string): void => {
   parseCommandFile(fileName)
   markFileAsParsed(fileName)
}


main(process.argv[2])
