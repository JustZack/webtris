import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";

export default class CubeModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1],
            [1, 1],
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_LEFT), position);
    }
}