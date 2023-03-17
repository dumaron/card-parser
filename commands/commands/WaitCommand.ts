import { format } from 'date-fns'
import { appendFileSync } from 'fs'
import { WAITING_FILE_PATH } from '../../constants'
import { Command } from '../Command'
import { Environment } from '../../types'

export class WaitCommand extends Command {
   private readonly waitText: string

   constructor(s: string, env: Environment, contextProject?: string) {
      super(s, env, contextProject)
      this.waitText = this.cleanLine.replace('+WAIT ', '')
   }

   execute() {
      const mdLine = `- [${ format(new Date(), 'yyyy-MM-dd') }] ${ this.waitText }\n`
      appendFileSync(WAITING_FILE_PATH, mdLine, {flag: 'a'})
   }

   static stringMatches(s: string): boolean {
      return s.startsWith('+WAIT')
   }
}
