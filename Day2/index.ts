import { readFileSync } from 'fs';
import { getMinNeededCubes, guessedValidGamesSum } from './utils';

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});

const games = input.split('\n');

console.log(
    `Part 1 => What is the sum of the IDs of those games?\n${guessedValidGamesSum(
        games
    )}`
);

console.log(
    `Part 2 => What is the sum of the power of these sets?\n${getMinNeededCubes(
        games
    )}`
);
