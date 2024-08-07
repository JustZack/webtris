import _ from "lodash";
import PiecesConfig from "../../configs/pieces/Pieces.Config";

export default class PiecePicker {
    static spawnRandomStandardPiece(position) {
        let pieceClass = new PiecePicker.getRandom(PiecesConfig.standard);
        return new pieceClass(position);
    }

    static getRandom(piecesArray) {
        let shuffled = _.shuffle(piecesArray);
        let random = Math.floor(Math.random()*shuffled.length);
        return shuffled[random];
    }
}