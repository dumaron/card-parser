import { describe, expect, jest, it, afterEach } from '@jest/globals'
import { _parseCommandFile } from '../main'

describe('parseCommandFile function', () => {

   afterEach(() => {
      jest.clearAllMocks()
   })

   describe('Already parsed files', () => {

      it('should exit with code 1 if the file is already parsed', () => {
         const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
         _parseCommandFile('@parsed_at 2021-09-01 12:00:00')
         expect(mockExit).toHaveBeenCalledWith(1)
      })

      it('should not exit with code 1 if the file is not parsed', () => {
         const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
         _parseCommandFile('bla bla bla')
         expect(mockExit).not.toHaveBeenCalled()
      })

   })
})
