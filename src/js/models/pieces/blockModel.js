import Point from "../util/point";
import Size from "../util/size";
import BlockState from "./blockState";

export default class BlockModel {
    constructor(position, state = BlockState.EMPTY) {
      this.position = position;
      this.state = state;
    }

    setEmpty() { this.state = BlockState.EMPTY; }
    setFilled() { this.state = BlockState.FILLED; }
  }
  