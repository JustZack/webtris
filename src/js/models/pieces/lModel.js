import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";
import BlockState from "./BlockState";

export default class LModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [0, 0, 1],
            [1, 1, 1],
        ];
        super(shape, new BlockOrigin(1, 1, BlockOrigin.TOP_RIGHT), BlockState.COLOR_3, position);
    }
}