import { describe, expect, it } from '@jest/globals'
import { TodoCommand } from '../../../commands/commands/TodoCommand'
import { parseContent } from '../../../card_files/parsing'

describe('Tags parsing', () => {
   it('Should recognize the project', () => {
      const command = '+TODO "whatever" project:test #tag1 #tag2 #tag3'
      const commands = parseContent(command)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[0].project).toEqual(['test'])
      expect(commands[0].cleanLine).not.toContain('test')
      expect(commands[0].cleanLine).not.toContain('project')
   })

   it('Should split the project name by "."', () => {
      const command = '+TODO whatever project:parent.child'
      const commands = parseContent(command)

      expect(commands[0].project).toEqual(['parent', 'child'])
   })
})
