import FPS from "../../util/FPS";

export default class GameLevelModel {
    constructor(fallTime, fastFallTime) {
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
}