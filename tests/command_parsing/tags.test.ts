import { describe, expect, it } from '@jest/globals'
import { _parseCommandFile } from '../../main'
import { TodoCommand } from '../../commands/commands/TodoCommand'

describe('Tags parsing', () => {
   it('Should recognize the tags', () => {
      const command = '+TODO "whatever" project:test #tag1 #tag2 #tag3'
      const commands = _parseCommandFile(command)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[0].tags).toEqual(['tag1', 'tag2', 'tag3'])
      expect(commands[0].cleanLine).not.toContain('tag')
   })
})
