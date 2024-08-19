import FPS from "../../util/FPS";
import GameLevelModel from "../../models/game/GameLevelModel";
import StandardGameConfigModel from "../../models/game/StandardGameConfigModel";

//level config adapted from https://tetris.wiki/Tetris_(NES,_Nintendo)
//fallTime equation is (Frames per Gridcell / 60 FPS) * 1000 miliseconds
export default class WebtrisGameConfig extends StandardGameConfigModel {
    constructor() {
        super();
        
        FPS.setBaseFPS(60);
        let fastFall = FPS.ToMs(2);
        this.addLevel(new GameLevelModel(0, FPS.ToMs(48), fastFall));
        this.addLevel(new GameLevelModel(1, FPS.ToMs(43), fastFall));
        this.addLevel(new GameLevelModel(2, FPS.ToMs(38), fastFall));
        this.addLevel(new GameLevelModel(3, FPS.ToMs(33), fastFall));
        this.addLevel(new GameLevelModel(4, FPS.ToMs(28), fastFall));
        this.addLevel(new GameLevelModel(5, FPS.ToMs(23), fastFall));
        this.addLevel(new GameLevelModel(6, FPS.ToMs(18), fastFall));
        this.addLevel(new GameLevelModel(7, FPS.ToMs(13), fastFall));
        this.addLevel(new GameLevelModel(8, FPS.ToMs(8), fastFall));
        this.addLevel(new GameLevelModel(9, FPS.ToMs(6), fastFall));
        this.addLevel(new GameLevelModel(10, FPS.ToMs(5), fastFall));
        this.refrenceLevels(11, 12, 10)

        this.addLevel(new GameLevelModel(13, FPS.ToMs(4), fastFall));
        this.refrenceLevels(14, 15, 13)

        this.addLevel(new GameLevelModel(16, FPS.ToMs(3), fastFall));
        this.refrenceLevels(17, 18, 16)

        this.addLevel(new GameLevelModel(19, FPS.ToMs(2), fastFall));
        this.refrenceLevels(20, 28, 19)

        this.addLevel(new GameLevelModel(29, FPS.ToMs(1), fastFall));
    }
}