export const hasErrors = (content: string): boolean => {
   return content.includes('+project:')
}

export const isAlreadyParsed = (content: string): boolean => {
   return content.includes('@parsed_at')
}
