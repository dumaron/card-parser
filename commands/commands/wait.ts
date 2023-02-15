import { CommandDefinition } from '../common'
import { replace, startsWith, trim } from 'fp-ts/string'
import { flow } from 'fp-ts/function'
import { format } from 'date-fns'
import { appendFileSync } from 'fs'
import { WAITING_FILE_PATH } from '../../constants'
import * as O from 'fp-ts/Option'

export type WaitCommand = {
   _type: 'wait',
   command: string,
}


const appendToWaitFile = flow(
   ({command}: WaitCommand) => `- [${ format(new Date(), 'yyyy-MM-dd') }] ${ command }\n`,
   str => appendFileSync(WAITING_FILE_PATH, str, {flag: 'a'}),
)

const startingParticle = '+WAIT'
const type = 'wait'

export const waitDefinition: CommandDefinition<WaitCommand> = {
   fromString: flow(
      O.fromPredicate(startsWith(startingParticle)),
      O.map(replace(startingParticle, '')),
      O.map(trim),
      O.map(command => ({
         _type: type,
         command,
      } as const)),
   ),
   handle: appendToWaitFile,
   is: (c): c is WaitCommand => c._type === type,
}
