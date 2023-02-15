import { CommandDefinition } from '../common'
import { replace, startsWith, trim } from 'fp-ts/string'
import { flow } from 'fp-ts/function'
import childProcess from 'child_process'
import * as O from 'fp-ts/Option'

export type TodoCommand = {
   _type: 'todo',
   command: string
}

const sendToTaskWarrior = (todo: TodoCommand): void => {
   childProcess.execSync('task add ' + todo.command)
}

const startingParticle = '+TODO'
const type = 'todo'


export const todoDefinition: CommandDefinition<TodoCommand> = {
   fromString: flow(
      O.fromPredicate(startsWith(startingParticle)),
      O.map(replace(startingParticle, '')),
      O.map(trim),
      O.map(command => ({
         _type: type,
         command,
      } as const)),
   ),
   handle: sendToTaskWarrior,
   is: (c): c is TodoCommand => c._type === type,
}
