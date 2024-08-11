import PiecesConfig from "../../configs/pieces/PiecesConfig";
import FPS from "../../util/FPS";
import GameConfigModel from "./GameConfigModel";
import GameLevelModel from "./GameLevelModel";
import StandardGameConfigModel from "./StandardGameConfigModel";

//level config adapted from https://tetris.wiki/Tetris_(NES,_Nintendo)
//fallTime equation is (Frames per Gridcell / 60 FPS) * 1000 miliseconds
export default class PALGameConfigModel extends StandardGameConfigModel {
    constructor() {
        super();

        let f = 50;
        let fastFallTime = FPS.ToMs(1, f);
        this.addLevel(0, new GameLevelModel(FPS.ToMs(36, f), fastFallTime));
        this.addLevel(1, new GameLevelModel(FPS.ToMs(32, f), fastFallTime));
        this.addLevel(2, new GameLevelModel(FPS.ToMs(29, f), fastFallTime));
        this.addLevel(3, new GameLevelModel(FPS.ToMs(25, f), fastFallTime));
        this.addLevel(4, new GameLevelModel(FPS.ToMs(22, f), fastFallTime));
        this.addLevel(5, new GameLevelModel(FPS.ToMs(18, f), fastFallTime));
        this.addLevel(6, new GameLevelModel(FPS.ToMs(15, f), fastFallTime));
        this.addLevel(7, new GameLevelModel(FPS.ToMs(11, f), fastFallTime));
        this.addLevel(8, new GameLevelModel(FPS.ToMs(7, f), fastFallTime));
        this.addLevel(9, new GameLevelModel(FPS.ToMs(5, f), fastFallTime));
        this.addLevel(10, new GameLevelModel(FPS.ToMs(4, f), fastFallTime));
        this.refrenceLevels(11, 12, 10)

        this.addLevel(13, new GameLevelModel(FPS.ToMs(3, f), fastFallTime));
        this.refrenceLevels(14, 15, 13)

        this.addLevel(16, new GameLevelModel(FPS.ToMs(2, f), fastFallTime));
        this.refrenceLevels(17, 18, 16)

        this.addLevel(19, new GameLevelModel(FPS.ToMs(1, f), fastFallTime));
    }
}