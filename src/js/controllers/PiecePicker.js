import ArrayUtil from "../util/ArrayUtil";
import CubeModel from "../models/pieces/CubeModel";
import IModel from "../models/pieces/IModel";
import JModel from "../models/pieces/JModel";
import LModel from "../models/pieces/lModel";
import SModel from "../models/pieces/SModel";
import TModel from "../models/pieces/TModel";
import ZModel from "../models/pieces/ZModel";

export default class PiecePicker {
    static standardPieces = [IModel, LModel, JModel, SModel, ZModel, TModel, CubeModel];

    static getRandomStandardPiece() {
        return PiecePicker.getRandom(PiecePicker.standardPieces);
    }

    static getRandom(piecesArray) {
        let shuffled = ArrayUtil.shuffle(piecesArray);
        let random = Math.floor(Math.random()*shuffled.length);
        return shuffled[random];
    }
}