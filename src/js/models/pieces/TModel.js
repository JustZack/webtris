import TetrominoModel from "./TetrominoModel";
import BlockOrigin from "../blocks/BlockOrigin";
import BlockState from "../blocks/BlockState";

export default class TModel extends TetrominoModel {
    
    constructor(position) {
        let shape = [
            [1, 1, 1],
            [0, 1, 0]
        ];
        super(shape, new BlockOrigin(1, 0, BlockOrigin.CENTER), BlockState.COLOR_1, position);
    }
}