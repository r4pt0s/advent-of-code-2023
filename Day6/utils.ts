const calculateWinCnt = (time: number, distance: number): number => {
    let winCnt = 0;

    for (let holdBtn = 1; holdBtn < time; holdBtn++) {
        const mmPerMs = time - holdBtn;

        if (mmPerMs * holdBtn > distance) {
            winCnt++;
        }
    }

    return winCnt;
};

export const part1 = (data: string[]): number => {
    let regex = /\D+/g;

    const times = data[0]
        // @ts-ignore
        .replaceAll(regex, ' ')
        .trim()
        .split(' ')
        .map(Number);

    const distances = data[1]
        // @ts-ignore
        .replaceAll(regex, ' ')
        .trim()
        .split(' ')
        .map(Number);

    let res = 1;
    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const distance = distances[i];
        let winCnt = calculateWinCnt(time, distance);

        res = winCnt ? winCnt * res : res;
    }

    return res;
};

export const part2 = (data: string[]): number => {
    let regex = /\D+/g;
    const time = Number(
        data[0]
            // @ts-ignore
            .replaceAll(regex, ' ')
            .trim()
            .split(' ')
            .join('')
    );

    const distance = Number(
        data[1]
            // @ts-ignore
            .replaceAll(regex, ' ')
            .trim()
            .split(' ')
            .join('')
    );

    return calculateWinCnt(time, distance);
};
