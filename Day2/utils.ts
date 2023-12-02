
const validCubeRegex = () => new RegExp(`([1-9][5-9]{1,} blue)|[2-9][0-9] blue|([1-9][3-9]{1,} red)|[2-9][0-9]{1,} red|([1-9][4-9]{1,} green)|[2-9][0-9]{1,} green`, "gm");


const isValidGame = (rounds: string) =>
  validCubeRegex().test(rounds)

export const guessedValidGames = (games: string[]) =>
  games.reduce((gameSum, game) => {
    const [gameMeta, rounds] = game.split(`:`);

    if (isValidGame(rounds)) {
       return gameSum;
    }
    
    return (gameSum += Number(gameMeta.replace("Game ", "")));
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
