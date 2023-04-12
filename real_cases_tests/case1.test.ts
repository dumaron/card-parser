import { describe, expect, it } from '@jest/globals'
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

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
Etiam metus ligula, feugiat in leo et, iaculis malesuada justo. Donec vel tellus maximus, faucibus neque vel, ultricies dui.

+TODO Aenean tincidunt sollicitudin tellus project:work.new_data_model #slack

## Integer porta ante vitae
[project:work.lacus tincidunt]

Aliquam tempus elit sed diam tempor, ut consequat neque mollis.

+TODO Integer et sodales quam, vitae gravida mi

## Suspendisse potenti

[[Cras]] hendrerit laoreet tincidunt. In molestie placerat elit eu eleifend. Integer vel tempor eros. 
Integer sit amet pellentesque augue, sit amet tincidunt augue.

+TODO Integer tempus porta nunc ac lobortis

Ok, that's it. Let's try. 
`

describe('Case 1 - Error with project as empty string', () => {
   it('should parse', () => {
      const parsed = parseContent(content)
      const errors = getErrorsFromCommands(parsed)

      expect(errors).toHaveLength(0)
   })
})

