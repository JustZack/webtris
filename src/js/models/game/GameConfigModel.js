export default class GameConfigModel {   
    constructor(rowClearDelay, piecesSet) { 
        this.setRowClearDelay(rowClearDelay);
        this.setPieceSet(piecesSet);
    }

    getRowClearDelay() { return this.rowClearDelay; }
    setRowClearDelay(newDelay) { this.rowClearDelay = newDelay; }


    levels = [];
    //Add a new level to this config
    addLevel(levelNumber, levelModel) { return this.levels[levelNumber] = levelModel; }
    //Define a level refrencing another level
    refrenceLevel(newLevelNumber, levelNumberToRefrence) {
        this.addLevel(newLevelNumber, this.getLevel(levelNumberToRefrence));
    }
    //Define a range of levels that refrence another number
    refrenceLevels(newLevelStart, newLevelEnd, levelNumberToRefrence) {
        for (let i = newLevelStart;i <= newLevelEnd;i++) 
            this.refrenceLevel(i, levelNumberToRefrence);
    }
    
    //Get a specific level
    getLevel(levelNumber) { 
        if (levelNumber > this.getMaxLevel())   return this.levels[this.getMaxLevel()];
        else                                    return this.levels[levelNumber]; 
    }
    //Get the max level number defined by this config
    getMaxLevel() { return this.getLevels().length-1; }
    //Get all levels
    getLevels() { return this.levels; }
    //Set levels object
    setLevels(newLevels) { this.levels = newLevels; }

    canAdvanceLevel(lineCount, levelStart, currentLevel) { }

    pieces = [];
    getPieceSet() { return this.pieces; }
    setPieceSet(newPieces) { this.pieces = newPieces; }

    spawnRandomPiece(spawnPoint, pieceHistory) { }
}  