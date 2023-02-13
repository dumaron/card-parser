import { replace, startsWith, trim } from 'fp-ts/string'
import { absurd, pipe } from 'fp-ts/function'
import { some } from 'fp-ts/ReadonlyArray'
import { cond, T } from 'ramda'

export type TodoCommand = {
   _type: 'todo',
   command: string
}

export type WaitCommand = {
   _type: 'wait',
   command: string,
}

export type Command =
   | TodoCommand
   | WaitCommand


// TODO maybe create a NewType to define a CommandString, a refinement of String?

export const isTodoString = startsWith('+TODO')
export const isWaitString = startsWith('+WAIT')
export const takeCommandStrings = (s: string) => pipe(
   [ isTodoString, isWaitString ],
   some(fn => fn(s)),
)

export const toTodoCommand = (s: string): TodoCommand => ({
   _type: 'todo',
   command: pipe(s, replace('+TODO', ''), trim),
})
export const toWaitCommand = (s: string): WaitCommand => ({
   _type: 'wait',
   command: pipe(s, replace('+WAIT', ''), trim),
})

// TODO learn how to fix this type
export const toCommands: (s: string) => Command = cond([
   [ isTodoString, toTodoCommand ],
   // @ts-ignore
   [ isWaitString, toWaitCommand ],
   // @ts-ignore
   [ T, absurd ], // would this be able to tell Typescript that is always possible, with this function to take a command from a CommandString?
])

export const isTodoCommand = (c: Command): c is TodoCommand => c._type === 'todo'
export const isWaitCommand = (c: Command): c is WaitCommand => c._type === 'wait'
