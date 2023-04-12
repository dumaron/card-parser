import { Command } from 'commander'
import { parseFile } from './card_files/parsing'
import { generateCardFile } from './card_files/generation'

const program = new Command()
   .version('0.0.1')

program
   .command('parse <path>')
   .description('Parse a card file')
   .action(parseFile)

program
   .command('start_new_day')
   .description('Rise and shine!')
   .action(generateCardFile)

program.parse()
