export default class GameLevelModel {
    constructor(config) {
        this.fallTime = config.fallTime;
        this.fastFallDivisor = config.fastFallDivisor;
    }

    getFallTime() {
        return this.fallTime;
    }
    setFallTime(newFallTime) {
        this.fallTime = newFallTime;
    }

    getFastFallDivisor() {
        this.fastFallDivisor;
    }
    setFastFallDivisor(newDivisor) {
        this.fastFallDivisor = newDivisor;
    }
}