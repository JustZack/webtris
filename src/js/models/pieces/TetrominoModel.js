import Direction from "../../util/Direction";
import Point from "../../util/Point"
import BlockModel from "../blocks/BlockModel";
import BlockState from "../blocks/BlockState";
import MatrixModel from "./MatrixModel";

export default class TetrominoModel {
    constructor(shapeMatrix, origin, colorState, position) {
        this.matrix = new MatrixModel(shapeMatrix);
        this.origin = origin;
        this.colorState = colorState;
        this.position = position;
        this.facing = Direction.UP;
        this.buildPiece();
    }

    as2DArray() {
        let array = [];
        let shape = this.matrix.shape;
        for (let i = 0;i < shape.length;i++) {
            array.push([]);
            for (let j = 0;j < shape[i].length;j++) {
                if (shape[i][j] == 1)
                    array[i].push(new BlockModel(new Point(j, i), this.colorState))
                else array[i].push(new BlockModel(new Point(j, i), BlockState.EMPTY))
            }
                
        }
        return array;
    }

    buildPiece() {
        let shape = this.matrix.shape;
        this.size = this.matrix.size;
        //TODO: Block positions relative to the origin point (this might be unessesary?)
        let p = this.position;
        this.blocks = [];
        for (let i = 0;i < shape.length;i++)
            for (let j = 0;j < shape[i].length;j++)
                if (shape[i][j] == 1)
                    this.blocks.push(new BlockModel(new Point(p.x+j, p.y+i), this.colorState))
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.buildPiece();
    }

    move(direction) {
        if (direction == Direction.UP || direction == Direction.DOWN) {
            this.position.y += direction == Direction.UP ? -1 : 1;
        } else if (direction == Direction.LEFT || direction == Direction.RIGHT) {
            this.position.x += direction == Direction.LEFT ? -1 : 1;;
        }
        this.buildPiece();
    }

    rotate(direction) {
        if (direction == Direction.LEFT) {
            if (this.facing == Direction.UP) this.facing = Direction.LEFT;
            else this.facing--;
        } else if(direction == Direction.RIGHT) {
            if (this.facing == Direction.LEFT) this.facing = Direction.UP;
            else this.facing++;
        }
        this.matrix.rotate(direction);
        this.buildPiece();
    }    
}
  