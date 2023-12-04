import { readFileSync } from 'fs';
import { findCardsWorthTotal, part2 } from './utils';

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});

const cards = input.split('\n');

console.log(
    `Part 1 => How many points are they worth in total?\n${findCardsWorthTotal(
        cards
    )}`
);

console.log(
    `Part 2 => How many total scratchcards do you end up with?\n`,
    part2(['start', ...cards])
);
