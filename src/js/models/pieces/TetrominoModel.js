import Direction from "../util/Direction";
import Point from "../util/Point"
import BlockModel from "./blockModel";
import BlockOrigin from "./BlockOrigin";

export default class TetrominoModel {
    constructor(shapeMatrix, origin, colorState, position) {
        this.shape = shapeMatrix;
        this.origin = origin;
        this.colorState = colorState;
        this.position = position;
        this.facing = Direction.UP;
        this.blocks = this.buildPiece();
    }

    buildPiece() {
        let angleOffset = Direction.angle(this.direction, Direction.UP);
        let shape = this.shape;

        //TODO: Rotate
        
        //TODO: Block positions relative to the origin
        let p = this.position;
        let blocks = [];
        for (let i = 0;i < this.shape.length;i++)
            for (let j = 0;j < this.shape[i].length;j++)
                if (this.shape[i][j] == 1)
                    blocks.push(new BlockModel(new Point(p.x+j, p.y+i), this.colorState))
        return blocks;
    }

    rotate(direction) {
        if (this.direction == Direction.LEFT) this.direction = Direction.UP;
        else this.direction++;
    }

    
}
  