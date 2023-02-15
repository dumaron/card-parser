import { TodoCommand, todoDefinition } from './commands/todo'
import { WaitCommand, waitDefinition } from './commands/wait'
import * as RA from 'fp-ts/ReadonlyArray'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'

export type Command =
   | TodoCommand
   | WaitCommand

export const commands = [
   todoDefinition,
   waitDefinition,
]


export const toCommands = (s: string): O.Option<Command> => pipe(
   commands,
   RA.map(c => c.fromString(s)),
   // @ts-ignore TODO learn how to fix this type
   RA.compact,
   RA.head,
)


