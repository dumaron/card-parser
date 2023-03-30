import { Command } from '../commands/Command'
import { getErrorsFromContent } from './checks'
import { TodoCommand } from '../commands/commands/TodoCommand'
import { WaitCommand } from '../commands/commands/WaitCommand'
import { prependFileSync, readFile } from '../utils/fs'
import { format } from 'date-fns'
import { EnvironmentContext, pickContexts, ProjectContext } from '../contexts/context'
import { Environment } from '../types'
import { AddProjectCommand } from '../commands/commands/AddProjectCommand'
import { getErrorsFromCommands } from '../commands/checks'


export const parseContent = (content: string): ReadonlyArray<Command> => {

   const lines = content.split('\n')
   const commands: Array<Command> = []

   let environment: Environment = 'work'
   let project: string | undefined = undefined

   for (const line of lines) {
      const {contexts, lineWithoutContexts} = pickContexts(line)
      environment = contexts.find((s): s is EnvironmentContext => s.type === 'environment')?.value ?? environment
      const projectContext = contexts.find((s): s is ProjectContext => s.type === 'project')?.value
      const hasReset = contexts.some(s => s.type === 'reset')

      if (projectContext !== undefined) {
         project = projectContext
      } else if (hasReset) {
         project = undefined
      }

      const cs = [ TodoCommand, WaitCommand, AddProjectCommand ]
      cs.forEach(command => {
         if (command.stringMatches(lineWithoutContexts)) {
            commands.push(new command(lineWithoutContexts, environment, project))
         }
      })
   }

   return commands
}

export const markFileAsParsed =
   (path: string) => prependFileSync(path, `@parsed_at:${ format(new Date(), 'yyyy-MM-dd') }\n`)

export const parseFile = (path: string): void => {
   let errors: Array<Error> = []

   const fileContent = readFile(path)
   errors = errors.concat(getErrorsFromContent(fileContent))

   const commands = parseContent(fileContent)
   errors = errors.concat(getErrorsFromCommands(commands))

   if (errors.length > 0) {
      console.error(`Errors found in file:\n${ errors.map(e => e.message).join('\n') }`)
      process.exit(1)
   } else {
      commands.forEach(command => command.execute())
      markFileAsParsed(path)
   }
}
