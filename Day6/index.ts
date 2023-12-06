import { readFileSync } from 'fs';
import { part1, part2 } from './utils';

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});

const data = input.split('\n');

console.log(
    `Part 1 => What do you get if you multiply these numbers together?\n`,
    part1(data)
);

console.log(
    `Part 2 => How many ways can you beat the record in this one much longer race?\n`,
    part2(data)
);
