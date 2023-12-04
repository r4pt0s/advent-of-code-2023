type ObjectNumberStore = {
    [key: string]: number;
};

const getNumbersArray = (str: string) => {
    return str
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n));
};

export const findCardsWorthTotal = (cards: string[]) => {
    let sum = 0;

    cards.forEach((workSet) => {
        let rowSum = 0;

        const [winningNumbers, ownNumbers] = workSet
            .replace(/Card\s+\d+\:/g, '')
            // @ts-ignore
            .replaceAll('  ', ' ')
            .split(' | ');

        const winningNumbersArray = getNumbersArray(winningNumbers);

        const ownNumbersArray = getNumbersArray(ownNumbers);

        ownNumbersArray.forEach((numb, idx) => {
            if (winningNumbersArray.includes(numb)) {
                rowSum = rowSum === 0 ? 1 : rowSum * 2;
            }
        });

        sum += rowSum;
    });

    return sum;
};

const findWiningNumbers = (winningNumbers: string, ownNumbers: string) => {
    let winningNumberCnt = 0;

    const winningNumbersArray = getNumbersArray(winningNumbers);

    const ownNumbersArray = getNumbersArray(ownNumbers);

    ownNumbersArray.forEach((numb, idx) => {
        if (winningNumbersArray.includes(numb)) {
            winningNumberCnt++;
        }
    });

    return winningNumberCnt;
};

const otherScratch: ObjectNumberStore = {};

const alreadyFound: ObjectNumberStore = {};

const processCards = (cards: string[], startIdx = 1) => {
    for (let idx = startIdx; idx < cards.length; idx++) {
        const workSet = cards[idx];

        const [winningNumbers, ownNumbers] = workSet
            .replace(/Card\s+\d+\:/g, '')
            // @ts-ignore
            .replaceAll('  ', ' ')
            .split(' | ');

        if (!alreadyFound[`card${idx}`]) {
            alreadyFound[`card${idx}`] = findWiningNumbers(
                winningNumbers,
                ownNumbers
            );
        }
    }
};

// is reaaaallllllyyyyyy slow
export const part2 = (cards: string[]) => {
    console.log(
        '####################################################################################################'
    );
    console.log('processing cards for part 2, hold on a sec');

    cards.forEach((workSet, idx) => {
        if (workSet !== 'start') {
            if (!otherScratch[`card${idx}`]) {
                otherScratch[`card${idx}`] = 1;
            } else {
                otherScratch[`card${idx}`]++;
            }
            processCards(cards, idx);
        }
    });

    for (let i = 1; i < cards.length; i++) {
        const key = `card${i}`;
        const value = alreadyFound[`card${i}`];

        if (value > 0) {
            let inner = otherScratch[`card${i}`];

            while (inner > 0) {
                for (let i = 0; i < value; i++) {
                    const scratchCardIdx =
                        parseInt(key.replace('card', '')) + i + 1;

                    if (otherScratch[`card${scratchCardIdx}`]) {
                        otherScratch[`card${scratchCardIdx}`]++;
                    } else {
                        otherScratch[`card${scratchCardIdx}`] = 1;
                    }
                }

                inner--;
            }
        }
    }

    return Object.values(otherScratch).reduce((acc, curr) => acc + curr, 0);
};
