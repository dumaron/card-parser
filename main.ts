import { Command } from 'commander'
import { parseFile } from './card_files/parsing'

const program = new Command()
   .version('0.0.1')

program
   .command('parse <path>')
   .description('Parse a card file')
   .action(parseFile)

program.parse()
