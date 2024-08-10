export default class GameLevelModel {
    constructor(fallTime, fastFallDivisor) {
        this.fallTime = fallTime;
        this.fastFallDivisor = fastFallDivisor;
    }

    getFallTime() {
        return this.fallTime;
    }
    setFallTime(newFallTime) {
        this.fallTime = newFallTime;
    }

    getFastFallDivisor() {
        return this.fastFallDivisor;
    }
    setFastFallDivisor(newDivisor) {
        this.fastFallDivisor = newDivisor;
    }
}