import { describe, expect, jest, it, afterEach } from '@jest/globals'
import { _parseCommandFile } from '../../main'
import { TodoCommand } from '../../commands/commands/TodoCommand'

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
})
