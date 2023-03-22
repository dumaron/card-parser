import { describe, expect, it } from '@jest/globals'
import { parseContent } from '../../../card_files/parsing'
import { AddProjectCommand } from '../../../commands/commands/AddProjectCommand'

describe('Parsing "add project" command', () => {
   it('should recognize a "add project" command', () => {
      const content = '+PRJ something'
      const commands = parseContent(content)

      expect(commands).toHaveLength(1)
      expect(commands[0] instanceof AddProjectCommand).toBeTruthy()
   })

   it('should recognize more "add project" commands', () => {
      const content = '+PRJ something\n+PRJ something2'
      const commands = parseContent(content)

      expect(commands).toHaveLength(2)
      expect(commands[0] instanceof AddProjectCommand).toBeTruthy()
      expect(commands[1] instanceof AddProjectCommand).toBeTruthy()
   })

   it('should recognize "add project" commands when mixed with text lines', () => {
      const content = `
some text bla bla bla
+PRJ something1
and some other text
     
## title
Even with titles and blank lines!!
+PRJ something2`
      const commands = parseContent(content)

      expect(commands).toHaveLength(2)
      expect(commands[0] instanceof AddProjectCommand).toBeTruthy()
      expect(commands[1] instanceof AddProjectCommand).toBeTruthy()
   })

   it('should parse serialized project name', () => {
      const content = '+PRJ level1.level2.level3'
      const commands = parseContent(content)

      expect(commands).toHaveLength(1)
      expect(commands[0] instanceof AddProjectCommand).toBeTruthy()
      expect((commands[0] as AddProjectCommand).projectFromString).toHaveLength(3)
      expect((commands[0] as AddProjectCommand).projectFromString[0]).toBe('level1')
      expect((commands[0] as AddProjectCommand).projectFromString[1]).toBe('level2')
      expect((commands[0] as AddProjectCommand).projectFromString[2]).toBe('level3')
   })

   it('should parse serialized.projectFromString name with underscores', () => {
      const content = '+PRJ level1.level_2'
      const commands = parseContent(content)

      expect(commands).toHaveLength(1)
      expect(commands[0] instanceof AddProjectCommand).toBeTruthy()
      expect((commands[0] as AddProjectCommand).projectFromString).toHaveLength(2)
      expect((commands[0] as AddProjectCommand).projectFromString[0]).toBe('level1')
      expect((commands[0] as AddProjectCommand).projectFromString[1]).toBe('level_2')
   })
})