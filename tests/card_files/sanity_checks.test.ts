import { describe, expect, jest, it, afterEach } from '@jest/globals'
import { parseContent } from '../../card_files/parsing'

describe('Already parsed files', () => {

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('should exit with code 1 if the file contains "+project:"', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
      parseContent(`
Some very cool text
+TODO "whatever" +project:test
`)
      expect(mockExit).toHaveBeenCalledWith(1)
      mockExit.mockClear()

      parseContent(`
Some very cool text 2
+TODO "whatever" +project
`)
      expect(mockExit).not.toHaveBeenCalled()
   })

})
