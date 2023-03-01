export abstract class Command {
   abstract execute(): void
   private tags: ReadonlyArray<string> = []
   private project: ReadonlyArray<string> = []

}
