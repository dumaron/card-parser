import { describe, expect, it, jest, beforeAll } from '@jest/globals'
import { _parseCommandFile } from '../../main'
import { TodoCommand } from '../../commands/commands/TodoCommand'
import * as child_process from 'child_process'

jest.mock('child_process')

describe('Parsing todo command lines', () => {

   it('should recognize a todo command', () => {
      const content = '+TODO "whatever" project:test'
      const commands = _parseCommandFile(content)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
   })

   it('should recognize more todo commands', () => {
      const content = '+TODO "whatever" project:test\n+TODO "whatever2" project:test2'
      const commands = _parseCommandFile(content)

      expect(commands.length).toEqual(2)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[1] instanceof TodoCommand).toBeTruthy()
   })

   it('should recognize todo commands when mixed with text lines', () => {
      const content = `
some text bla bla bla
+TODO something yuppi duppi
and some other text
     
## title
Even with titles and blank lines!!
+TODO "Be awesome" project:myself`
      const commands = _parseCommandFile(content)

      expect(commands.length).toEqual(2)
      expect(commands[0] instanceof TodoCommand).toBeTruthy()
      expect(commands[1] instanceof TodoCommand).toBeTruthy()
   })

   it('should translate tags from command rappresentation to taskwarrior rappresentation', () => {
      const content = '+TODO "whatever" project:test #tag1 #tag2 #tag3'
      const commands = _parseCommandFile(content)
      const fn = jest.spyOn(child_process, 'execSync').mockReturnValueOnce('')

      commands[0].execute()

      expect(fn).toHaveBeenCalledWith('task add "whatever" project:test +tag1 +tag2 +tag3')

   })
})
