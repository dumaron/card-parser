import { Command } from './Command'
import { readFile } from '../utils/fs'
import { ACTIVE_PROJECTS_FILE_PATH } from '../constants'
import { AddProjectCommand } from './commands/AddProjectCommand'

const activeProjects = JSON.parse(readFile(ACTIVE_PROJECTS_FILE_PATH)) as ReadonlyArray<string>

export const getUnknownProjects = (
   activeProjects: ReadonlyArray<string>,
   commands: ReadonlyArray<Command>,
): ReadonlyArray<string> => {
   const newProjects = commands
      .filter((c: Command): c is AddProjectCommand => c instanceof AddProjectCommand)
      .map(c => c.projectFromString)

   const validProjects = activeProjects.concat(newProjects)

   return commands
      .map(c => c.project)
      .filter((p): p is string => p !== null)
      .filter(p => !validProjects.includes(p))
}

export const getErrorsFromCommands = (commands: ReadonlyArray<Command>): ReadonlyArray<Error> => {
   const errors: Array<Error> = []
   const unknownProjects = getUnknownProjects(activeProjects, commands)

   if (unknownProjects.length > 0) {
      const projectsList = unknownProjects.join(', ')
      errors.push(new Error(`Used some projects that are not active (${ projectsList })`))
   }

   return errors
}
