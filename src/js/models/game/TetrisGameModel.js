import Point from "../../util/Point";
import TypeOf from "../../util/TypeOf";

export default class TetrisGameModel {
    constructor(spawnPoint, gameConfigModel) {
        this.setSpawnPoint(spawnPoint);
        this.setGameConfig(gameConfigModel);
        this.reset();
    }

    addPoints(numPoints) {
        this.points += numPoints;
    }
    getPoints() {
        return this.points;
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


    getPieceSet() {
        return this.gameConfigModel.getPieceSet();
    }

    addPlacedPiece(piece) {
        let clss = TypeOf.getClass(piece);
        if (this.piecesPlaced[clss] != undefined) 
            this.piecesPlaced[clss] += 1;
    }
    getPlacedPieceStatistics() {
        return this.piecesPlaced;
    }

    getPieceHistory() { 
        return this.pieceHistory; 
    }

    spawnRandomPiece(position) {
        return this.gameConfig.spawnRandomPiece(position, this.getPieceHistory());
    }

    addCompletedLines(numLines) {
        this.completeLines += numLines;
    }
    getCompletedLines() {
        return this.completeLines;
    }

    getGameConfig() {
        return this.gameConfig;
    }
    setGameConfig(newConfig) {
        this.gameConfig = newConfig;
    }

    canAdvanceLevel() {
        return this.gameConfig.canAdvanceLevel(this.completeLines, this.startingLevel, this.currentLevel);
    }

    advanceLevel() {
        this.currentLevel++;
    }
    getCurrentLevelNumber() {
        return this.currentLevel;
    }

    getCurrentLevel() {
        return this.gameConfig.getLevel(this.currentLevel);
    }

    getStartLevel() {
        return this.startingLevel;
    }
    setStartLevel(startLevel) {
        this.currentLevel = startLevel;
        this.startingLevel = startLevel
    }

    reset() {
        this.completeLines = 0;
        this.points = 0;
        this.currentLevel = 0;
        this.startingLevel = 0;
        this.pieceHistory = [];
        this.setPaused(false);
        this.setNextPiece(null);
        this.piecesPlaced = [];
        for (let clss of this.gameConfig.getPieceSet()) 
            this.piecesPlaced[clss.name] = 0;
    }

}