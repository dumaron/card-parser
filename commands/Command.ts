export abstract class Command {
   abstract execute(): void
   public cleanLine: string

   public tags: ReadonlyArray<string> = []
   private project: ReadonlyArray<string> = []

   private handleTags (s: string): string {
      this.tags = s
            .match(/(^|\s)#(\w+)/gi)
            ?.map(s => s.replace(' #', ''))
            .map(s => s.toLowerCase())
         ?? []
      return s.replace(/(^|\s)#(\w+)/gi, '')
   }

   protected constructor (s: string) {
      this.cleanLine = this.handleTags(s)
   }

}
