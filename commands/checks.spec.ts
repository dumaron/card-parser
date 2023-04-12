import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { TodoCommand } from './commands/TodoCommand'
import { getErrorsFromCommands, getUnknownProjects } from './checks'
import { WaitCommand } from './commands/WaitCommand'
import { AddProjectCommand } from './commands/AddProjectCommand'
import * as fsUtils from '../utils/fs'


describe('Commands checks', () => {

   afterEach(() => { jest.clearAllMocks() })

   describe('Unknown projects', () => {
      it('Should not return any project if all projects used are among the active ones', () => {
         const activeProjects = [
            'work',
            'work.something',
         ]

         const commands = [
            new WaitCommand('boh', 'work', 'work'),
            new TodoCommand('whatever', 'work', 'work.something')
         ]

         const unknownProjects = getUnknownProjects(activeProjects, commands)

         expect(unknownProjects).toHaveLength(0)
      })

      it('Should return serialized projects if some commands contains projects that are not among the active ones', () => {
         const activeProjects = [
            'work',
            'work.something',
         ]

         const commands = [
            new TodoCommand('whatever', 'work', 'work.another') // <- "another" instead of "something"
         ]

         const projects = getUnknownProjects(activeProjects, commands)

         expect(projects.length > 0).toBe(true)
         expect(projects[0]).toBe('work.another')
      })

      it('Should not return a project if the unknown projects are among the ones that will be created soon', () => {
         const commands = [
            new AddProjectCommand('a.new.project', 'work'),
            new TodoCommand('whatever', 'work', 'a.new.project'),
         ]

         const projects = getUnknownProjects([], commands)

         expect(projects).toHaveLength(0)
      })

      it('Should be transformed into an error from check controls', () => {
         jest.spyOn(fsUtils, 'readFile').mockReturnValue('[]') // serialized json with no active projects
         const commands = [ new TodoCommand('be awesome', 'personal', 'a.cool.project') ]
         const errors = getErrorsFromCommands(commands)

         expect(errors).toHaveLength(1)
         expect(errors[0].message.includes('Used some projects that are not active')).toBe(true)
      })
   })
})
