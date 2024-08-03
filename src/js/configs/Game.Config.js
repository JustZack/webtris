export default class GameConfig {
    static rowClearDelay = 50;
    static CurrentLevel = 0;
    static Levels = {
        0: {
            fallTime: 500,
            fastFallDivisor: 10
        },
        1: {
            fallTime: 400,
            fastFallDivisor: 6
        },
        3: {
            fallTime: 325,
            fastFallDivisor: 5
        },
        4: {
            fallTime: 250,
            fastFallDivisor: 4
        },
        5: {
            fallTime: 200,
            fastFallDivisor: 3
        },
        6: {
            fallTime: 150,
            fastFallDivisor: 2.5
        }
    };
}