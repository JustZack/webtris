import CubeModel from "../models/pieces/CubeModel";
import IModel from "../models/pieces/IModel";
import JModel from "../models/pieces/JModel";
import LModel from "../models/pieces/lModel";
import SModel from "../models/pieces/SModel";
import TModel from "../models/pieces/TModel";
import ZModel from "../models/pieces/ZModel";
import _ from "lodash";

export default class PiecePicker {
    static standardPieces = [IModel, LModel, JModel, SModel, ZModel, TModel, CubeModel];

    static spawnRandomStandardPiece(position) {
        let pieceClass = new PiecePicker.getRandom(PiecePicker.standardPieces);
        return new pieceClass(position);
    }

    static getRandom(piecesArray) {
        let shuffled = _.shuffle(piecesArray);
        let random = Math.floor(Math.random()*shuffled.length);
        return shuffled[random];
    }
}