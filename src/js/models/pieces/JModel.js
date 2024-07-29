import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";
import BlockState from "./BlockState";

export default class JModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1, 1],
            [0, 0, 1],
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_LEFT), BlockState.COLOR_3, position);
    }
}