import PiecesConfig from "../../configs/pieces/PiecesConfig";
import FPS from "../../util/FPS";
import GameConfigModel from "./GameConfigModel";
import GameLevelModel from "./GameLevelModel";

//level config adapted from https://tetris.wiki/Tetris_(NES,_Nintendo)
//fallTime equation is (Frames per Gridcell / 60 FPS) * 1000 miliseconds
export default class StandardGameConfigModel extends GameConfigModel {
    constructor() {
        super(50, PiecesConfig.Standard);
    }

    canAdvanceLevel(lineCount, levelStart, currentLevel) { 
        //The first level advance happends after alot more lines
        if (currentLevel <= levelStart) {
            let lineClearBarA = (levelStart * 10) + 10;
            let lineClearBarB = Math.max(100, (levelStart * 10) - 50);
            let lineClearGoal = Math.min(lineClearBarA, lineClearBarB);
            return lineClearGoal <= lineCount;
        } 
        //All others occur every 10 lines
        else return lineCount % 10 == 0;
    }

    spawnRandomPiece(spawnPoint, pieceHistory) {
        let p = this.pieces;
        let numPieces = p.length;
        let randomPiece = null, lastPiece = null;
        let lastPieceIndex = pieceHistory.length-1;
        do {
            if (lastPieceIndex < 0) lastPiece = undefined;
            else                    lastPiece = pieceHistory[lastPieceIndex--];
            let random = Math.floor(Math.random()*(numPieces+1));
            //If number is out of bounds or same as last piece, continue;
            if (random == numPieces || random == p.indexOf(lastPiece)) continue
            else randomPiece = p[random];
            if (randomPiece == null) console.log("DUPLICATE: GENERATE ANOTHER PIECE");
        } while (randomPiece == null)

        pieceHistory.push(randomPiece);
        return new randomPiece(spawnPoint);
    }
}