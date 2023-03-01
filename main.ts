import { readFile } from './fs'
import { markFileAsParsed } from './card'
import { TodoCommand } from './commands/commands/TodoCommand'
import { WaitCommand } from './commands/commands/WaitCommand'
import { Command } from './commands/Command'


const parseCommandFile = (content: string): ReadonlyArray<Command> => {
   const lines = content.split('\n')
   const commands: Array<Command> = []

   if (lines.some(line => line.startsWith('@parsed_at'))) {
      console.log('Already parsed - exiting')
      process.exit(1)
   }

   for (const line of lines) {

      if (TodoCommand.stringMatches(line)) {
         commands.push(new TodoCommand(line))
      }

      if (WaitCommand.stringMatches(line)) {
         commands.push(new WaitCommand(line))
      }
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
