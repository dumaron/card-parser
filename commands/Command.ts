import { Environment } from '../types'

export abstract class Command {
   abstract execute(): void

   public cleanLine: string
   public tags: ReadonlyArray<string> = []
   public project: ReadonlyArray<string> = []
   public environment: Environment

   private handleTags(s: string): string {
      this.tags = s
            .match(/(^|\s)#(\w+)/gi)
            ?.map(s => s.replace(' #', ''))
            .map(s => s.toLowerCase())
         ?? []
      return s.replace(/(^|\s)#(\w+)/gi, '')
   }

   private handleProject(s: string, contextProject?: string): string {
      this.project = s
         .match(/(^|\s)project:((\w|\.)+)/gi)
         ?.pop()
         ?.replace(' project:', '')
         .toLowerCase()
         .split('.')
      ?? (contextProject !== undefined ? contextProject.split('.') : [])
      return s.replace(/(^|\s)project:((\w|\.)+)/gi, '')
   }

   protected constructor(s: string, environment: Environment, contextProject?: string) {
      this.cleanLine = this.handleTags(this.handleProject(s, contextProject))
      this.environment = environment
   }

}
