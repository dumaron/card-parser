import childProcess from 'child_process'
import { Command } from '../Command'


export class TodoCommand extends Command {
   private readonly command: string

   constructor(s: string) {
      super(s)
      this.command = this.cleanLine.replace('+TODO ', '')
   }

   execute() {
      const tags = this.tags.length > 0
         ? ' '+ this.tags.map(t => `+${t}`).join(' ')
         : ''
      const project = this.project.length > 0
         ? ` project:${this.project.join('.')}`
         : ''
      childProcess.execSync(`task add ${this.command}${project}${tags}`)
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+TODO')
   }
}

