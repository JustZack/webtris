import Direction from "../../util/Direction";

export default class MatrixModel {
    constructor(shape) {
        this.shape = shape;
    }

    rotate(direction) {
        let newShape = [];
        let rows = this.shape.length;
        let cols = this.shape[0].length;

        let isLeft = direction == Direction.LEFT;

        for (let i = 0;i < cols;i++) newShape.push([]);


        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let newJ = isLeft ? cols - j - 1 : j;
                let newI = isLeft ? i : rows - i - 1;
                newShape[newJ][newI] = this.shape[i][j];
            }
        }
        this.shape = newShape;
    }
}