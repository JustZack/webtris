import ArrayUtil from "../../util/ArrayUtil";
import CubeModel from "./CubeModel";
import IModel from "./IModel";
import JModel from "./JModel";
import LModel from "./lModel";
import SModel from "./SModel";
import TModel from "./TModel";
import ZModel from "./ZModel";

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