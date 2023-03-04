export abstract class Command {
   abstract execute(): void

   public cleanLine: string

   public tags: ReadonlyArray<string> = []
   public project: ReadonlyArray<string> = []

   private handleTags(s: string): string {
      this.tags = s
            .match(/(^|\s)#(\w+)/gi)
            ?.map(s => s.replace(' #', ''))
            .map(s => s.toLowerCase())
         ?? []
      return s.replace(/(^|\s)#(\w+)/gi, '')
   }

   private handleProject(s: string): string {
      this.project = s
            .match(/(^|\s)project:((\w|\.)+)/gi)
            ?.pop()
            ?.replace(' project:', '')
            .toLowerCase()
            .split('.')
         ?? []
      return s.replace(/(^|\s)project:((\w|\.)+)/gi, '')
   }

   protected constructor(s: string) {
      this.cleanLine = this.handleTags(this.handleProject(s))
   }

}
