import childProcess from 'child_process'
import { Command } from '../Command'
import { Environment } from '../../types'


export class TodoCommand extends Command {
   private readonly command: string

   constructor(s: string, env: Environment, contextProject?: string) {
      super(s, env, contextProject)
      this.command = this.cleanLine.replace('+TODO ', '')
   }

   execute() {
      const tags = this.tags.length > 0
         ? ' '+ this.tags.map(t => `+${t}`).join(' ')
         : ''
      const project = this.project !== null
         ? ` project:${this.project}`
         : ''
      childProcess.execSync(`task add ${this.command}${project}${tags}`)
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+TODO')
   }
}

