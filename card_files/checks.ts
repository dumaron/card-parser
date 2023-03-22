import { Command } from '../commands/Command'
import { readFile } from '../utils/fs'
import { ACTIVE_PROJECTS_FILE_PATH } from '../constants'

const activeProjects = JSON.parse(readFile(ACTIVE_PROJECTS_FILE_PATH)) as ReadonlyArray<ReadonlyArray<string>>


export const isAlreadyParsed = (content: string): boolean => {
   return content.includes('@parsed_at')
}

export const getUnknownProjects = (
   activeProjects: ReadonlyArray<ReadonlyArray<String>>,
   commands: ReadonlyArray<Command>,
): ReadonlyArray<ReadonlyArray<string>> => commands
   .map(c => c.project)
   .filter(p => !activeProjects.includes(p))


export const getErrorsFromContent = (content: string): ReadonlyArray<Error> => {
   const errors: Array<Error> = []

   if (isAlreadyParsed(content)) {
      errors.push(new Error('File already parsed'))
   }

   if (content.includes('+project:')) {
      errors.push(new Error ('File contains "+project:"'))
   }

   return errors
}

export const getErrorsFromCommands = (commands: ReadonlyArray<Command>): ReadonlyArray<Error> => {
   const errors: Array<Error> = []
   const unknownProjects = getUnknownProjects(activeProjects, commands)

   if (unknownProjects.length > 0) {
      const projectsList = unknownProjects.map(p => p.join('.')).join(', ')
      errors.push(new Error(`Used some projects that are not active (${ projectsList })`))
   }

   return errors
}

