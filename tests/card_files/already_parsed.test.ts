import { describe, expect, jest, it, afterEach } from '@jest/globals'
import { parseContent } from '../../card_files/parsing'

describe('Already parsed files', () => {

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('should exit with code 1 if the file is already parsed', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
      parseContent('@parsed_at 2021-09-01 12:00:00')
      expect(mockExit).toHaveBeenCalledWith(1)
   })

   it('should not exit with code 1 if the file is not parsed', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
      parseContent('bla bla bla')
      expect(mockExit).not.toHaveBeenCalled()
   })

})
