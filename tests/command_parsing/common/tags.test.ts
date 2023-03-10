import { describe, expect, it } from '@jest/globals'
import { TodoCommand } from '../../../commands/commands/TodoCommand'
import { parseContent } from '../../../card_files/parsing'

describe('Tags parsing', () => {
   it('Should recognize the tags', () => {
      const command = '+TODO "whatever" project:test #tag1 #tag2 #tag3'
      const commands = parseContent(command)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[0].tags).toEqual(['tag1', 'tag2', 'tag3'])
      expect(commands[0].cleanLine).not.toContain('tag')
   })

   it('Should recognize the tags when mixed with other words', () => {
      const command = '+TODO #tag1 "whatever" #tag2 project:test #tag3'
      const commands = parseContent(command)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[0].tags).toEqual(['tag1', 'tag2', 'tag3'])
      expect(commands[0].cleanLine).not.toContain('tag')
   })
})
