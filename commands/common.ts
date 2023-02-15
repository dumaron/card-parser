import { Option } from 'fp-ts/Option'
import { Command } from './index'

export type CommandDefinition<T extends Command> = {
   fromString: (s: string) => Option<T>
   handle: (c: T) => void
   is: (c: Command) => c is T
}
