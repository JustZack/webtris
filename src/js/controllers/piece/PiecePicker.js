import _ from "lodash";
import PiecesConfig from "../../configs/pieces/Pieces.Config";

export default class PiecePicker {
    static pieceHistory = [];
    static getPieceHistory() { return PiecePicker.pieceHistory; }
    static reset() { return PiecePicker.pieceHistory = []; }

    static spawnRandomStandardPiece(position) {
        let pieceClass = new PiecePicker.getRandom(PiecesConfig.standard);
        return new pieceClass(position);
    }

    static getRandom(piecesArray) {
        //TODO: set this up based on game rule sets
        let numPieces = piecesArray.length;
        let randomPiece = null, lastPiece = null;
        let lastPieceIndex = PiecePicker.pieceHistory.length-1;
        do {
            if (lastPieceIndex < 0) lastPiece = undefined;
            else                    lastPiece = PiecePicker.pieceHistory[lastPieceIndex--];
            let random = Math.floor(Math.random()*(numPieces+1));
            //If number is out of bounds or same as last piece, continue;
            if (random == numPieces || random == piecesArray.indexOf(lastPiece)) continue
            else randomPiece = piecesArray[random];
            if (randomPiece == null) console.log("DUPLICATE: GENERATE ANOTHER PIECE");
        } while (randomPiece == null)
        PiecePicker.pieceHistory.push(randomPiece);
        return randomPiece;
    }
}