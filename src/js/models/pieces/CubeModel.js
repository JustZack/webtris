import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";
import BlockState from "./BlockState";

export default class CubeModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1],
            [1, 1],
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_LEFT), BlockState.COLOR_1, position);
    }
}