import { readFileSync } from 'fs';
import { calculateSum } from './utils';

const input = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
    flag: 'r',
});

const splitInput = input.split('\n');

console.log(
    `Part 1 => What is the sum of all of the calibration values?\n${calculateSum(
        splitInput,
        false
    )}`
);

console.log(
    `Part 2 => What is the sum of all of the calibration values?\n${calculateSum(
        splitInput,
        true
    )}`
);
