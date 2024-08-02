export default class GameConfig {
    static CurrentLevel = 0;
    static Levels = {
        0: {
            fallTime: 500,
            fastFallFactor: .1
        },
        1: {
            fallTime: 400,
            fastFallFactor: .15
        },
        3: {
            fallTime: 325,
            fastFallFactor: .2
        },
        4: {
            fallTime: 250,
            fastFallFactor: .25
        },
        5: {
            fallTime: 200,
            fastFallFactor: .3
        },
        6: {
            fallTime: 150,
            fastFallFactor: .35
        }
    };
}