const KeyboardMapping = {
    //A, Left Arrow
    MOVE_LEFT: [65, 37],
    //w, Up Arrow
    MOVE_UP: [87, 38],
    //D, Right Arrow
    MOVE_RIGHT: [68, 39],
    //None, not applicable
    MOVE_DOWN: [],

    //Space, S, Down Arrow
    FAST_FALL: [32, 83, 40],

    //Q, <, Control (Left bumper)
    ROTATE_LEFT: [81, 188, 17],
    //E, >, Alt (Right bumper)
    ROTATE_RIGHT: [69, 190, 18],

    //None (testing control)
    PLACE_PIECE: [],
    //R, Enter (A Button)
    MAKE_PIECE: [82, 13],

    //PageDown (Y Button)
    RESET_BOARD: [34]
}
export default KeyboardMapping;