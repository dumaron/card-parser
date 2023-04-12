import { readdirSync, writeFileSync } from 'fs'
import { CARD_FILE_FOLDER } from '../constants'

export const generateCardFileName = (): string => {
   const files = readdirSync(CARD_FILE_FOLDER)
   const alreadyPresentCards = files.length

   return `card_${alreadyPresentCards + 1}.md`
}

export const generateCardFile = () => {
   const path = CARD_FILE_FOLDER + generateCardFileName()
   writeFileSync(path, 'Good morning, my dear.')
}
