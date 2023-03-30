import { Command } from './Command'
import { readFile } from '../utils/fs'
import { ACTIVE_PROJECTS_FILE_PATH } from '../constants'
import { serializeProject } from '../utils/projects'
import { Project } from '../types'

const activeProjects = JSON.parse(readFile(ACTIVE_PROJECTS_FILE_PATH)) as ReadonlyArray<Project>

export const getUnknownProjects = (
   activeProjects: ReadonlyArray<Project>,
   commands: ReadonlyArray<Command>,
): ReadonlyArray<string> => {
   const serializedActiveProjects = activeProjects.map(serializeProject)
   const serializedProjectsFromCommands = commands
      .map(c => c.project)
      .filter((p): p is ReadonlyArray<string> => p !== undefined)
      .map(serializeProject)

   return serializedProjectsFromCommands
      .filter(p => !serializedActiveProjects.includes(p))
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
