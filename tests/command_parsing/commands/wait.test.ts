import { describe, expect, it } from '@jest/globals'
import { WaitCommand } from '../../../commands/commands/WaitCommand'
import { parseContent } from '../../../card_files/parsing'

describe('Parsing wait command lines', () => {
   it('should recognize a wait command', () => {
      const content = '+WAIT "whatever" project:test'
      const commands = parseContent(content)

      expect(commands.length).toEqual(1)
      expect(commands[0] instanceof WaitCommand).toBeTruthy()
   })

   it('should recognize more wait commands', () => {
      const content = '+WAIT "whatever" project:test\n+WAIT "whatever2" project:test2'
      const commands = parseContent(content)

      expect(commands.length).toEqual(2)
      expect(commands[0] instanceof WaitCommand).toBeTruthy()
      expect(commands[1] instanceof WaitCommand).toBeTruthy()
   })

   it('should recognize wait commands when mixed with text lines', () => {
      const content = `
some text bla bla bla
+WAIT something yuppi duppi
and some other text
     
## title
Even with titles and blank lines!!
+WAIT "Be awesome" project:myself`
      const commands = parseContent(content)

      expect(commands.length).toEqual(2)
      expect(commands[0] instanceof WaitCommand).toBeTruthy()
      expect(commands[1] instanceof WaitCommand).toBeTruthy()
   })
})
