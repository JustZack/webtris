import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class SModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [0, 1, 1],
            [1, 1, 0],
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_LEFT), position);
    }
}