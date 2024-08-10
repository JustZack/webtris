import Point from "../../util/Point";
import TypeOf from "../../util/TypeOf";

export default class TetrisGameModel {
    constructor(spawnPoint, pieceSet) {
        this.setSpawnPoint(spawnPoint);
        this.pieces = pieceSet;
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
        return this.pieces;
    }
    setPieceSet(newPiecesArray) {
        this.pieces = newPiecesArray;
        this.piecesPlaced = [];
        for (let clss of this.pieces) this.piecesPlaced[clss.name] = 0;
    }

    addPlacedPiece(piece) {
        let clss = TypeOf.getClass(piece);
        if (this.piecesPlaced[clss] != undefined) 
            this.piecesPlaced[clss] += 1;
    }
    getPlacedPieceStatistics() {
        return this.piecesPlaced;
    }

    addCompletedLines(numLines) {
        this.completeLines += numLines;
    }
    getCompletedLines() {
        return this.completeLines;
    }

    advanceLevel() {
        this.currentLevelNum++;
    }
    currentLevel() {
        return this.currentLevelNum;
    }
    setLevel(newLevel) {
        this.currentLevelNum = newLevel;
    }

    reset() {
        this.completeLines = 0;
        this.points = 0;
        this.currentLevelNum = 0;
        this.setPaused(false);
        this.setNextPiece(null);
        this.setPieceSet(this.pieces);
    }

}