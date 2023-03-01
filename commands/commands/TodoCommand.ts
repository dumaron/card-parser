import childProcess from 'child_process'
import { Command } from '../Command'


export class TodoCommand extends Command {
   private readonly command: string

   constructor(s: string) {
      super()
      this.command = s.replace('+TODO ', '')
   }

   execute() {
      childProcess.execSync('task add ' + this.command)
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+TODO')
   }
}

