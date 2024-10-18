import _ from "lodash";
import FPS from "../../util/FPS";

export default class GameLevelModel {
    constructor(number, fallTime, fastFallTime = FPS.ToMs(1)) {
        this.number = number;
        this.fallTime = fallTime;
        this.fastFallTime = fastFallTime;
    }

    getFallTime() {
        return this.fallTime;
    }
    setFallTime(newFallTime) {
        this.fallTime = newFallTime;
    }

    getFastFallTime() {
        return this.fastFallTime;
    }
    setFastFallTime(newFastFallTime) {
        this.fastFallTime = newFastFallTime;
    }

    getNumber() {
        return this.number;
    }
    setNumber(newNumber) {
        this.number = newNumber;
    }

    copy() {
        return new GameLevelModel(this.number, this.fallTime, this.fastFallTime);
    }
}