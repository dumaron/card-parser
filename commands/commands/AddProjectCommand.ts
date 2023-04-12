import { writeFileSync } from 'fs'
import { ACTIVE_PROJECTS_FILE_PATH } from '../../constants'
import { Command } from '../Command'
import { Environment } from '../../types'
import { readFile } from '../../utils/fs'

export class AddProjectCommand extends Command {
   public readonly projectFromString: string

   constructor(s: string, env: Environment, contextProject?: string) {
      super(s, env, contextProject)
      this.projectFromString = this.cleanLine
         .replace('+PRJ ', '')
         .trim()
   }

   execute() {
      const projects = JSON.parse(readFile(ACTIVE_PROJECTS_FILE_PATH)) as ReadonlyArray<string>
      const newProjects = projects.concat([this.projectFromString])
      writeFileSync(ACTIVE_PROJECTS_FILE_PATH, JSON.stringify(newProjects, null, 2))
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+PRJ')
   }
}
