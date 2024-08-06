import TypeOf from "../../util/TypeOf";

export default class ScoreModel {
    constructor(piecesUsed) {
        this.piecesUsed = piecesUsed;
        this.reset();
    }

    incrementCompletedLines() {
        this.completeLines++;
    }

    addPoints(numPoints) {
        this.points += numPoints;
    }

    incrementTetrisCount() {
        this.numTetris++;    
    }

    addPlacedPiece(piece) {
        let clss = TypeOf.getClass(piece);
        if (this.piecesPlaced.includes(clss)) this.piecesPlaced[clss]++;
    }

    reset() {
        this.completeLines = 0;
        this.points = 0;
        this.numTetris = 0;
        this.piecesPlaced = {};
        for (let clss of this.piecesUsed) 
            this.piecesPlaced[key] = clss;
    }
}