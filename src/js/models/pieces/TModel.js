import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";
import BlockState from "./BlockState";

export default class TModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1, 1],
            [0, 1, 0]
        ];
        super(shape, new BlockOrigin(1, 0, BlockOrigin.CENTER), BlockState.COLOR_1, position);
    }
}