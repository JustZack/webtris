import SquareModel from "../../models/pieces/SquareModel";
import IModel from "../../models/pieces/IModel";
import JModel from "../../models/pieces/JModel";
import LModel from "../../models/pieces/lModel";
import SModel from "../../models/pieces/SModel";
import TModel from "../../models/pieces/TModel";
import ZModel from "../../models/pieces/ZModel";

export default class PiecesConfig {
    static stringToClass = {
        "IModel": IModel,
        "LModel": LModel,
        "JModel": JModel,
        "SModel": SModel,
        "ZModel": ZModel,
        "TModel": TModel,
        "SquareModel": SquareModel
    }
    
    static getClass(pieceName) {
        return PiecesConfig.stringToClass[pieceName]
    }

    static Standard = [IModel, LModel, JModel, SModel, ZModel, TModel, SquareModel];

}