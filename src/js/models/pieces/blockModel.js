import Point from "../util/Point";
import Size from "../util/Size";
import BlockState from "./BlockState";

export default class BlockModel {
    constructor(position, state = BlockState.EMPTY) {
      this.position = position;
      this.state = state;
    }
  }
  