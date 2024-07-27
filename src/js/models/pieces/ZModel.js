import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class ZModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1, 0],
            [0, 1, 1]
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_RIGHT), position);
    }
}