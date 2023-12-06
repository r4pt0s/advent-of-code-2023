import { part1, part2 } from './utils';

const mockDataPart = `Time:      7  15   30
Distance:  9  40  200`;

describe('Day5', () => {
    test('Part 1 => What do you get if you multiply these numbers together?', () => {
        expect(part1(mockDataPart.split('\n'))).toBe(288);
    });

    test('Part 2 =>  How many ways can you beat the record in this one much longer race?', () => {
        expect(part2(mockDataPart.split('\n'))).toBe(71503);
    });
});
