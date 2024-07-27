import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class IModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1],
            [1],
            [1],
            [1],
        ];
        super(shape, new BlockOrigin(0,2, BlockOrigin.TOP_RIGHT), position);
    }
}