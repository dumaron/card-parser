import { Command } from '../commands/Command'
import { hasErrors, isAlreadyParsed } from './sanity_checks'
import { TodoCommand } from '../commands/commands/TodoCommand'
import { WaitCommand } from '../commands/commands/WaitCommand'
import { prependFileSync, readFile } from '../utils/fs'
import { format } from 'date-fns'

export const parseContent = (content: string): ReadonlyArray<Command> => {
   if (isAlreadyParsed(content)) {
      console.log('Already parsed - exiting')
      process.exit(1)
   }

   if (hasErrors(content)) {
      console.log('Has errors - exiting')
      process.exit(1)
   }

   const lines = content.split('\n')
   const commands: Array<Command> = []

   for (const line of lines) {
      [ TodoCommand, WaitCommand ].forEach(command => {
         if (command.stringMatches(line)) {
            commands.push(new command(line))
         }
      })
   }

   return commands
}

export const markFileAsParsed =
   (path: string) => prependFileSync(path, `@parsed_at:${ format(new Date(), 'yyyy-MM-dd') }\n`)

export const parseFile = (path: string): void => {
   const fileContent = readFile(path)
   const commands = parseContent(fileContent)
   commands.forEach(command => command.execute())
   markFileAsParsed(path)
}
