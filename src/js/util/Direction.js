export default class Direction {
    static UP = 0;
    static RIGHT = 1;
    static DOWN = 2;
    static LEFT = 3;

    //What is the angle between these two directions?
    static angle(direction1, direction2) {
        return Math.abs(direction1-direction2)*90;
    }
}