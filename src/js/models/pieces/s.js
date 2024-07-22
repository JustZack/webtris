import Tetromino from "./tetromino";

export default class S extends Tetromino {
    
    constructor() {
        let shape = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ];
        super(shape);
    }
}