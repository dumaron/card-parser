import { describe, expect, it, jest, afterEach } from '@jest/globals'
import { parseContent } from '../card_files/parsing'
import { getErrorsFromCommands } from '../commands/checks'

const content = `
Good morning, my dear.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cursus enim tellus, placerat fermentum elit placerat sit amet. 
Donec id dui massa. Etiam efficitur, leo non scelerisque auctor, lacus erat elementum nulla, vel iaculis lorem urna in leo. 
Pellentesque consequat ut metus ac congue.

+TODO Quisque vitae quam imperdiet, gravida massa at, facilisis elit project:work

Donec consequat vel mauris et scelerisque. Duis vel metus ut erat malesuada congue eget ac quam. 
Aenean congue sem odio, non aliquam orci faucibus nec. Fusce sodales mattis mollis. 
Maecenas vulputate tincidunt quam, non venenatis urna sagittis et. 

Proin posuere mauris id enim cursus, in pharetra metus vestibulum. 
+TODO Aliquam vel maximus risus project:work due:today

Mi besia dover fare qualcosa di urgenza oggi.

Poi abbiamo il thread sul nuovo formato per il data model e quello che vorremmo mandare al client. Anche qui, mi besia dover fare tutto questo di corsa, ma conviene rispondere.

+TODO Leggere e rispondere sul thread per il new data model e i dati mandati al client project:work.new_data_model #slack

## Viaggio a Copenhagen
[project:work.copenhagen_may]

Direi anche di avviare la procedura andare a Copenhagen a Maggio, visto che Alfred non fa una bega.

+TODO Cercare una proposta di viaggio per andare a Copenhagen, rimanendo anche sabato e domenica

## Routes

[[Stephanie]] mi ha segnalato un bug per le route in cui il percorso passa in mezzo al globo. It won't be easy to fix, but I will down-prioritize it since there are so many things to do. What the hell.

+TODO Fix the bug where the vessel route can go from one side of the globe to another.

Ok, that's it. Let's try. 
`

describe('Case 1 - Error with project as empty string', () => {
   it('should parse', () => {
      const parsed = parseContent(content)
      const errors = getErrorsFromCommands(parsed)

      expect(errors).toHaveLength(0)
   })
})

