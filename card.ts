import { prependFileSync } from './fs'
import { format } from 'date-fns'
import { some } from 'fp-ts/ReadonlyArray'
import { startsWith } from 'fp-ts/string'

export const markFileAsParsed = prependFileSync(`@parsed_at:${ format(new Date(), 'yyyy-MM-dd') }\n`)

export const isAlreadyParsed = some(startsWith('@parsed_at'))
