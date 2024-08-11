import PiecesConfig from "../../configs/pieces/PiecesConfig";
import FPS from "../../util/FPS";
import GameConfigModel from "./GameConfigModel";
import GameLevelModel from "./GameLevelModel";
import StandardGameConfigModel from "./StandardGameConfigModel";

//level config adapted from https://tetris.wiki/Tetris_(NES,_Nintendo)
//fallTime equation is (Frames per Gridcell / 60 FPS) * 1000 miliseconds
export default class NTSCGameConfigModel extends StandardGameConfigModel {
    constructor() {
        super();

        FPS.setBaseFPS(60);
        this.addLevel(0, new GameLevelModel(FPS.ToMs(48)));
        this.addLevel(1, new GameLevelModel(FPS.ToMs(43)));
        this.addLevel(2, new GameLevelModel(FPS.ToMs(38)));
        this.addLevel(3, new GameLevelModel(FPS.ToMs(33)));
        this.addLevel(4, new GameLevelModel(FPS.ToMs(28)));
        this.addLevel(5, new GameLevelModel(FPS.ToMs(23)));
        this.addLevel(6, new GameLevelModel(FPS.ToMs(18)));
        this.addLevel(7, new GameLevelModel(FPS.ToMs(13)));
        this.addLevel(8, new GameLevelModel(FPS.ToMs(8)));
        this.addLevel(9, new GameLevelModel(FPS.ToMs(6)));
        this.addLevel(10, new GameLevelModel(FPS.ToMs(5)));
        this.refrenceLevels(11, 12, 10)

        this.addLevel(13, new GameLevelModel(FPS.ToMs(4)));
        this.refrenceLevels(14, 15, 13)

        this.addLevel(16, new GameLevelModel(FPS.ToMs(3)));
        this.refrenceLevels(17, 18, 16)

        this.addLevel(19, new GameLevelModel(FPS.ToMs(2)));
        this.refrenceLevels(20, 28, 19)

        this.addLevel(29, new GameLevelModel(FPS.ToMs(1)));
    }
}