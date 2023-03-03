import childProcess from 'child_process'
import { Command } from '../Command'


export class TodoCommand extends Command {
   private readonly command: string

   constructor(s: string) {
      super(s)
      this.command = this.cleanLine.replace('+TODO ', '')
   }

   execute() {
      const tags = this.tags.map(t => `+${t}`).join(' ')
      childProcess.execSync(`task add ${this.command} ${tags}`)
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+TODO')
   }
}

