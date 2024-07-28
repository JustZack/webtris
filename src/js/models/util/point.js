export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    offset(offsetPoint) {
        let x = offsetPoint.x + this.x;
        let y = offsetPoint.y + this.y;
        return new Point(x, y);
    }

    subtract(point) {
        this.x -= point.x;
        this.y -= point.y;
    }

    add(point) {
        this.x += point.x;
        this.y += point.y;
    }

    copy() {
        return new Point(this.x, this. y);
    }
}
  