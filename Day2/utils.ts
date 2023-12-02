type MaxCubesMap = {
    [key: string]: number;
};

const maxCubesMap: MaxCubesMap = {
    blue: 14,
    red: 12,
    green: 13,
};

const cubeRegex = (cube: string) => new RegExp(`\\d+\\s${cube}`, 'gm');

const isValidCubeInRound = (rounds: string, cube: string) => {
    const workSet = rounds.match(cubeRegex(cube));

    if (!workSet) {
        return true;
    }

    for (const match of workSet) {
        const parsed = parseInt(match.replace(cube, ''));

        if (parsed > maxCubesMap[cube]) {
            return false;
        }
    }

    return true;
};

export const guessedValidGamesSum = (games: string[]) =>
    games.reduce((gameSum, game: string) => {
        const [gameMeta, rounds] = game.split(`:`);

        if (
            !isValidCubeInRound(rounds, 'blue') ||
            !isValidCubeInRound(rounds, 'red') ||
            !isValidCubeInRound(rounds, 'green')
        ) {
            return gameSum;
        }

        return (gameSum += Number(gameMeta.replace('Game ', '')));
    }, 0);

export const getMinNeededCubes = (games: string[]) => {
    return games.reduce((minCubePowerOfSet, game) => {
        const [_, rounds] = game.split(`:`);
        const gameCubesMin: MaxCubesMap = {
            blue: 0,
            red: 0,
            green: 0,
        };

        const roundSet = rounds.split(';');
        roundSet.forEach((round) => {
            const cubeSet = round.split(',');
            cubeSet.forEach((cube) => {
                const [count, color] = cube.trim().split(' ');
                if (gameCubesMin[color] < parseInt(count)) {
                    gameCubesMin[color] = parseInt(count);
                }
            });
        });

        return (minCubePowerOfSet += Object.values(gameCubesMin).reduce(
            (cubesPower, cube) => (cubesPower *= cube),
            1
        ));
    }, 0);
};
