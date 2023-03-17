import { Command } from '../commands/Command'
import { hasErrors, isAlreadyParsed } from './sanity_checks'
import { TodoCommand } from '../commands/commands/TodoCommand'
import { WaitCommand } from '../commands/commands/WaitCommand'
import { prependFileSync, readFile } from '../utils/fs'
import { format } from 'date-fns'
import { EnvironmentContext, pickContexts, ProjectContext } from '../contexts'
import { Environment } from '../types'

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

   let environment: Environment = 'work'
   let project: string | undefined = undefined

   for (const line of lines) {
      const { contexts, lineWithoutContexts } = pickContexts(line)
      environment = contexts.find((s): s is EnvironmentContext => s.type === 'environment')?.value ?? environment
      const projectContext = contexts.find((s): s is ProjectContext => s.type === 'project')?.value
      const hasReset = contexts.some(s => s.type === 'reset')
      if (projectContext !== undefined) {
         project = projectContext
      } else if (hasReset) {
         project = undefined
      }

      const cs = [ TodoCommand, WaitCommand ]
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
   const fileContent = readFile(path)
   const commands = parseContent(fileContent)
   commands.forEach(command => command.execute())
   markFileAsParsed(path)
}
