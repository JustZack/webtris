import InputController from "./InputController";
import KeyboardMapping from "../models/input/KeyboardMapping";
import GameAction from "../models/input/GameAction";
import Direction from "../util/Direction";

export default class FallingPieceController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fallingPiece: null,
            shiftInterval: null,
            isFastFalling: false
        }
        this.commitToBoard = this.commitToBoard.bind(this);
        this.commitToDynamicBoard = this.commitToDynamicBoard.bind(this);
        this.tryCommitFallingPiece = this.tryCommitFallingPiece.bind(this);
        this.shiftDown = this.shiftDown.bind(this);
        this.startShiftDownTimeout = this.startShiftDownTimeout.bind(this);
        this.startFastFallTimeout = this.startFastFallTimeout.bind(this);
        this.resetShiftDownTimeout = this.resetShiftDownTimeout.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    commitToBoard(piece) {
        this.props.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitStaticPiece(piece);
        });
        this.props.checkForFullRows();
        let callback = this.state.isFastFalling ? this.startFastFallTimeout : this.startShiftDownTimeout;
        this.resetShiftDownTimeout(callback);
    }

    commitToDynamicBoard(piece) {
        this.props.doBoardUpdate((b) => {
            b.clearDynamicBoard();
            b.commitDynamicPiece(piece);
        });
    }

    tryCommitFallingPiece(piece, moveDirection, rotateDirection) {
        this.props.doBoardUpdate((b) => {
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
        if (!this.props.isPaused()) {
            this.props.doBoardUpdate((b) => {
                let piece = this.state.fallingPiece;
                if (b.pieceCanMove(piece, Direction.DOWN)) {
                    piece.move(Direction.DOWN);
                } else {
                    this.commitToBoard(piece); 
                    piece = this.props.getNextPiece();
                }
                this.commitToDynamicBoard(piece);
                this.setState({fallingPiece: piece});
            });
        }
    }

    startShiftDownTimeout() {
        let fallTime = this.props.getLevelConfig().fallTime;
        let shiftInterval = setInterval(this.shiftDown, fallTime);
        this.setState({shiftInterval: shiftInterval, isFastFalling: false});
    }

    startFastFallTimeout() {
        let cfg = this.props.getLevelConfig();
        let fallTime = cfg.fallTime*cfg.fastFallFactor;
        let shiftInterval = setInterval(this.shiftDown, fallTime);
        this.setState({shiftInterval: shiftInterval, isFastFalling: true});
    }

    resetShiftDownTimeout(shiftDownStartFunction) {
        clearInterval(this.state.shiftInterval);
        shiftDownStartFunction();
    }

    //Some controls act like toggles while held down
    handleKeyUp(event, gameAction) {
        if (gameAction != false) {
            let piece = this.state.fallingPiece;
            if (piece != null) {
                if (gameAction == GameAction.FAST_FALL) {
                    if (this.state.isFastFalling) this.resetShiftDownTimeout(this.startShiftDownTimeout);
                }
            }
        }
    }

    handleKeyDown(event, gameAction) {
        if (gameAction != false) {
            let piece = this.state.fallingPiece;
            let moveDirection = null;
            let rotateDirection = null;
            if (piece != null) {
                switch (gameAction) {
                    case GameAction.FAST_FALL:      
                        if (!this.state.isFastFalling) this.resetShiftDownTimeout(this.startFastFallTimeout);
                        return;
                    case GameAction.MOVE_LEFT:      moveDirection = Direction.LEFT; break;
                    case GameAction.MOVE_RIGHT:     moveDirection = Direction.RIGHT; break;
                    case GameAction.ROTATE_LEFT:    rotateDirection = Direction.LEFT; break;
                    case GameAction.ROTATE_RIGHT:   rotateDirection = Direction.RIGHT; break;
                }
            } else if (gameAction == GameAction.MAKE_PIECE) {
                piece = this.props.getNextPiece();
                this.startShiftDownTimeout();
            }
            if (piece != null) {
                this.tryCommitFallingPiece(piece, moveDirection, rotateDirection);
            }
            this.setState({fallingPiece: piece});
        }
    }

    render() {
        return (<InputController mapping={KeyboardMapping} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>)
    }
  }
  