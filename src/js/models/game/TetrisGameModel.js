import Point from "../../util/Point";

export default class TetrisGameModel {
    constructor(spawnPoint) {
        this.setPaused(false);
        this.setSpawnPoint(spawnPoint);
        this.setNextPiece(null);
    }

    togglePaused() {
        this.setPaused(!this.isPaused());
    }
    setPaused(newGameIsPaused) {
        this.gameIsPaused = newGameIsPaused;
    }
    isPaused() {
        return this.gameIsPaused;
    }



    getSpawnPoint() {
        return this.spawnPoint;
    }
    setSpawnPoint(newSpawnPoint) {
        this.spawnPoint = newSpawnPoint.copy();
    }



    getNextPiece() {
        return this.nextPiece;
    }
    setNextPiece(newNextPiece) {
        this.nextPiece = newNextPiece;
    }




}