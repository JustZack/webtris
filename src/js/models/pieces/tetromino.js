import Point from "../shared/point"

export default class Tetromino {
    constructor(shapeMatrix, position, origin = new Point(1, 2)) {
        this.shape = shapeMatrix;
        this.position = position;
        this.origin = origin;
    }

    setPosition(position) {
        this.position = position;
    }
  }
  