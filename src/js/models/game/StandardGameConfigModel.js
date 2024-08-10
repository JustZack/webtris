import PiecesConfig from "../../configs/pieces/PiecesConfig";
import FPS from "../../util/FPS";
import GameConfigModel from "./GameConfigModel";
import GameLevelModel from "./GameLevelModel";

//level config adapted from https://tetris.wiki/Tetris_(NES,_Nintendo)
//fallTime equation is (Frames per Gridcell / 60 FPS) * 1000 miliseconds
export default class StandardGameConfigModel extends GameConfigModel {
    constructor() {
        super(50, PiecesConfig.Standard);

        this.addLevel(0, new GameLevelModel(FPS.ToMs(48), 10));
        this.addLevel(1, new GameLevelModel(FPS.ToMs(43), 10));
        this.addLevel(2, new GameLevelModel(FPS.ToMs(38), 10));
        this.addLevel(3, new GameLevelModel(FPS.ToMs(33), 10));
        this.addLevel(4, new GameLevelModel(FPS.ToMs(28), 10));
        this.addLevel(5, new GameLevelModel(FPS.ToMs(23), 10));
        this.addLevel(6, new GameLevelModel(FPS.ToMs(18), 10));
        this.addLevel(7, new GameLevelModel(FPS.ToMs(13), 10));
        this.addLevel(8, new GameLevelModel(FPS.ToMs(8), 10));
        this.addLevel(9, new GameLevelModel(FPS.ToMs(6), 10));
        this.addLevel(10, new GameLevelModel(FPS.ToMs(5), 10));
        this.refrenceLevels(11, 12, 10)

        this.addLevel(13, new GameLevelModel(FPS.ToMs(4), 10));
        this.refrenceLevels(14, 15, 13)

        this.addLevel(16, new GameLevelModel(FPS.ToMs(3), 10));
        this.refrenceLevels(17, 18, 16)

        this.addLevel(19, new GameLevelModel(FPS.ToMs(2), 10));
        this.refrenceLevels(20, 28, 19)

        this.addLevel(29, new GameLevelModel(FPS.ToMs(1), 10));

        this.setPiece
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