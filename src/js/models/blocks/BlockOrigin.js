import Point from "../../util/Point";

export default class BlockOrigin extends Point {
    static CENTER = 0;          //Middle of a block
    static TOP_LEFT = 1;        //Top left point
    static TOP_RIGHT = 3;       //Top right edge
    static BOTTOM_LEFT = 5;     //Bottom left point
    static BOTTOM_RIGHT = 7;    //Bottom right point

    constructor(relativeX, relativeY, originType) {
        super(relativeX, relativeY);
        this.state = {
            type: originType
        }
    }
}