import BlockModel from "../pieces/blockModel";
import BlockState from "../pieces/blockState";
import Point from "../util/point";

export default class BoardModel {
    constructor(size) {
      this.size = size;
      this.blocks = [];
      this.buildBoard();
    }

    buildBoard() {
        this.blocks = [];
        for (var i = 0;i < this.size.height;i++) {
            this.blocks.push([]);  
            for (var j = 0;j < this.size.width;j++) {
                this.blocks[i][j] = new BlockModel(new Point(j, i), BlockState.EMPTY);
            }
        }
    }

    getBoard() { return this.blocks; }

    setBlockState(position, state) {
        if (position.x >= this.size.width || position.y >= this.size.height) {
            throw `Tried Setting a block outside the game board.\n` +
                    `\tBlock(x: ${position.x}, y: ${position.y})\n` +
                    `\tBoard Size(width: ${this.size.width}, height: ${this.size.height})`;
        } else if (state < BlockState.EMPTY || state > BlockState.FILLED) {
            throw `Tried Setting an invalid block state: ${state}`;
        } else {
            this.blocks[position.y][position.x].state = state;
        }
    }

    
  }
  