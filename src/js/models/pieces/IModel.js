import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "./BlockOrigin";
import BlockState from "./BlockState";

export default class IModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1, 1, 1],
        ];
        super(shape, new BlockOrigin(1,0, BlockOrigin.TOP_RIGHT), BlockState.COLOR_1, position);
    }
}