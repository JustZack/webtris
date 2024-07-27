import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class LModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 0],
            [1, 0],
            [1, 1],
        ];
        super(shape, new BlockOrigin(0, 2, BlockOrigin.TOP_RIGHT), position);
    }
}