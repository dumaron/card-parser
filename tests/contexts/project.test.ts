import { describe, expect, it, jest, afterEach } from '@jest/globals'
import { TodoCommand } from '../../commands/commands/TodoCommand'
import { parseContent } from '../../card_files/parsing'


describe('Parsing todo command lines', () => {

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('should remove contexts from the line', () => {
      const content = `
[env:personal]
[project:my-project]
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0]

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.cleanLine).toBe('+TODO this is a command')
   })

   it('should parse environment when on different line', () => {
      const content = `
[env:personal]
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.environment).toBe('personal')
   })

   it('should parse environment as "env"', () => {
      const content = `
[env:personal]
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.environment).toBe('personal')
   })

   it('should parse environment as "environment"', () => {
      const content = `
[environment:personal]
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.environment).toBe('personal')
   })

   it('should have "work" as a default environment', () => {
      const content = `
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.environment).toBe('work')
   })

   it('should keep only the first environment per line', () => {
      const content = `
[environment:personal][environment:work]
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.environment).toBe('personal')
      expect(todo.cleanLine).toBe('+TODO this is a command')
   })


   it('should keep only the first project per line', () => {
      const content = `
[project:project1][project:project2]
bla bla
+TODO this is a command`
      const parsed = parseContent(content)
      const todo = parsed[0] as TodoCommand

      expect(todo instanceof TodoCommand).toBe(true)
      expect(todo.project).toHaveLength(1)
      expect(todo.project[0]).toBe('project1')
   })

   it('should override envs in different lines', () => {
      const content =`
[env:work]
+TODO command 1
[env:personal]
+TODO command 2
`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand
      const todo2 = parsed[1] as TodoCommand

      expect(todo1.environment).toBe('work')
      expect(todo2.environment).toBe('personal')
   })

   it('should override projects in different lines', () => {
      const content =`
[project:project1]
+TODO command 1
[project:project2]
+TODO command 2
`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand
      const todo2 = parsed[1] as TodoCommand

      expect(todo1.project).toHaveLength(1)
      expect(todo1.project[0]).toBe('project1')
      expect(todo2.project).toHaveLength(1)
      expect(todo2.project[0]).toBe('project2')
   })

   it('should reset the project when encounters a markdown title', () => {
      const content =`
[project:project1]
+TODO command 1
## Title
+TODO command 2
`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand
      const todo2 = parsed[1] as TodoCommand

      expect(todo1.project).toHaveLength(1)
      expect(todo1.project[0]).toBe('project1')
      expect(todo2.project).toHaveLength(0)
   })

   it('should not reset the environment when encounters a markdown title', () => {
      const content =`
[env:personal]
+TODO command 1
## Title
+TODO command 2
`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand
      const todo2 = parsed[1] as TodoCommand

      expect(todo1.environment).toBe('personal')
      expect(todo2.environment).toBe('personal')
   })

   it('should not override specific command projects', () => {
      const content =`
[project:project1]
+TODO command 1 project:project2
`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand

      expect(todo1.project).toHaveLength(1)
      expect(todo1.project[0]).toBe('project2')
   })

   it('should recognize projects even when they\'re nested', () => {
      const content =`
[project:project1.sub1.sub2]
+TODO command 1`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand

      expect(todo1.project).toHaveLength(3)
      expect(todo1.project[0]).toBe('project1')
      expect(todo1.project[1]).toBe('sub1')
      expect(todo1.project[2]).toBe('sub2')
   })

   it('should recognize projects even when they have underscores', () => {
      const content =`
[project:project1.sub_1]
+TODO command 1`
      const parsed = parseContent(content)
      const todo1 = parsed[0] as TodoCommand

      expect(todo1.project).toHaveLength(2)
      expect(todo1.project[0]).toBe('project1')
      expect(todo1.project[1]).toBe('sub_1')
   })

})
