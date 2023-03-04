import { describe, expect, it } from '@jest/globals'
import { _parseCommandFile } from '../../../main'
import { TodoCommand } from '../../../commands/commands/TodoCommand'

describe('Tags parsing', () => {
   it('Should recognize the project', () => {
      const command = '+TODO "whatever" project:test #tag1 #tag2 #tag3'
      const commands = _parseCommandFile(command)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[0].project).toEqual(['test'])
      expect(commands[0].cleanLine).not.toContain('test')
      expect(commands[0].cleanLine).not.toContain('project')
   })

   it('Should split the project name by "."', () => {
      const command = '+TODO whatever project:parent.child'
      const commands = _parseCommandFile(command)

      expect(commands[0].project).toEqual(['parent', 'child'])
   })
})
