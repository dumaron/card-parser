import { readFile } from './fs'
import { markFileAsParsed } from './card'
import { TodoCommand } from './commands/commands/TodoCommand'
import { WaitCommand } from './commands/commands/WaitCommand'
import { Command } from './commands/Command'
import { hasErrors, isAlreadyParsed } from './card_file/sanity_checks'


const parseCommandFile = (content: string): ReadonlyArray<Command> => {
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
      [TodoCommand, WaitCommand].forEach(command => {
         if (command.stringMatches(line)) {
          commands.push(new command(line))
         }
      })
   }

   return commands
}

const main = (path: string): void => {
   const fileContent = readFile(path)

   const commands = parseCommandFile(fileContent)
   commands.forEach(command => command.execute())
   markFileAsParsed(path)
}


if (require.main === module) {
   const path = process.argv[2]
   main(path)
}

export const _parseCommandFile = parseCommandFile
