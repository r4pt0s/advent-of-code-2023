type NumberWordMap = {
    [key: string]: string;
};

type NumberRegex = RegExp;
type NumberWordRegex = RegExp;

export const calculateSum = (input: string[], considerLine: boolean) => {
    return input.reduce((acc, line) => {
        const splitLine = !considerLine
            ? line.split('')
            : replaceWords(line).split('');

        const filteredLine: string[] = splitLine.filter((char) => {
            return numberRegex.test(char);
        });

        acc += Number.parseInt(
            `${filteredLine[0]}${filteredLine[filteredLine.length - 1]}`
        );

        return acc;
    }, 0);
};

const replacer = (match: string) => {
    return `${numberWordMap[match]}` ?? '';
};

export const numberRegex: NumberRegex = /\d/;

export const numberWordMap: NumberWordMap = {
    one: 'one1one',
    two: 'two2two',
    three: 'three3three',
    four: 'four4four',
    five: 'five5five',
    six: 'six6six',
    seven: 'seven7seven',
    eight: 'eight8eight',
    nine: 'nine9nine',
};

const replaceWords = (line: string) => {
    Object.entries(numberWordMap).forEach(([key, value]) => {
        /** @ts-ignore-next-line */
        line = line.replaceAll(key, `${value}`);
    });

    return line;
};
