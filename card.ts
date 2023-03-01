import { prependFileSync } from './fs'
import { format } from 'date-fns'

export const markFileAsParsed =
   (path: string) => prependFileSync(path, `@parsed_at:${ format(new Date(), 'yyyy-MM-dd') }\n`)
