import GameConfig from "../../configs/Game.Config";
import GameLevelModel from "./GameLevelModel";

export default class GameConfigModel {   
    static getMaxLevel() {
        return Object.keys(GameConfig.Levels).length-1;
    }
    static gotoNextLevel() {
        let current = GameConfigModel.getCurrentLevel();
        let max = this.getMaxLevel();
        if (current > max) this.setCurrentLevel(max);
        else if (current < max) this.setCurrentLevel(current + 1);
    }

    static getLevelModel(level) {
        return new GameLevelModel(GameConfig.Levels[level]);
    }

    static getRowClearDelay() {
        return GameConfig.rowClearDelay;
    }
    static setRowClearDelay(newDelay) {
        GameConfig.rowClearDelay = newDelay;
    }
}  