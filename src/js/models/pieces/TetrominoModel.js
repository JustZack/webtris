import Point from "../util/Point"
import { BlockOrigin, BlockOriginType } from "./BlockOrigin";

export default class TetrominoModel {
    constructor(shapeMatrix, origin, position) {
        this.shape = shapeMatrix;
        this.origin = origin;
        this.position = position;
    }

    setPosition(position) {
        this.position = position;
    }
  }
  