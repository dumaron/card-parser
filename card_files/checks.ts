
export const isAlreadyParsed = (content: string): boolean => {
   return content.includes('@parsed_at')
}

export const getErrorsFromContent = (content: string): ReadonlyArray<Error> => {
   const errors: Array<Error> = []

   if (isAlreadyParsed(content)) {
      errors.push(new Error('File already parsed'))
   }

   if (content.includes('+project:')) {
      errors.push(new Error ('File contains "+project:"'))
   }

   return errors
}
