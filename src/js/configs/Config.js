import StandardGameConfigModel from "../models/game/StandardGameConfigModel";

export default class TetrisGameConfig {
    static levelConfig = new StandardGameConfigModel();
    static currentLevelNum = 0;
    static currentLevel() { 
        return TetrisGameConfig.levelConfig.getLevel(TetrisGameConfig.currentLevelNum);
    }
    static advanceLevel() {
        return TetrisGameConfig.currentLevelNum++;
    }
}