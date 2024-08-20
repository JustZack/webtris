import GameAction from "../../configs/input/GameAction";
import Direction from "../../util/Direction";
import InputController from "../input/InputController";
import InputAction from "../../configs/input/InputAction";

export default class FallingPieceController extends InputController {
    constructor(mapping, doBoardUpdate, doGameModelUpdate, doCheckForFullRows, isPaused, getNextPiece, getCurrentLevel) {
        super(mapping);

        this.fallingPiece = null;
        this.shiftInterval = null;
        this.isFastFalling = false;

        this.doBoardUpdate = doBoardUpdate;
        this.doGameModelUpdate = doGameModelUpdate;
        this.doCheckForFullRows = doCheckForFullRows;

        this.isPaused = isPaused;
        this.getNextPiece = getNextPiece;
        this.getCurrentLevel = getCurrentLevel;
    }

    addListeners() {
        super.addListeners();
        this.setCallback(InputAction.KEY_DOWN, this.handleKeyDown);
        this.setCallback(InputAction.KEY_UP, this.handleKeyUp);        
    }

    commitToBoard(piece) {
        this.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitStaticPiece(piece);
        });
        this.doGameModelUpdate((gm) => {
            gm.addPlacedPiece(piece);
        })
        this.doCheckForFullRows((didClear) => {
            let callback = this.isFastFalling ? this.startFastFallTimeout : this.startShiftDownTimeout;
            this.resetShiftDownTimeout(callback);
        });
    }

    commitToDynamicBoard(piece) {
        this.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitDynamicPiece(piece);
        });
    }

    tryCommitFallingPiece(piece, moveDirection, rotateDirection) {
        this.doBoardUpdate((b) => {
            if (b.pieceCanMove(piece, moveDirection, rotateDirection)) {
                if (moveDirection != null) piece.move(moveDirection);
                else if (rotateDirection != null) piece.rotate(rotateDirection);
                b.clearDynamicBoard();
                b.commitDynamicPiece(piece);
            }
        });
    }

    shiftDown() {
        //Only shift down if we are not paused
        //  -Either because the game is paused
        //  -Or peices are shifting
        if (!this.isPaused()) {
            this.doBoardUpdate((b) => {
                let piece = this.fallingPiece;
                if (b.pieceCanMove(piece, Direction.DOWN)) {
                    piece.move(Direction.DOWN);
                } else {
                    this.commitToBoard(piece);
                    piece = this.getNextPiece();
                }
                this.commitToDynamicBoard(piece);
                this.fallingPiece = piece;
            });
        }
    }

    startShiftTimeout(fastFall) {
        let level = this.getCurrentLevel();
        let fallTime = fastFall ? level.getFastFallTime() : level.getFallTime();
        this.shiftInterval = setInterval(this.shiftDown, fallTime);
        this.isFastFalling = fastFall;
    }

    startShiftDownTimeout() { this.startShiftTimeout(false); }

    startFastFallTimeout() { this.startShiftTimeout(true); }

    resetShiftDownTimeout(shiftDownStartFunction) {
        clearInterval(this.shiftInterval);
        shiftDownStartFunction();
    }

    canAcceptInput(gameAction) {
        return gameAction != false && !this.isPaused()
    }

    resetGame() {
        this.shiftInterval = null;
        this.isFastFalling = false;

        this.doGameModelUpdate((gm) => { 
            gm.reset();
        });
        this.doBoardUpdate((b) => {
            b.reset();
        });
    }

    //Some controls act like toggles while held down
    handleKeyUp(event, gameAction) {
        let piece = this.fallingPiece;
        if (piece != null) {
            if (gameAction == GameAction.FAST_FALL) {
                if (this.isFastFalling) this.resetShiftDownTimeout(this.startShiftDownTimeout);
            }
        }
    }

    handleKeyDown(event, gameAction) {
        if (this.canAcceptInput(gameAction)) {
            let piece = this.fallingPiece;
            let moveDirection = null;
            let rotateDirection = null;
            if (piece != null) {
                switch (gameAction) {
                    case GameAction.FAST_FALL:      
                        if (!this.isFastFalling) this.resetShiftDownTimeout(this.startFastFallTimeout);
                        return;
                    case GameAction.MOVE_LEFT:      moveDirection = Direction.LEFT; break;
                    case GameAction.MOVE_RIGHT:     moveDirection = Direction.RIGHT; break;
                    case GameAction.ROTATE_LEFT:    rotateDirection = Direction.LEFT; break;
                    case GameAction.ROTATE_RIGHT:   rotateDirection = Direction.RIGHT; break;
                    case GameAction.RESET_BOARD:    this.resetGame(); piece = null; break;
                }
            } else if (gameAction == GameAction.MAKE_PIECE) {
                piece = this.getNextPiece();
                this.startShiftDownTimeout();
            }
            if (piece != null) {
                this.tryCommitFallingPiece(piece, moveDirection, rotateDirection);
            }
            this.fallingPiece = piece;
        }
    }
}
  