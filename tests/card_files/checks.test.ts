import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { getErrorsFromContent } from '../../card_files/checks'

describe('Checks', () => {
   afterEach(() => {
      jest.clearAllMocks()
   })

   describe('Already parsed files', () => {

      it('should return an error if the file is already parsed', () => {
         const errs = getErrorsFromContent('@parsed_at 2021-09-01 12:00:00')
         expect(errs).toHaveLength(1)
         expect(errs[0].message).toBe('File already parsed')
      })

      it('should not return an error if the file is not parsed', () => {
         const errs = getErrorsFromContent('bla bla bla')
         expect(errs).toHaveLength(0)
      })

   })

   describe('Frequent typos', () => {
      it('Should return an error if the file contains "+project:"', () => {
         const errs = getErrorsFromContent('+TODO something +project:bla bla bla')
         expect(errs).toHaveLength(1)
         expect(errs[0].message).toBe('File contains "+project:"')
      })
   })

})

