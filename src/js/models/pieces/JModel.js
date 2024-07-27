import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class JModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [0, 1],
            [0, 1],
            [1, 1],
        ];
        super(shape, new BlockOrigin(1, 2, BlockOrigin.TOP_LEFT), position);
    }
}