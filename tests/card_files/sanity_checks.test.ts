import { describe, expect, jest, it, afterEach } from '@jest/globals'
import { _parseCommandFile } from '../../main'

describe('Already parsed files', () => {

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('should exit with code 1 if the file contains "+project:"', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => (1 as never))
      _parseCommandFile(`
Some very cool text
+TODO "whatever" +project:test
`)
      expect(mockExit).toHaveBeenCalledWith(1)
      mockExit.mockClear()

      _parseCommandFile(`
Some very cool text 2
+TODO "whatever" +project
`)
      expect(mockExit).not.toHaveBeenCalled()
   })

})
