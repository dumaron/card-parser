export type EnvironmentContext = { type: 'environment', value: 'work' | 'personal' }
export type ProjectContext = { type: 'project', value: string }
export type ResetContext = { type: 'reset' }

export type Contexts =
   | EnvironmentContext
   | ProjectContext
   | ResetContext

export const pickContexts = (line: string): {
   contexts: ReadonlyArray<Contexts>,
   lineWithoutContexts: string
} => {
   const envRegex = /\[(env|environment):(work|personal)]/ig
   const projectRegex = /\[(project|prj):((\w|\.|_)+)]/ig
   const contexts: Array<Contexts> = []

   const envMatches = [ ...(line.match(envRegex) ?? []) ]
   const prjMatches = [ ...(line.match(projectRegex) ?? []) ]
   const isReset = line.startsWith('#')

   const firstEnvMatch = envMatches[0]
   if (firstEnvMatch !== undefined) {
      const env = firstEnvMatch.replace('[', '').replace(']', '').split(':')[1]
      contexts.push({ type: 'environment', value: env as EnvironmentContext['value'] })
   }
   const firstProjectMatch = prjMatches[0]
   if (firstProjectMatch !== undefined) {
      const project = firstProjectMatch.replace('[', '').replace(']', '').split(':')[1]
      contexts.push({ type: 'project', value: project })
   } else if (isReset) {
      contexts.push({ type: 'reset' })
   }

   let lineWithoutContexts =  line
   envMatches.forEach(match => lineWithoutContexts = lineWithoutContexts.replaceAll(match, ''))
   prjMatches.forEach(match => lineWithoutContexts = lineWithoutContexts.replaceAll(match, ''))

   return {
      contexts,
      lineWithoutContexts,
   }
}
