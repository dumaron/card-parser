import { describe, expect, it, jest, afterEach } from '@jest/globals'
import fs from 'fs'
import { generateCardFile, generateCardFileName } from './generation'
import { CARD_FILE_FOLDER } from '../constants'

const { Dirent } = fs


describe('Card files generation', () => {
   afterEach(() => {
      jest.restoreAllMocks()
   })

   describe('Card file name choice', () => {
      it('Should return a name based on the number of already present cards inside the main folder', () => {
         const alreadyPresentCards = 5
         jest.spyOn(fs, 'readdirSync').mockReturnValue(Array.from({ length: alreadyPresentCards }, () => new Dirent()))

         expect(generateCardFileName()).toBe(`card_${alreadyPresentCards + 1}.md`)
      })
   })

   describe('Card file generation', () => {
     it('Should create a new card file with the correct name', () => {
         const alreadyPresentCards = 5
         jest.spyOn(fs, 'readdirSync').mockReturnValue(Array.from({ length: alreadyPresentCards }, () => new Dirent()))
         jest.spyOn(fs, 'writeFileSync')

         generateCardFile()

         expect(fs.writeFileSync).toHaveBeenCalledWith(CARD_FILE_FOLDER + `card_${alreadyPresentCards + 1}.md`, '')
     })
   })
})
